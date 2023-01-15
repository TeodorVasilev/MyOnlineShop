using ProductsAPI.DAL.ViewModels.Option;

namespace ProductsAPI.Service.OptionService
{
    public interface IOptionService
    {
        Task<OptionViewModel> GetOptionById(int id);
        Task<List<OptionViewModel>> GetOptions(int propertyId);
        Task<OptionViewModel> Update(OptionViewModel formData);
        void Create(OptionViewModel formData);
        void Delete(int id);
    }
}
