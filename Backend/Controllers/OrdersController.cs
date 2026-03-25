using ECommerce.API.Data;
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
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                var orders = await _context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                    .Where(o => o.UserId == GetUserId())
                    .OrderByDescending(o => o.OrderDate)
                    .ToListAsync();

                var result = orders.Select(o => new
                {
                    o.Id,
                    o.TotalAmount,
                    o.OrderDate,
                    o.Status,
                    Items = o.Items.Select(i => new
                    {
                        i.Id,
                        i.ProductId,
                        i.Quantity,
                        i.PriceAtPurchase,
                        i.Size,
                        Product = i.Product == null ? null : new
                        {
                            i.Product.Id,
                            i.Product.Title,
                            i.Product.Image,
                            i.Product.Category
                        }
                    }).ToList()
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, detail = ex.InnerException?.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var order = await _context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                    .OrderBy(o => o.Id)
                    .FirstOrDefaultAsync(o => o.Id == id && o.UserId == GetUserId());

                if (order == null) return NotFound();

                return Ok(new
                {
                    order.Id,
                    order.TotalAmount,
                    order.OrderDate,
                    order.Status,
                    Items = order.Items.Select(i => new
                    {
                        i.Id,
                        i.ProductId,
                        i.Quantity,
                        i.PriceAtPurchase,
                        i.Size,
                        Product = i.Product == null ? null : new
                        {
                            i.Product.Id,
                            i.Product.Title,
                            i.Product.Image,
                            i.Product.Category
                        }
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, detail = ex.InnerException?.Message });
            }
        }

        public class OrderItemRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
            public string Size { get; set; } = string.Empty;
            public decimal Price { get; set; }
        }

        public class OrderRequest
        {
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Address { get; set; } = string.Empty;
            public string City { get; set; } = string.Empty;
            public string ZipCode { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
            public List<OrderItemRequest> Items { get; set; } = new();
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            try
            {
                var userId = GetUserId();

                // Support items passed directly in request body (preferred)
                // OR fall back to server-side cart items for backward compatibility
                List<OrderItem> orderItems;
                decimal totalAmount;

                if (request.Items != null && request.Items.Any())
                {
                    // Use items provided directly in request
                    orderItems = request.Items.Select(i => new OrderItem
                    {
                        ProductId = i.ProductId,
                        Size = i.Size,
                        Quantity = i.Quantity,
                        PriceAtPurchase = i.Price
                    }).ToList();
                    totalAmount = request.Items.Sum(i => i.Price * i.Quantity);

                    // Also clear any server-side cart items for this user
                    var serverCartItems = await _context.CartItems
                        .Where(c => c.UserId == userId)
                        .ToListAsync();
                    _context.CartItems.RemoveRange(serverCartItems);
                }
                else
                {
                    // Fallback: use server-side cart
                    var cartItems = await _context.CartItems
                        .Include(c => c.Product)
                        .Where(c => c.UserId == userId)
                        .ToListAsync();

                    if (!cartItems.Any()) return BadRequest(new { message = "Cart is empty. Please add items before checking out." });

                    orderItems = cartItems.Select(c => new OrderItem
                    {
                        ProductId = c.ProductId,
                        Size = c.Size,
                        Quantity = c.Quantity,
                        PriceAtPurchase = c.Product!.Price
                    }).ToList();
                    totalAmount = cartItems.Sum(c => c.Product!.Price * c.Quantity);
                    _context.CartItems.RemoveRange(cartItems);
                }

                var order = new Order
                {
                    UserId = userId,
                    Name = request.Name,
                    Email = request.Email,
                    Address = request.Address,
                    City = request.City,
                    ZipCode = request.ZipCode,
                    Phone = request.Phone,
                    TotalAmount = totalAmount,
                    Items = orderItems
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    orderId = order.Id,
                    totalAmount = order.TotalAmount,
                    status = order.Status,
                    message = "Order placed successfully!"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, detail = ex.InnerException?.Message });
            }
        }
    }
}
