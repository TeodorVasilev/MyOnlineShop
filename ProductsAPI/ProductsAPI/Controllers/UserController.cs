using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.ProductService;
using ProductsAPI.Service.UserService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IProductService _productService;

        public UserController(IUserService userService, IProductService productService)
        {
            this._userService = userService;
            this._productService = productService;
        }

        [HttpPost]
        [Route("ToggleFavorites")]
        public async Task<List<int>> ToggleFavorite(ToggleFavoriteViewModel favModel)
        {
            return await this._productService.ToggleFavoriteProduct(favModel.UserId, favModel.ProductId);
        }

        [HttpPost]
        [Route("AddToCart")]
        public async Task<List<int>> AddToCart(ToggleFavoriteViewModel favModel)
        {
            return await this._productService.AddToCart(favModel.UserId, favModel.ProductId);
        }

        [HttpGet]
        [Route("UserCart")]
        public ProductListViewModel GetUserCart(int userId)
        {
            return this._productService.GetUserCart(userId);
        }

        [HttpGet]
        [Route("UserFavorites")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ProductListViewModel GetUserFavoriteProducts(int userId)
        {
            return this._productService.GetUserFavoriteProducts(userId);
        }

        [HttpGet]
        public async Task<UserViewModel> GetUser(int id)
        {
            return await this._userService.GetUserById(id);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserViewModel formData)
        {
            //return updated user
            return Ok(await this._userService.Update(formData));
        }
    }
}
