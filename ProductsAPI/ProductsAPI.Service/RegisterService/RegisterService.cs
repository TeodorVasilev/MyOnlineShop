using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.RoleService;

namespace ProductsAPI.Service.RegisterService
{
    public class RegisterService : IRegisterService
    {
        private readonly ProductsDbContext _context;
        private IRoleService _roleService;

        public RegisterService(ProductsDbContext context, IRoleService roleService)
        {
            this._context = context;
            this._roleService = roleService; 
        }

        private async Task<object> CheckExistingUser(ApiUser user)
        {
            return await this._context.Users
                .Select(u => new { u.Id, u.Email })
                .Where(u => u.Email == user.Email)
                .FirstOrDefaultAsync();
        }

        private async Task<bool> AssignRoleToUser(ApiUser user, string role)
        {
            var selectedRole = await this._roleService.GetRoleByName(role);
            if (selectedRole == null) { throw new Exception("Not Existing Role"); }

            var roleIdentity = new IdentityUserRole<int>()
            {
                UserId = user.Id,
                RoleId = selectedRole.Id
            };

            _context.UserRoles.Add(roleIdentity);

            return await this._context.SaveChangesAsync() >= 1 ? true : false;
        }


        public async Task<string> Register(RegisterViewModel formData, string role)
        {
            var user = new ApiUser()
            {
                UserName = formData.Email,
                Email = formData.Email,
                PasswordHash = new PasswordHasher()
                .HashPassword(formData.Password),
                FirstName = formData.FirstName,
                LastName = formData.LastName
            };

            if(await this.CheckExistingUser(user) != null)
            {
                return "Existing email";
            }

            this._context.Users.Add(user);
            await this._context.SaveChangesAsync();

            if(await this.AssignRoleToUser(user, role))
            {
                return "Success";
            }

            return "Error";
        }
    }
}
