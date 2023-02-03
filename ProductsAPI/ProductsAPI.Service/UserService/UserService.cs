using Microsoft.AspNet.Identity;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.DAL.ViewModels.Account;
using ProductsAPI.Service.RoleService;

namespace ProductsAPI.Service.UserService
{
    public class UserService : IUserService
    {
        private readonly ProductsDbContext _context;
        private readonly IRoleService _roleService;

        public UserService(ProductsDbContext context, IRoleService roleService)
        {
            this._context = context;
            this._roleService = roleService;
        }

        public async Task<UserViewModel> GetUserById(int id)
        {
            var user = await this._context.Users.Where(u => u.Id == id).Include(p => p.Favorites).Include(u => u.CartProducts).FirstOrDefaultAsync();

            var model = new UserViewModel();
            var cartModel = new LayoutCartViewModel();

            model.Id = user.Id;
            model.Email = user.Email;
            model.FirstName = user.FirstName;
            model.LastName = user.LastName;
            model.FavoriteIds = user.Favorites.Select(p => p.Id).ToList();
            model.RoleName = this._roleService.GetUserRole(id);
            //cartService get cart
            cartModel.ProductIds = user.CartProducts.Select(p => p.ProductId).ToList();
            cartModel.Quantity = user.CartProducts.Select(p => p.Quantity).Sum();
            model.Cart = cartModel;

            return model;
        }

        public async Task<List<UserViewModel>> GetUsers(int roleId = 0)
        {   
            var users = await this._context.Users.ToListAsync();
            var model = new List<UserViewModel>();

            model = users.Select(u => new UserViewModel
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                RoleName = this._roleService.GetUserRole(u.Id),
                IsInRole = this._roleService.IsUserInRole(u.Id, roleId)

            }).ToList();

            return model;            
        }

        public async Task<bool> Update(EditUserViewModel formData)
        {
            var user = this._context.Users.Where(u => u.Id == formData.Id).FirstOrDefault();

            if(user == null)
            {
                return false;
            }

            if(formData.Email != "")
            {
                user.Email = formData.Email;
                user.UserName = formData.Email;
            }
            if(formData.FirstName != "")
            {
                user.FirstName = formData.FirstName;
            }
            if(formData.LastName != "")
            {
                user.LastName = formData.LastName;
            }



            if (formData.OldPassword != "" && formData.NewPassword != "")
            {
                PasswordHasher hash = new PasswordHasher();
                var verifyOldPassword = hash.VerifyHashedPassword(user.PasswordHash, formData.OldPassword);

                if (verifyOldPassword == PasswordVerificationResult.Failed)
                {
                    return false;
                }

                var newPasswordHash = hash.HashPassword(formData.NewPassword);
                user.PasswordHash = newPasswordHash;
            }

            this._context.Entry(user).State = EntityState.Modified;
            this._context.SaveChanges();

            return true;
        }
    }
}
