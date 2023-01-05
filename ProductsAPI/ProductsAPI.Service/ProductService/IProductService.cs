using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.Models.Products;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Account;

namespace ProductsAPI.Service.ProductService
{
    public interface IProductService
    {
        void Create(ProductViewModel formData);
        Task<ProductViewModel> Update(ProductViewModel formData);
        void Delete(int id);
        Task<List<int>> ToggleFavoriteProduct(int userId, int productId);
        ProductListViewModel GetUserFavoriteProducts(int id);
        ProductListViewModel GetPaginatedProducts(FilterViewModel filters);
        ProductViewModel GetProductById(int id);
        IQueryable<Product> FilterQuery(IQueryable<Product> query, FilterViewModel filters);
        double GetTotalPages(int categoryId = 0, decimal priceFrom = 0, decimal priceTo = 0, int perPage = 0);
    }
}
