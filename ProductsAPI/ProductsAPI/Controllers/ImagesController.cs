using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Image;
using ProductsAPI.Service.ImageService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        public ImagesController(IImageService imageService)
        {
            this._imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImages([FromForm]UploadImagesViewModel images)
        {
            this._imageService.UploadImages(images);
            return Ok();
        }
    }
}
