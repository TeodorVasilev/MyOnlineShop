using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.Service.CategoryService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryViewModel>> GetCategories(int categoryId = 0, string? name = null)
        {
            return _categoryService.GetCategories(categoryId, name);
        }

        [HttpGet("{id}")]
        public async Task<CategoryViewModel> GetCategoryById(int id)
        {
            return _categoryService.GetCategoryById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryViewModel formData)
        {
            _categoryService.Create(formData);
            return CreatedAtAction(nameof(GetCategoryById), new { id = formData.Id }, formData);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CategoryViewModel formData)
        {
            _categoryService.Update(id, formData);
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _categoryService.Delete(id);
            return NoContent();
        } 
    }
}
