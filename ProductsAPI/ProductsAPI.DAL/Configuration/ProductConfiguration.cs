using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.Models.Products;

namespace ProductsAPI.DAL.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne<Category>(p => p.Category)
                   .WithMany(c => c.Products)
                   .HasForeignKey(p => p.CategoryId);

            builder.HasData
                (
                    new Product
                    {
                        Id = 1,
                        Name = "Product 1",
                        Price = 20m,
                        Description = "Test Product",
                        Quantity = 20,
                        CategoryId = 1,
                    },
                    new Product
                    {
                        Id = 2,
                        Name = "Product 2",
                        Price = 21m,
                        Description = "Test Product",
                        Quantity = 21,
                        CategoryId = 1,
                    },
                    new Product
                    {
                        Id = 3,
                        Name = "Product 3",
                        Price = 22m,
                        Description = "Test Product",
                        Quantity = 22,
                        CategoryId = 2,
                    },
                    new Product
                    {
                        Id = 4,
                        Name = "Product 4",
                        Price = 23m,
                        Description = "Test Product",
                        Quantity = 23,
                        CategoryId = 2,
                    },
                    new Product
                    {
                        Id = 5,
                        Name = "Product 5",
                        Price = 24m,
                        Description = "Test Product",
                        Quantity = 24,
                        CategoryId = 3,
                    },
                    new Product
                    {
                        Id = 6,
                        Name = "Product 6",
                        Price = 25m,
                        Description = "Test Product",
                        Quantity = 25,
                        CategoryId = 3,
                    }
                );
        }
    }
}
