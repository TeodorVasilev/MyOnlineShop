using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.Models.Products;

namespace ProductsAPI.DAL.Models
{
    public class Cart
    {
        public int UserId { get; set; }
        public virtual ApiUser User { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}
