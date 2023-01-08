using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Products;
using ProductsAPI.DAL.ViewModels.Option;
using ProductsAPI.DAL.ViewModels.Property;

namespace ProductsAPI.Service.PropertyService
{
    public class PropertyService : IPropertyService
    {
        private readonly ProductsDbContext _context;
        public PropertyService(ProductsDbContext context)
        {
            this._context = context;
        }

        public void Create(CreatePropertyViewModel formData)
        {
            if (formData.Name == null || formData.Name.Length < 3)
            {
                throw new ArgumentException();
            }

            var property = new Property()
            {
                Name = formData.Name
            };

            this._context.Properties.Add(property);
            this._context.SaveChanges();
        }

        public void Delete(int id)
        {
            var property = this._context.Properties.Where(p => p.Id == id).FirstOrDefault();

            if(property == null)
            {
                throw new Exception();
            }

            this._context.Properties.Remove(property);
            this._context.SaveChanges();
        }

        public async Task<List<PropertyViewModel>> GetProperties()
        {
            var properties = this._context.Properties.Select(p => new PropertyViewModel() { Id = p.Id, Name = p.Name}).ToList();
            return properties;
        }

        public async Task<PropertyViewModel> GetPropertyById(int id)
        {
            var property = this._context.Properties.Where(p => p.Id == id).Include(p => p.Options).FirstOrDefault();

            if(property == null)
            {
                throw new Exception();
            }

            return new PropertyViewModel()
            {
                Id = id,
                Name = property.Name,
                Options = property.Options.Select(o => new OptionViewModel() { Id = o.Id, Name = o.Name }).ToList()
            };
        }

        public Task<PropertyViewModel> Update(PropertyViewModel formData)
        {
            //var property = this._context.Properties.Where(p => p.Id == formData.Id).Include(p => p.Options).FirstOrDefault();

            //property.Name = formData.Name;
            throw new NotImplementedException();
        }
    }
}
