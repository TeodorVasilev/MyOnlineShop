using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Account;

namespace ProductsAPI.Service.RoleService
{
    public class RoleService : IRoleService
    {
        private readonly ProductsDbContext _context;
        public RoleService(ProductsDbContext context)
        {
            this._context = context;
        }

        public async Task<ApiRole> GetRoleById(int roleId)
        {
            return await this._context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
        }

        public async Task<List<IdentityUserRole<int>>> GetUserRoles(int userId)
        {
            //List<int> userRolesIds = await this._context.UserRoles
            //    .Where(ur => ur.UserId == userId)
            //    .Select(ur => ur.RoleId)   
            //    .ToListAsync();

            //var roles = new List<ApiRole>();

            //foreach (int roleId in userRolesIds)
            //{
            //    roles.Add(await this._context.Roles.Where(r => r.Id == roleId).FirstOrDefaultAsync());
            //}

            //return roles;

            return await this._context.UserRoles
                .Where(ur => ur.UserId == userId)
                .ToListAsync();
        }

        public async Task<ApiRole> GetRoleByName(string roleName)
        {
            return await this._context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        }

        public async Task<List<ApiRole>> GetAllRoles()
        {
            return await this._context.Roles.ToListAsync();
        }

        public async Task<ApiRole> GetRoleByUserId(int userId)
        {
            var userRoleId = this._context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Select(ur => ur.RoleId)
                .First();

            return await this.GetRoleById(userRoleId);
        }
    }
}
