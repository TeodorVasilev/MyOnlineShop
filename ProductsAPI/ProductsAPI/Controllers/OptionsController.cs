using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.DAL.ViewModels.Option;
using ProductsAPI.Service.OptionService;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class OptionsController : ControllerBase
    {
        private readonly IOptionService _optionService;
        public OptionsController(IOptionService propertyService)
        {
            this._optionService = propertyService;
        }

        [HttpGet("{id}")]
        public async Task<OptionViewModel> GetOptionById(int id)
        {
            return await this._optionService.GetOptionById(id);
        }

        [HttpGet]
        public async Task<List<OptionViewModel>> GetOptions(int propertyId)
        {
            return await this._optionService.GetOptions(propertyId);
        }

        [HttpPost]
        public async Task<IActionResult> Create(OptionViewModel formData)
        {
            _optionService.Create(formData);
            return Created(formData.Name.ToString(), formData);
        }

        [HttpPut]
        public async Task<OptionViewModel> Update(OptionViewModel formData)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            this._optionService.Delete(id);
            return NoContent();
        }
    }
}
