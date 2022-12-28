using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Cart;
using ProductsAPI.Service.CartService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            this._cartService = cartService;
        }

        [HttpPost]
        [Route("AddToCart")]
        public async Task<LayoutCartViewModel> AddToCart(UpdateCartViewModel model)
        {
            return await this._cartService.AddToCart(model.UserId, model.ProductId, model.Quantity);
        }

        [HttpPost]
        [Route("RemoveFromCart")]
        public async Task<LayoutCartViewModel> RemoveFromCart(UpdateCartViewModel model)
        {
            return await this._cartService.RemoveFromCart(model.UserId, model.ProductId);
        }

        [HttpGet]
        [Route("UserCart")]
        public async Task<CartViewModel> GetUserCart(int userId)
        {
            return await this._cartService.GetUserCart(userId);
        }
    }
}
