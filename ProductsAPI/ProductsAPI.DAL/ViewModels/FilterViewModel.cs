namespace ProductsAPI.DAL.ViewModels
{
    public class FilterViewModel
    {
        //int curPage = 0, int categoryId = 0, decimal priceFrom = 0, decimal priceTo = 0, int order = 0, isLoggedIn = true;
        public int CurrentPage { get; set; }
        public int CategoryId { get; set; }
        public decimal PriceFrom { get; set; }
        public decimal PriceTo { get; set; }
        public int Order { get; set; }
    }
}
