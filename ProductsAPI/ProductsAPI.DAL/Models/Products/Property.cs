namespace ProductsAPI.DAL.Models.Products
{
    public class Property
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
        public ICollection<Option> Options { get; set; }
    }
}
