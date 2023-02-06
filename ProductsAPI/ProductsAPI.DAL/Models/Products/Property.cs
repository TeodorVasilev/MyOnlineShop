namespace ProductsAPI.DAL.Models.Products
{
    public class Property
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Option> Options { get; set; }
    }
}
