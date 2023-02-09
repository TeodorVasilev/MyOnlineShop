using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Order;
using ProductsAPI.Service.OrderService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        public async Task<IActionResult> Create(OrderViewModel formData)
        {
            //this._orderService.Create(formData);
            throw new NotImplementedException();
        }
    }
}
