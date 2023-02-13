using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Cart;
using ProductsAPI.DAL.ViewModels.Image;

namespace ProductsAPI.Service.CartService
{
    public class CartService : ICartService
    {
        private readonly ProductsDbContext _context;

        public CartService(ProductsDbContext context)
        {
            this._context = context;
        }

        public async Task<LayoutCartViewModel> AddToCart(int userId, int productId, int quantity)
        {
            var user = this._context.Users.Where(u => u.Id == userId).Include(u => u.CartProducts).FirstOrDefault();

            var cartProduct = this._context.Carts.Where(c => c.UserId == userId && c.ProductId == productId).FirstOrDefault();

            if (cartProduct != null)
            {
                cartProduct.Quantity += quantity;
            }
            else
            {
                var product = this._context.Products.Where(p => p.Id == productId).FirstOrDefault();

                var cartProductToAdd = new Cart { UserId = user.Id, ProductId = product.Id, Quantity = quantity, UnitPrice = product.Price };

                user.CartProducts.Add(cartProductToAdd);
            }

            _context.SaveChanges();

            var model = new LayoutCartViewModel();

            model.ProductIds = user.CartProducts.Select(p => p.ProductId).ToList();
            model.Quantity = user.CartProducts.Select(p => p.Quantity).Sum();
            return model;
        }

        public async Task<LayoutCartViewModel> RemoveFromCart(int userId, int productId)
        {
            var user = this._context.Users.Where(u => u.Id == userId).Include(u => u.CartProducts).ThenInclude(c => c.Product).FirstOrDefault();

            var cartProduct = this._context.Carts.Where(c => c.UserId == userId && c.ProductId == productId).FirstOrDefault();
            this._context.Carts.Remove(cartProduct);

            this._context.SaveChanges();

            var model = new LayoutCartViewModel();

            model.ProductIds = user.CartProducts.Select(p => p.ProductId).ToList();
            model.Quantity = user.CartProducts.Select(p => p.Quantity).Sum();
            return model;
        }

        public async Task<CartViewModel> GetUserCart(int userId)
        {
            var user = this._context.Users.Where(u => u.Id == userId).Include(u => u.CartProducts).ThenInclude(c => c.Product).ThenInclude(p => p.Images).FirstOrDefault();
            var cartProducts = user.CartProducts.ToList();
            var products = user.CartProducts.Select(c => c.Product).ToList();

            var productsList = products.Select(p => new ProductViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Quantity = cartProducts.Where(cp => cp.ProductId == p.Id).FirstOrDefault().Quantity,
                Images = p.Images.Select(i => new ImageViewModel()
                {
                    Id = i.Id,
                    BinaryData = i.BinaryData,
                    ProductId = i.ProductId,

                }).ToList(),
                Description = p.Description,
                CategoryId = p.CategoryId
            }).ToList();

        var model = new CartViewModel();

        model.Products = productsList;
            model.TotalPrice = productsList.Select(p => p.Price* p.Quantity).Sum();

            return model;
        }
}
}
