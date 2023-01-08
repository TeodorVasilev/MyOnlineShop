using ProductsAPI.DAL.ViewModels.Property;

namespace ProductsAPI.Service.PropertyService
{
    public interface IPropertyService
    {
        Task<PropertyViewModel> GetPropertyById(int id);
        Task<List<PropertyViewModel>> GetProperties();
        Task<PropertyViewModel> Update(PropertyViewModel formData);
        void Create(CreatePropertyViewModel formData);
        void Delete(int id);
    }
}
