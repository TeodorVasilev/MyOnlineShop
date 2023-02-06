namespace ProductsAPI.DAL.Models.Products
{
    public class Option
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Property> Properties { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
