using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.ProductService;
using ProductsAPI.Service.UserService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IProductService _productService;

        public UserController(IUserService userService, IProductService productService)
        {
            this._userService = userService;
            this._productService = productService;
        }

        [HttpGet]
        public async Task<UserViewModel> GetUser(int id)
        {
            return await this._userService.GetUserById(id);
        }

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser(EditUserViewModel formData)
        {
            //return updated user
            return Ok(await this._userService.Update(formData));
        }

        //delete
    }
}
