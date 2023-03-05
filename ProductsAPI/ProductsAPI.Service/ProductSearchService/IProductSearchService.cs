using ProductsAPI.DAL.ViewModels;

namespace ProductsAPI.Service.ProductSearchService
{
    public interface IProductSearchService
    {
        ProductListViewModel Search(string query, int currentPage = 1, int perPage = 10);
    }
}
