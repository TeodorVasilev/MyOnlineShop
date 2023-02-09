namespace ProductsAPI.DAL.ViewModels.Order
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string ShippingAddress { get; set; }
        public int UserId { get; set; }
        List<int> ProductIds { get; set; }
    }
}
