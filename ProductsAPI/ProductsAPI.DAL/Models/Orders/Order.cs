using ProductsAPI.DAL.Models.Account;

namespace ProductsAPI.DAL.Models.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string ShippingAddress { get; set; }
        public string MobilePhone { get; set; }
        public OrderStatus Status { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public virtual ApiUser User { get; set; }
        public virtual ICollection<OrderItem> OrderItems{ get; set; }
    }
}
