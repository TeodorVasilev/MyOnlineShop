using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels;

namespace ProductsAPI.Service.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ProductsDbContext _context;
        public CategoryService(ProductsDbContext context)
        {
            this._context = context;
        }
        public CategoryViewModel GetCategoryById(int id)
        {   
            var category = _context.Categories.FirstOrDefault(p => p.Id == id);

            if(category == null)
            {
                throw new Exception();
            }

            var model = new CategoryViewModel();

            model.Id = category.Id;
            model.Name = category.Name;
            model.Description = category.Description;

            return model;
        }
        public List<CategoryViewModel> GetCategories(int categoryId = 0, string? name = null)
        {
            var query = _context.Categories.AsQueryable();

            if (categoryId != 0)
                query = query.Where(c => c.Id == categoryId);

            if (name != null)
                query = query.Where(c => c.Name == name);

            return query.Select(c => new CategoryViewModel() { Id = c.Id, Name = c.Name, Description = c.Description}).ToList(); 
            
            //.Include(c => c.Products);
        }
        public void Create(CategoryViewModel formData)
        {
            var category = new Category()
            {
                Name = formData.Name,
                Description = formData.Description,
            };

            _context.Categories.Add(category);
            _context.SaveChanges();
        }
        public void Update(int id, CategoryViewModel formData)
        {
            var category = GetCategoryById(id);

            if (category == null)
            {
                throw new Exception();
            }

            category.Name = formData.Name;
            category.Description = formData.Description; //products??

            _context.SaveChangesAsync();
        }
        public void Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);

            if(category == null)
            {
                throw new Exception();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();
        }
    }
}
