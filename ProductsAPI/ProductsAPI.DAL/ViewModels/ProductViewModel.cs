using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels.Option;
using ProductsAPI.DAL.ViewModels.Property;

namespace ProductsAPI.DAL.ViewModels
{
    public class ProductViewModel
    {
        public ProductViewModel()
        {
            this.PropertiesIds = new List<int>();
            this.Properties = new List<PropertyViewModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public List<int> PropertiesIds { get; set; }
        public List<PropertyViewModel>? Properties { get; set; }
    }
}
