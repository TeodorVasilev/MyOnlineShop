using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Account;

namespace ProductsAPI.Service.ProductService
{
    public class ProductService : IProductService 
    {
        private int perPage = 4;
        private readonly ProductsDbContext _context;
        public ProductService(ProductsDbContext context)
        {
           this._context = context;
        }
        public async Task<List<int>> ToggleFavoriteProduct(int userId, int productId)
        {
            var user = _context.Users.Where(u => u.Id == userId).Include(u => u.Favorites).FirstOrDefault();

            var product = user.Favorites.Where(p => p.Id == productId).FirstOrDefault();

            if (product == null)
            {
                product = _context.Products.Where(p => p.Id == productId).FirstOrDefault();
                user.Favorites.Add(product);
                _context.SaveChanges();
            }
            else
            {
                user.Favorites.Remove(product);
            }

            _context.SaveChanges();

            var favoriteIds = user.Favorites.Select(p => p.Id).ToList();
            return favoriteIds;
        }
        //
        public async Task<List<int>> AddToCart(int userId, int productId)//
        {
            var user = this._context.Users.Where(u => u.Id == userId).Include(u => u.CartProducts).ThenInclude(c => c.Product).FirstOrDefault();
            var products = user.CartProducts.Select(c => c.Product).ToList();

            var product = products.Where(p => p.Id == productId).FirstOrDefault();

            if (product == null)
            {
                product = this._context.Products.Where(p => p.Id == productId).FirstOrDefault();

                var cartProduct = new Cart { UserId = user.Id, ProductId = product.Id };

                user.CartProducts.Add(cartProduct);
            }
            else
            {
                var carProduct = user.CartProducts.Where(p => p.ProductId == productId).FirstOrDefault();

                user.CartProducts.Remove(carProduct);
            }

            _context.SaveChanges();

            var cartProducts = user.CartProducts.Select(p => p.ProductId).ToList();
            return cartProducts;
        }//
        //
        //
        public ProductListViewModel GetUserCart(int userId)
        {
            var user = this._context.Users.Where(u => u.Id == userId).Include(u => u.CartProducts).ThenInclude(c => c.Product).FirstOrDefault();
            var products = user.CartProducts.Select(c => c.Product).ToList();

            var productsModel = products.Select(p => new ProductViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Quantity = p.Quantity,
                Description = p.Description,
                CategoryId = p.CategoryId
            }).ToList();

            var model = new ProductListViewModel();
            model.Products = productsModel;

            return model;
        }
        //
        public ProductListViewModel GetUserFavoriteProducts(int userId)
        {
            var user = _context.Users.Where(u => u.Id == userId).Include(u => u.Favorites).FirstOrDefault();

            var products = user.Favorites.Select(p => new ProductViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Quantity = p.Quantity,
                Description = p.Description,
                CategoryId = p.CategoryId
            }).ToList();

            var model = new ProductListViewModel();
            model.Products = products;

            return model;
        }
        public ProductViewModel GetProductById(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            
            if(product == null)
            {
                return null;
            }
            
            var model = new ProductViewModel();

            model.Id = id;
            model.Name = product.Name;
            model.Price = product.Price;
            model.Description = product.Description;
            model.Quantity = product.Quantity;
            model.CategoryId = product.CategoryId;

            return model;
        }
        public ProductListViewModel GetPaginatedProducts(FilterViewModel filters)
        {
            int page = filters.CurrentPage != 0 ? filters.CurrentPage : 1;

            var query = _context.Products.AsQueryable();
            query = FilterQuery(query, filters);

            var products = query.Skip((page - 1) * this.perPage).Take(this.perPage)
                .Select(p => new ProductViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Description = p.Description,
                    CategoryId = p.CategoryId
                }).ToList();

            var model = new ProductListViewModel();
            model.Products = products;
            model.TotalPages = this.GetTotalPages(filters.CategoryId, filters.PriceFrom, filters.PriceTo);

            return model;
        }
        public IQueryable<Product> FilterQuery(IQueryable<Product> query, FilterViewModel filters)
        {
            if (filters.CategoryId != 0)
            {
                query = query.Where(p => p.CategoryId == filters.CategoryId);
            }
            if (filters.PriceFrom != 0)
            {
                query = query.Where(p => p.Price >= filters.PriceFrom);
            }
            if (filters.PriceTo != 0)
            {
                query = query.Where(p => p.Price <= filters.PriceTo);
            }
            //1 - lowest price first
            //2 - hightest price first
            if (filters.Order == 1)
            {
                query = query.OrderBy(p => p.Price);
            }
            if (filters.Order == 2)
            {
                query = query.OrderByDescending(p => p.Price);
            }

            return query;
        } 
        public double GetTotalPages(int categoryId = 0, decimal priceFrom = 0, decimal priceTo = 0)
        {
            IQueryable<Product> query;

            if (categoryId == 0)
                query = _context.Products.AsQueryable();
            else
                query = _context.Products.Where(p => p.CategoryId == categoryId);

            if (priceFrom != 0)
                query = query.Where(p => p.Price >= priceFrom);
            if (priceTo != 0)
                query = query.Where(p => p.Price <= priceTo);

            double totalProducts = query.Count();
            double pages = totalProducts / this.perPage;
            pages = Math.Ceiling(pages);
            return pages;
        }
        public void Update(int id, ProductViewModel formData)
        {
            var product = GetProductById(id);

            if (product == null)
            {
                throw new Exception();
            }

            product.Name = formData.Name;
            product.Price = formData.Price; 
            product.Description = formData.Description;
            product.Quantity = formData.Quantity;
            product.CategoryId = formData.CategoryId;

            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);

            if(product == null)
            {
                throw new Exception();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
        }
        public void Create(ProductViewModel formData)
        {
            var product = new Product()
            {
                Name = formData.Name,
                Price = formData.Price,
                Description = formData.Description,
                Quantity = formData.Quantity,
                CategoryId = formData.CategoryId,
            };

            _context.Products.Add(product);
            _context.SaveChanges();
        }
    }
}
