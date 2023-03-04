using ProductsAPI.DAL.Models.Orders;

namespace ProductsAPI.DAL.ViewModels.Order
{
    public class OrderViewModel
    {
        public int? Id { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderDate { get; set; }
        public string ShippingAddress { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public string MobilePhone { get; set; }
        public string? Status {get;set;}

    }
}
