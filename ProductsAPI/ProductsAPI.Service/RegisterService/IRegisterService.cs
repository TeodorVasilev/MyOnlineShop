using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.ViewModels.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Service.RegisterService
{
    public interface IRegisterService
    {
        Task<string> Register(RegisterViewModel formData, string role);
    }
}
