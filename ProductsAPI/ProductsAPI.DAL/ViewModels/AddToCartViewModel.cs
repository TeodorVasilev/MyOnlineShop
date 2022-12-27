namespace ProductsAPI.DAL.ViewModels
{
    public class AddToCartViewModel
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
