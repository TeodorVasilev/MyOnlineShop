using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Products;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Option;
using ProductsAPI.DAL.ViewModels.Property;

namespace ProductsAPI.Service.ProductService
{
    public class ProductService : IProductService
    {
        private readonly ProductsDbContext _context;
        public ProductService(ProductsDbContext context)
        {
            this._context = context;
        }
        //
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
        //
        public ProductViewModel GetProductById(int id)
        {
            var product = _context.Products.Where(p => p.Id == id).Include(p => p.Properties).Include(p => p.Options)
                .ThenInclude(o => o.Properties).FirstOrDefault();

            if (product == null)
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
            model.Properties = product.Properties.Select(p => new PropertyViewModel()
            {
                Id = p.Id,
                Name = p.Name,
                Options = p.Options.Select(o => new OptionViewModel() { Id = o.Id, Name = o.Name, IsSelected = true }).ToList(),

            }).ToList();

            return model;
        }
        public ProductListViewModel GetPaginatedProducts(FilterViewModel filters)
        {
            int page = filters.CurrentPage != 0 ? filters.CurrentPage : 1;

            var query = _context.Products.AsQueryable();
            query = FilterQuery(query, filters);

            var products = query.Skip((page - 1) * filters.PerPage).Take(filters.PerPage)
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
            model.TotalPages = this.GetTotalPages(filters.CategoryId, filters.PriceFrom, filters.PriceTo, filters.PerPage);

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
            //1 - newest first
            //2 - lowest price first
            //3 - hightest price first

            if (filters.Order == 2)
            {
                query = query.OrderBy(p => p.Price);
            }
            if (filters.Order == 3)
            {
                query = query.OrderByDescending(p => p.Price);
            }

            return query;
        }
        public double GetTotalPages(int categoryId = 0, decimal priceFrom = 0, decimal priceTo = 0, int perPage = 0)
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
            double pages = totalProducts / perPage;
            pages = Math.Ceiling(pages);
            return pages;
        }
        public async Task<ProductViewModel> Update(ProductViewModel formData)
        {
            var product = this._context.Products.Where(p => p.Id == formData.Id).Include(p => p.Properties).Include(p => p.Options).FirstOrDefault();

            if (product == null)
            {
                throw new Exception();
            }
            if (formData.Name != "")
            {
                product.Name = formData.Name;
            }
            if (formData.Description != "")
            {
                product.Description = formData.Description;
            }
            if (formData.Price != 0 && formData.Price > 0)
            {
                product.Price = formData.Price;
            }
            if (formData.Quantity >= 0)
            {
                product.Quantity = formData.Quantity;
            }
            if (formData.CategoryId != 0 && formData.CategoryId > 0)
            {
                product.CategoryId = formData.CategoryId;
            }

            var properties = new List<Property>();
            var options = new List<Option>();

            foreach (var item in formData.Properties)
            {
                var property = this._context.Properties.Where(p => p.Id == item.Id).FirstOrDefault();

                properties.Add(property);

                foreach (var opt in item.Options)
                {
                    var option = this._context.Options.Where(o => o.Id == opt.Id).FirstOrDefault();

                    options.Add(option);
                }
            }

            product.Properties = properties;
            product.Options = options;

            this._context.Entry(product).State = EntityState.Modified;
            this._context.SaveChanges();

            return new ProductViewModel
            {
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                Quantity = product.Quantity,
                CategoryId = product.CategoryId
            };
        }
        public void Delete(int id)
        {
            var product = this._context.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                throw new Exception();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
        }
        public void Create(ProductViewModel formData)
        {
            var properties = new List<Property>();
            var options = new List<Option>();

            foreach (var item in formData.Properties)
            {
                var property = this._context.Properties.Where(p => p.Id == item.Id).FirstOrDefault();
                properties.Add(property);

                foreach (var opt in item.Options)
                {
                    var option = this._context.Options.Where(o => o.Id == opt.Id).FirstOrDefault();
                    options.Add(option);
                }
            }

            var product = new Product()
            {
                Name = formData.Name,
                Price = formData.Price,
                Description = formData.Description,
                Quantity = formData.Quantity,
                CategoryId = formData.CategoryId,
                Properties = properties,
                Options = options,
            };

            _context.Products.Add(product);
            _context.SaveChanges();
        }
    }
}
