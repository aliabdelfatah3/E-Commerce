using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ECommerce.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;
        
        public string Role { get; set; } = "User";
    }
}
