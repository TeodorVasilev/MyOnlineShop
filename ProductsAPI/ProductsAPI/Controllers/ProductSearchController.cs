using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.Service.ProductSearchService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSearchController : ControllerBase
    {
        private readonly IProductSearchService _productSearchService;

        public ProductSearchController(IProductSearchService productSearchService)
        {
            this._productSearchService = productSearchService;
        }

        [HttpGet]
        public ProductListViewModel ProductSearch(string query, int page = 1, int perPage = 10)
        {
            return _productSearchService.Search(query, page, perPage);
            //return Ok(products);
        }
    }
}
