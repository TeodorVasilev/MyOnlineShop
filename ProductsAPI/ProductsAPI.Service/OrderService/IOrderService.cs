using ProductsAPI.DAL.ViewModels.Order;

namespace ProductsAPI.Service.OrderService
{
    public interface IOrderService
    {
        void Create(OrderViewModel formData);
    }
}
