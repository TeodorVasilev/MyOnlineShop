using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels;

namespace ProductsAPI.Service.CategoryService
{
    public interface ICategoryService
    {
        public List<CategoryViewModel> GetCategories(int categoryId = 0, string? name = null);
        public CategoryViewModel GetCategoryById(int id);
        public void Update(int id, CategoryViewModel formData);
        public void Create(CategoryViewModel formData);
        public void Delete(int id);
    }
}
