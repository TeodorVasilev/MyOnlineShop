using Microsoft.AspNetCore.Identity;
using ProductsAPI.DAL.Models.Account;

namespace ProductsAPI.Service.RoleService
{
    public interface IRoleService
    {
        Task<ApiRole> GetRoleById(int roleId);
        Task<ApiRole> GetRoleByUserId(int userId);
        Task<List<IdentityUserRole<int>>> GetUserRoles(int userId);
        Task<ApiRole> GetRoleByName(string roleName);
        Task<List<ApiRole>> GetAllRoles();

    }
}
