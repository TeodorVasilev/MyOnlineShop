using ProductsAPI.DAL.Models.Account;

namespace ProductsAPI.DAL.Models.Products
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<Option> Options { get; set; }
        public ICollection<Property> Properties { get; set; }
        public ICollection<ApiUser> ApiUsers { get; set; }
        public ICollection <Cart> CartProducts{ get; set; }
    }
}
