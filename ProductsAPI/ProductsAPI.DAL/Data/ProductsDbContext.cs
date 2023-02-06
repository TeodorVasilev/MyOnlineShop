using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Configuration;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.DAL.Models.Images;
using ProductsAPI.DAL.Models.Products;

namespace ProductsAPI.DAL.Data
{
    public class ProductsDbContext : IdentityDbContext<ApiUser, ApiRole, int>
    {
        public DbSet<Property> Properties { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ApiUser> Users { get; set; }
        public DbSet<ApiRole> Roles { get; set; }  
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server =.; Database = ProductsAPIDatabase; Trusted_Connection = True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ApiUserConfiguration());
            modelBuilder.ApplyConfiguration(new ApiRoleConfiguration());
            modelBuilder.ApplyConfiguration(new CartConfiguration());
            modelBuilder.ApplyConfiguration(new ImageConfiguration());
        }
    }
}
