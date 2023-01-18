using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models.Products;
using ProductsAPI.DAL.ViewModels.Option;

namespace ProductsAPI.Service.OptionService
{
    public class OptionService : IOptionService
    {
        private readonly ProductsDbContext _context;
        public OptionService(ProductsDbContext context)
        {
            this._context = context;
        }

        public void Create(OptionViewModel formData)
        {
            var option = new Option()
            {
                Name = formData.Name
            };

            this._context.Options.Add(option);
            this._context.SaveChanges();
        }

        public void Delete(int id)
        {
            var option = this._context.Options.Where(p => p.Id == id).FirstOrDefault();

            if (option == null)
            {
                throw new Exception();
            }

            this._context.Options.Remove(option);
            this._context.SaveChanges();
        }

        public async Task<List<OptionViewModel>> GetOptions(int propertyId)
        {
            var property = this._context.Properties.Where(p => p.Id == propertyId).Include(p => p.Options).FirstOrDefault();
            var propertyOptions = property.Options.ToList();
            var model = this._context.Options.Select(o => new OptionViewModel() { Id = o.Id, Name = o.Name }).ToList();
            foreach (var option in model)
            {
                foreach (var propOption in propertyOptions)
                {
                    if (option.Id == propOption.Id)
                    {
                        option.IsSelected = true;
                    }
                }
            }

            return model;
        }

        public Task<OptionViewModel> GetOptionById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<OptionViewModel> Update(OptionViewModel formData)
        {
            throw new NotImplementedException();
        }
    }
}
