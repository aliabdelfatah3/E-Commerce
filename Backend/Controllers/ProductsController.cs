using ECommerce.API.Data;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1, 
            [FromQuery] int limit = 12,
            [FromQuery] string? search = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] string? sort = null)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(p => EF.Functions.Like(p.Title, $"%{search}%"));
            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);
            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            query = sort?.ToLowerInvariant() switch
            {
                "price_asc" => query.OrderBy(p => (double)p.Price),
                "price_desc" => query.OrderByDescending(p => (double)p.Price),
                _ => query.OrderBy(p => p.Id)
            };

            var total = await query.CountAsync();
            var products = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            Response.Headers.CacheControl = "public, max-age=300";
            return Ok(new { data = products, total, page, limit });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetByCategory(
            string category, 
            [FromQuery] int page = 1, 
            [FromQuery] int limit = 12,
            [FromQuery] string? search = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] string? sort = null)
        {
            var query = _context.Products.Where(p => p.Category.ToLower() == category.ToLower());

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(p => EF.Functions.Like(p.Title, $"%{search}%"));
            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);
            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            query = sort?.ToLowerInvariant() switch
            {
                "price_asc" => query.OrderBy(p => (double)p.Price),
                "price_desc" => query.OrderByDescending(p => (double)p.Price),
                _ => query.OrderBy(p => p.Id)
            };

            var total = await query.CountAsync();
            var products = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            Response.Headers.CacheControl = "public, max-age=300";
            return Ok(new { data = products, total, page, limit });
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
    }
}
