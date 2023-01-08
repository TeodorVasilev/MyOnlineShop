using ProductsAPI.DAL.Models.Products;
using ProductsAPI.DAL.ViewModels.Option;

namespace ProductsAPI.DAL.ViewModels.Property
{
    public class PropertyViewModel
    {
        public PropertyViewModel()
        {
            this.Options = new List<OptionViewModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public List<OptionViewModel> Options { get; set; }
    }
}
