using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.Models.Images;
using ProductsAPI.DAL.Models.Orders;

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
        public virtual Category? Category { get; set; }

        public virtual ICollection<Option> Options { get; set; }
        public virtual ICollection<Property> Properties { get; set; }
        public virtual ICollection<ApiUser> ApiUsers { get; set; }
        public virtual ICollection <Cart> CartProducts{ get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
