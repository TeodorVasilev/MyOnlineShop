using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Image;

namespace ProductsAPI.Service.ProductSearchService
{
    public class ProductSearchService : IProductSearchService
    {
        private readonly ProductsDbContext _context;

        public ProductSearchService(ProductsDbContext context)
        {
            _context = context;
        }

        public ProductListViewModel Search(string query, int currentPage = 1, int perPage = 10)
        {
            var productsQuery = _context.Products.Include(p => p.Images).AsQueryable();

            if (!string.IsNullOrEmpty(query))
            {
                productsQuery = productsQuery.Where(p => p.Name.Contains(query));
            }

            var products = productsQuery.Skip((currentPage - 1) * perPage).Take(perPage)
                .Select(p => new ProductViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Description = p.Description,
                    CategoryId = p.CategoryId,
                    Images = p.Images.Select(i => new ImageViewModel()
                    {
                        Id = i.Id,
                        BinaryData = i.BinaryData,
                        ProductId = i.ProductId,

                    }).ToList(),
                }).ToList();

            var model = new ProductListViewModel();
            model.Products = products;
            model.TotalPages = productsQuery.Count();

            return model;
        }
    }
}
