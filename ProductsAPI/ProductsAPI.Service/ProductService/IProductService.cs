using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Account;

namespace ProductsAPI.Service.ProductService
{
    public interface IProductService
    {
        void Create(ProductViewModel formData);
        void Update(int id, ProductViewModel formData);//
        void Delete(int id);
        Task<List<int>> AddToCart(int userId, int productId, int quantity);
        Task<List<int>> RemoveFromCart(int userId, int productId);
        Task<List<int>> ToggleFavoriteProduct(int userId, int productId);
        List<ProductViewModel> GetUserCart(int userId);
        ProductListViewModel GetUserFavoriteProducts(int id);
        ProductListViewModel GetPaginatedProducts(FilterViewModel filters);
        ProductViewModel GetProductById(int id);
        IQueryable<Product> FilterQuery(IQueryable<Product> query, FilterViewModel filters);
        double GetTotalPages(int categoryId = 0, decimal priceFrom = 0, decimal priceTo = 0);
    }
}
