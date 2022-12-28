using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Cart;

namespace ProductsAPI.Service.CartService
{
    public interface ICartService
    {
        Task<LayoutCartViewModel> AddToCart(int userId, int productId, int quantity);
        Task<LayoutCartViewModel> RemoveFromCart(int userId, int productId);
        Task<CartViewModel> GetUserCart(int userId);
    }
}
