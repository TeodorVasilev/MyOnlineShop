using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.RoleService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RolesController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<List<RoleViewModel>> GetRoles()
        {
            return await this._roleService.GetListOfRoles();
        }

        [HttpGet("{id}")]
        public async Task<RoleViewModel> GetRole(int id)
        {
            return await this._roleService.GetRoleById(id);
        }
    }
}
