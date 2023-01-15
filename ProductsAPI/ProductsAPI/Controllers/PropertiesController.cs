using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Property;
using ProductsAPI.Service.PropertyService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            this._propertyService = propertyService;
        }

        [HttpGet("{id}")]
        public async Task<PropertyViewModel> GetPropertyById(int id)
        {
            return await this._propertyService.GetPropertyById(id);
        }


        [HttpGet]
        public async Task<List<PropertyViewModel>> GetProperties()
        {
            return await this._propertyService.GetProperties();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePropertyViewModel formData)
        {
            _propertyService.Create(formData);
            return Created(formData.Name.ToString(), formData);
        }

        [HttpPut]
        public async Task<PropertyViewModel> Update(PropertyViewModel formData)
        {
            return await this._propertyService.Update(formData);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            this._propertyService.Delete(id);
            return NoContent();
        }
    }
}
