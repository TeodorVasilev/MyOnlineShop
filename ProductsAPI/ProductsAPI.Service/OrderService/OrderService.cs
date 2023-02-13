using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Orders;
using ProductsAPI.DAL.ViewModels.Order;

namespace ProductsAPI.Service.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly ProductsDbContext _context;
        public OrderService(ProductsDbContext context)
        {
            this._context = context;
        }

        public async Task<List<OrderViewModel>> GetAllOrders()
        {
            var orderStatusType = typeof(OrderStatus);

            return await this._context.Orders.Select(o => new OrderViewModel()
            {
                Id = o.Id,
                UserId = o.UserId,
                MobilePhone = o.MobilePhone,
                ShippingAddress = o.ShippingAddress,
                TotalPrice = o.TotalPrice,
                Status = o.Status,
                OrderDate = o.OrderDate,
            }).ToListAsync();
        }

        public void Create(OrderViewModel formData)
        {
            var cart = this._context.Carts.Where(c => c.UserId == formData.UserId).Include(c => c.Product).ToList();
            var orderItems = new List<OrderItem>();

            foreach (var cartProduct in cart)
            {
                orderItems.Add(new OrderItem()
                {
                    ProductId = cartProduct.ProductId,
                    Quantity = cartProduct.Quantity,
                    UnitPrice = cartProduct.UnitPrice,
                });
            }

            var order = new Order()
            {
                OrderItems = orderItems,
                Status = OrderStatus.Pending,
                TotalPrice = formData.TotalPrice,
                ShippingAddress = formData.ShippingAddress,
                MobilePhone = formData.MobilePhone,
                UserId = formData.UserId,
                OrderDate = DateTime.Now,
            };

            this._context.Orders.Add(order);
            this._context.SaveChanges();
        }

        public void Update(OrderViewModel formData)
        {
            throw new NotImplementedException();
        }
    }
}
