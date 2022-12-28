namespace ProductsAPI.DAL.ViewModels.Cart
{
    public class CartViewModel
    {
        public List<ProductViewModel> Products { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
