using ProductsAPI.DAL.Models.Orders;

namespace ProductsAPI.DAL.ViewModels.Order
{
    public class OrderViewModel
    {
        public int? Id { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public string ShippingAddress { get; set; }
        public int UserId { get; set; }
        public string MobilePhone { get; set; }
        public OrderStatus Status {get;set;}

    }
}
