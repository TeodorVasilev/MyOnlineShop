using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.RegisterService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private IRegisterService _registerService;

        public RegisterController(IRegisterService registerService)
        {
            this._registerService = registerService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel formData)
        {
            var result = await this._registerService.Register(formData, "User");

            if (result == "Success")
            {
                return Ok();
            }
            else if (result == "Existing email")
            {
                return StatusCode(422);
            }
            else
            {
                throw new Exception("Database Error");///
            }
        }
    }
}
