using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductsAPI.DAL.Models.Account;

namespace ProductsAPI.DAL.Configuration
{
    public class ApiRoleConfiguration : IEntityTypeConfiguration<ApiRole>
    {
        public void Configure(EntityTypeBuilder<ApiRole> builder)
        {
            builder.HasKey(r => r.Id);

            builder.HasData
                (
                    new ApiRole
                    {
                        Id = 1,
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    },

                    new ApiRole
                    {
                        Id = 2,
                        Name = "User",
                        NormalizedName = "USER"
                    }
                );
        }
    }
}
