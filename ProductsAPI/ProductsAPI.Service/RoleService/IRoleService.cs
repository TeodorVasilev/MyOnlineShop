using Microsoft.AspNetCore.Identity;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.ViewModels.Account;

namespace ProductsAPI.Service.RoleService
{
    public interface IRoleService
    {
        Task<RoleViewModel> GetRoleById(int roleId);
        string GetUserRole(int userId);
        Task<List<ApiRole>> GetAllRoles();
        Task<List<RoleViewModel>> GetListOfRoles();
        Task<ApiRole> GetRoleByName(string roleName);
        Task<ApiRole> GetRoleByUserId(int userId);
        Task<List<IdentityUserRole<int>>> GetUserRoles(int userId);
        bool IsUserInRole(int userId, int roleId);
    }
}
