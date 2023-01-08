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
            if (formData.Name == null || formData.Name.Length < 3)
            {
                throw new ArgumentException();
            }

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

        public async Task<List<OptionViewModel>> GetOptions()
        {
            return this._context.Options.Select(p => new OptionViewModel() { Id = p.Id, Name = p.Name }).ToList();
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
