using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.ViewModels.Account;

namespace ProductsAPI.Service.RoleService
{
    public class RoleService : IRoleService
    {
        private readonly ProductsDbContext _context;
        public RoleService(ProductsDbContext context)
        {
            this._context = context;
        }

        public async Task<List<ApiRole>> GetAllRoles()
        {
            return await this._context.Roles.ToListAsync();
        }

        public async Task<ApiRole> GetRoleByName(string roleName)
        {
            return await this._context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        }

        public async Task<ApiRole> GetRoleByUserId(int userId)
        {
            var userRoleId = this._context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Select(ur => ur.RoleId)
                .First();

            return await this._context.Roles.Where(r => r.Id == userRoleId).FirstOrDefaultAsync();
        }

        public async Task<List<IdentityUserRole<int>>> GetUserRoles(int userId)
        {
            return await this._context.UserRoles.Where(ur => ur.UserId == userId).ToListAsync();
        }

        public string GetUserRole(int userId)
        {
            var userRole = this._context.UserRoles.Where(ur => ur.UserId == userId).FirstOrDefault();
            if (userRole == null)
            {
                throw new Exception();
            }

            var role = this._context.Roles.Where(r => r.Id == userRole.RoleId).FirstOrDefault();
            if (role == null)
            {
                throw new Exception();
            }

            return role.Name;
        }

        public async Task<RoleViewModel> GetRoleById(int roleId)
        {
            var role = await this._context.Roles.Where(r => r.Id == roleId).FirstOrDefaultAsync();
            var userRoles = await this._context.UserRoles.Where(ur => ur.RoleId == roleId).ToListAsync();
            var usersInRole = new List<UserViewModel>();

            foreach (var userRole in userRoles)
            {
                var user = this._context.Users.Where(u => u.Id == userRole.UserId).FirstOrDefault();

                usersInRole.Add(new UserViewModel() { Id = user.Id, FirstName = user.FirstName, LastName = user.LastName, Email = user.Email });
            }

            var model = new RoleViewModel()
            {
                Id = roleId,
                Name = role.Name,
                Users = usersInRole
            };

            return model;
        }

        public async Task<List<RoleViewModel>> GetListOfRoles()
        {
            return await this._context.Roles.Select(r => new RoleViewModel() { Id = r.Id, Name = r.Name }).ToListAsync();
        }
    }
}
