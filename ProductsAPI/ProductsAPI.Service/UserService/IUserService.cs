using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.ViewModels.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Service.UserService
{
    public interface IUserService
    {
        Task<UserViewModel> GetUserById(int id);
        Task<bool> Update(EditUserViewModel userViewModel);
    }
}
