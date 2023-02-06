using Microsoft.AspNetCore.Http;
using ProductsAPI.DAL.ViewModels.Image;

namespace ProductsAPI.Service.ImageService
{
    public interface IImageService
    {
        void UploadImages(UploadImagesViewModel images);
    }
}
