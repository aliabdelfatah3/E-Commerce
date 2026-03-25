namespace ECommerce.API.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public string Size { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
