namespace ProductsAPI.DAL.Models.Products
{
    public class Option
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Property> Properties { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
