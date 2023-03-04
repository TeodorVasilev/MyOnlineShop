using Microsoft.AspNetCore.Authorization;
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

        [HttpPost]
        public async Task<IActionResult> Create(OrderViewModel formData)
        {
            this._orderService.Create(formData);
            //return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<List<OrderViewModel>> GetAllOrders()
        {
            return await this._orderService.GetAllOrders();
        }

        [HttpGet("{id}")]
        public OrderViewModel GetOrder(int id)
        {
            return this._orderService.GetOrderById(id);
        }
    }
}
