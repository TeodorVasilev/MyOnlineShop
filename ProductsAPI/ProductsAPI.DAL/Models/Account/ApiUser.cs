﻿using Microsoft.AspNetCore.Identity;
using ProductsAPI.DAL.Models.Products;

namespace ProductsAPI.DAL.Models.Account
{
    public class ApiUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Product> Favorites { get; set; }
        public ICollection<Cart> CartProducts { get; set; }
    }
}
