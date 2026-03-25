namespace ECommerce.API.DTOs
{
    public class AddToCartDto
    {
        public int product_id { get; set; }
        public int quantity { get; set; }
        public string size { get; set; } = string.Empty;
    }

    public class UpdateCartItemDto
    {
        public int quantity { get; set; }
    }
}
