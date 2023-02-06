using ProductsAPI.DAL.Models.Products;

namespace ProductsAPI.DAL.Models.Images
{
    public class Image
    {
        public int Id { get; set; }
        public byte[] BinaryData { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
