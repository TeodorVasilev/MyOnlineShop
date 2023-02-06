using Microsoft.AspNetCore.Http;

namespace ProductsAPI.DAL.ViewModels.Image
{
    public class UploadImagesViewModel
    {
        public List<IFormFile> Images { get; set; }
        public int ProductId { get; set; }
    }
}
