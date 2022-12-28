namespace ProductsAPI.DAL.ViewModels
{
    public class UpdateCartViewModel
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
