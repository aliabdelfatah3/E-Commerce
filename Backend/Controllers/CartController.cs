using ECommerce.API.Data;
using ECommerce.API.DTOs;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == GetUserId())
                .ToListAsync();

            var result = cartItems.Select(c => new
            {
                c.Id,
                c.ProductId,
                c.Quantity,
                c.Size,
                Product = c.Product == null ? null : new
                {
                    c.Product.Id,
                    c.Product.Title,
                    c.Product.Price,
                    c.Product.Image,
                    c.Product.Category,
                    c.Product.Description,
                    c.Product.RatingRate,
                    c.Product.RatingCount
                }
            }).ToList();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            try 
            {
                var userId = GetUserId();
                var existingItem = await _context.CartItems
                    .OrderBy(c => c.Id)
                    .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == dto.product_id && c.Size == dto.size);

                if (existingItem != null)
                {
                    existingItem.Quantity += dto.quantity;
                }
                else
                {
                    _context.CartItems.Add(new CartItem
                    {
                        UserId = userId,
                        ProductId = dto.product_id,
                        Size = dto.size ?? "",
                        Quantity = dto.quantity
                    });
                }
                await _context.SaveChangesAsync();
                return Ok(new { message = "Added to cart" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, detail = ex.InnerException?.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemDto dto)
        {
            var cartItem = await _context.CartItems
                .OrderBy(c => c.Id)
                .FirstOrDefaultAsync(c => c.ProductId == id && c.UserId == GetUserId());

            if (cartItem == null) return NotFound();

            cartItem.Quantity = dto.quantity;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Cart updated" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.ProductId == id && c.UserId == GetUserId());

            if (cartItem == null) return NotFound();

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Removed from cart" });
        }

        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var cartItems = await _context.CartItems.Where(c => c.UserId == GetUserId()).ToListAsync();
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Cart cleared" });
        }
    }
}
