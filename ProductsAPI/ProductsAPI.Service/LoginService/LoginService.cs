using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.JWT;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.Service.RoleService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ProductsAPI.Service.LoginService
{
    public class LoginService : ILoginService
    {
        private readonly ProductsDbContext _context;
        private readonly IRoleService _roleService;
        //private readonly SignInManager<ApiUser> _signInManager;

        public LoginService(ProductsDbContext context, IRoleService roleService)
        {
            this._context = context;
            this._roleService = roleService;
        }

        private async Task<List<Claim>> GetUserClaims(ICollection<IdentityUserRole<int>> roles)
        {
            List<ApiRole> roleNames = await this._roleService.GetAllRoles();
            var claims = new List<Claim>();

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role,
                    roleNames.Find(r => r.Id == role.RoleId).Name));
            }

            claims.Add(new Claim("UserId", roles.First().UserId.ToString()));

            return claims;
        }

        private async Task<JwtSecurityToken> GenerateToken(ApiUser user)
        {
            var signingCredentials = new SigningCredentials(JWTConfig.SymmetricKey,
                SecurityAlgorithms.HmacSha256Signature);

            //Claims
            List<Claim> claims = await this.GetUserClaims(await this._roleService.GetUserRoles(user.Id));
            claims.Add(new Claim("sub", $"{user.Id}"));
            var token = new JwtSecurityToken(
                issuer: "ProductsAPI",
                audience: "ProductsAPI",
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signingCredentials,
                claims: claims);

            return token;
        }

        public async Task<(string token, string message)> Attempt(string email, string password)
        {
            ApiUser user = await this._context.Users
                .Where(u => u.Email == email)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return (null, "not-existing-user");
            }

            var hash = new PasswordHasher();
            var result = hash.VerifyHashedPassword(user.PasswordHash, password);
            if (result == Microsoft.AspNet.Identity.PasswordVerificationResult.Failed)
            {
                return (null, "wrong-password");
            }

            string token = new JwtSecurityTokenHandler().WriteToken(await this.GenerateToken(user));
            ApiRole role = await this._roleService.GetRoleByUserId(user.Id);
            string roleName = role.Name;

            return (token, roleName);
        }
    }
}
