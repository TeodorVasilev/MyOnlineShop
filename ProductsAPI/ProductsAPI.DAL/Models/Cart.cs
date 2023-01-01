using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.Models.Products;

namespace ProductsAPI.DAL.Models
{
    public class Cart
    {
        public int UserId { get; set; }
        public ApiUser User { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
