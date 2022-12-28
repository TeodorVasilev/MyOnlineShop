using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.Service.ProductService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FavoritesController : ControllerBase
    {
        private readonly IProductService _productService;

        public FavoritesController(IProductService productService)
        {
            this._productService = productService;
        }

        [HttpPost]
        [Route("ToggleFavorites")]
        public async Task<List<int>> ToggleFavorite(ToggleFavoriteViewModel favModel)
        {
            return await this._productService.ToggleFavoriteProduct(favModel.UserId, favModel.ProductId);
        }

        [HttpGet]
        [Route("UserFavorites")]
        public ProductListViewModel GetUserFavoriteProducts(int userId)
        {
            return this._productService.GetUserFavoriteProducts(userId);
        }
    }
}
