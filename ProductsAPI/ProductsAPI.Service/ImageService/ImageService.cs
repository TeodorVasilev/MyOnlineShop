using Microsoft.AspNetCore.Http;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Images;
using ProductsAPI.DAL.ViewModels.Image;

namespace ProductsAPI.Service.ImageService
{
    public class ImageService : IImageService
    {
        private readonly ProductsDbContext _context;
        public ImageService(ProductsDbContext context)
        {
            this._context = context;
        }

        public void UploadImages(UploadImagesViewModel images)
        {
            if (images == null || images.Images.Count == 0)
            {
                throw new Exception();
            }

            foreach (var img in images.Images)
            {
                byte[] imageData = null;
                using (var binaryReader = new BinaryReader(img.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)img.Length);
                }

                var image = new Image
                {
                    BinaryData = imageData,
                    ProductId = images.ProductId
                };

                this._context.Images.Add(image);
            }

            this._context.SaveChanges();
        }

        //public List<byte[]> GetImages(int productId)
        //{
        //    var images = this._context.Images
        //}
    }
}
