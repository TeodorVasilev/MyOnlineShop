using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.LoginService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            this._loginService = loginService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel formData)
        {
            var (token, message) = await this._loginService.Attempt(formData.Email, formData.Password);
            if (token == null)
            {
                return NotFound(message);
            }

            return Ok(new LoginResponseViewModel(token, message));
        }
    }
}
