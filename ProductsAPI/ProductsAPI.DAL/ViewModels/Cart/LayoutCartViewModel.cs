namespace ProductsAPI.DAL.ViewModels
{
    public class LayoutCartViewModel
    {
        public LayoutCartViewModel()
        {
            this.ProductIds = new List<int>();
        }

        public List<int> ProductIds { get; set; }
        public int Quantity { get; set; }
    }
}
