using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.Models;
using ProductsAPI.DAL.ViewModels;
using ProductsAPI.Service.ProductService;

namespace ProductsAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            this._productService = productService;
        }

        [HttpGet]
        public ProductListViewModel GetPaginatedProducts([FromQuery]FilterViewModel filters)
        {
            return this._productService.GetPaginatedProducts(filters);
        }

        [HttpGet("{id}")]
        public ProductViewModel GetProductById(int id)
        {
            return _productService.GetProductById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductViewModel formData)
        {
            _productService.Create(formData);
            return CreatedAtAction(nameof(GetProductById), new { id = formData.Id }, formData);//tova moje li da e v service
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductViewModel formData)
        {
            _productService.Update(id, formData);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _productService.Delete(id);
            return NoContent();
        }
    }
}
