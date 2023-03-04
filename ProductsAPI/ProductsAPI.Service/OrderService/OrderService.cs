using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Orders;
using ProductsAPI.DAL.ViewModels.Order;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

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
            return await this._context.Orders.Select(o => new OrderViewModel()
            {
                Id = o.Id,
                UserId = o.UserId,
                UserEmail = o.UserEmail,
                MobilePhone = o.MobilePhone,
                ShippingAddress = o.ShippingAddress,
                TotalPrice = o.TotalPrice,
                Status = o.Status.GetType().GetMember(o.Status.ToString()).FirstOrDefault().GetCustomAttribute<DisplayAttribute>().Name,
                OrderDate = o.OrderDate.ToString("dd/MM/yyyy HH:mm"),
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
                UserEmail = formData.UserEmail,
                OrderDate = DateTime.Now,
            };

            this._context.Orders.Add(order);
            this._context.SaveChanges();
        }

        public void Update(OrderViewModel formData)
        {
            throw new NotImplementedException();
        }

        public OrderViewModel GetOrderById(int id)
        {
            var order = this._context.Orders.Where(o => o.Id == id).FirstOrDefault();

            var model = new OrderViewModel()
            {
                Id = order.Id,
                UserId = order.UserId,
                UserEmail = order.UserEmail,
                MobilePhone = order.MobilePhone,
                OrderDate = order.OrderDate.ToString(),
                ShippingAddress = order.ShippingAddress,
                Status = order.Status.GetType().GetMember(order.Status.ToString()).FirstOrDefault().GetCustomAttribute<DisplayAttribute>().Name,
                TotalPrice = order.TotalPrice
            };

            return model;
        }
    }
}
