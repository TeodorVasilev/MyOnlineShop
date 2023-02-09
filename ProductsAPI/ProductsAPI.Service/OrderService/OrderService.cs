using ProductsAPI.DAL.Data;
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

        public void Create(OrderViewModel formData)
        {

        }
    }
}
