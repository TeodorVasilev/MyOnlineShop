using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductsAPI.DAL.Models;

namespace ProductsAPI.DAL.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);

            builder.HasData
                (
                    new Category
                    {
                        Id = 1,
                        Name = "Category 1",
                        Description = "Test Category 1"
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Category 2",
                        Description = "Test Category 2"
                    },
                    new Category
                    {
                        Id = 3,
                        Name = "Category 3",
                        Description = "Test Category 3"
                    }
                );
        }
    }
}
