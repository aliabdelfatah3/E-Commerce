using ECommerce.API.Models;
using System;
using System.Linq;

namespace ECommerce.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Schema is managed by EF Core Migrations (dotnet ef database update)
            // EnsureCreated() bypasses migrations and must NOT be used here.

            if (context.Products.Count() >= 100 && context.Products.Any(p => p.Image.Contains("placehold.co")))
            {
                return;
            }

            if (context.Products.Any())
            {
                context.CartItems.RemoveRange(context.CartItems);
                context.OrderItems.RemoveRange(context.OrderItems);
                context.Orders.RemoveRange(context.Orders);
                context.Products.RemoveRange(context.Products);
                context.SaveChanges();
            }

            var rnd = new Random(1234);

            // Men's color palette (blues/navy)
            string[] mensColors = {
                "1A237E/FFFFFF", "283593/FFFFFF", "1565C0/FFFFFF", "0D47A1/FFFFFF",
                "1976D2/FFFFFF", "0288D1/FFFFFF", "01579B/FFFFFF", "006064/FFFFFF",
                "004D40/FFFFFF", "1B5E20/FFFFFF", "33691E/FFFFFF", "827717/FFFFFF",
                "E65100/FFFFFF", "BF360C/FFFFFF", "4E342E/FFFFFF", "37474F/FFFFFF",
                "263238/FFFFFF", "212121/FFFFFF"
            };

            // Women's color palette (pinks/purples/warm)
            string[] womensColors = {
                "880E4F/FFFFFF", "AD1457/FFFFFF", "C2185B/FFFFFF", "E91E63/FFFFFF",
                "F06292/FFFFFF", "7B1FA2/FFFFFF", "6A1B9A/FFFFFF", "4A148C/FFFFFF",
                "D81B60/FFFFFF", "F50057/FFFFFF", "AA00FF/FFFFFF", "9C27B0/FFFFFF",
                "CE93D8/880E4F", "F8BBD0/880E4F", "EF9A9A/880E4F", "FFCCBC/BF360C"
            };

            // Kids' color palette (bright & fun)
            string[] kidsColors = {
                "2E7D32/FFFFFF", "388E3C/FFFFFF", "43A047/FFFFFF", "66BB6A/FFFFFF",
                "F57F17/FFFFFF", "F9A825/FFFFFF", "FBC02D/FFFFFF", "F57C00/FFFFFF",
                "0097A7/FFFFFF", "00838F/FFFFFF", "00695C/FFFFFF", "558B2F/FFFFFF",
                "6D4C41/FFFFFF", "EC407A/FFFFFF", "AB47BC/FFFFFF", "26C6DA/FFFFFF"
            };

            string[] mensTitles = {
                "Slim Fit T-Shirt", "Classic Polo", "Casual Hoodie", "Denim Jacket",
                "Business Shirt", "Streetwear Tee", "Knit Sweater", "Linen Shirt",
                "Sport Polo", "Printed Tee", "Fleece Jacket", "Oxford Shirt",
                "Graphic Hoodie", "V-Neck Sweater", "Cargo Shirt", "Flannel Shirt",
                "Compression Top", "Muscle Fit Tee", "Windbreaker", "Formal Shirt",
                "Henley Shirt", "Bomber Jacket", "Quarter-Zip", "Overshirt",
                "Performance Tee", "Merino Wool Top", "Relaxed Fit Shirt", "Varsity Jacket",
                "Long Sleeve Tee", "Thermal Top", "Corduroy Jacket", "Crewneck Sweatshirt",
                "Zip Hoodie", "Coach Jacket"
            };

            string[] womensTitles = {
                "Floral Blouse", "Elegant Dress", "Casual Top", "Wrap Skirt",
                "Knit Cardigan", "Chiffon Blouse", "Maxi Dress", "Linen Shirt",
                "Printed Sundress", "Ruffle Blouse", "Bodycon Dress", "Oversized Sweater",
                "Pleated Skirt", "Denim Jacket", "Off-Shoulder Top", "Silk Blouse",
                "A-Line Dress", "Crop Top", "Puff Sleeve Blouse", "Midi Dress",
                "Wrap Dress", "Blazer", "Tulle Skirt", "Smock Dress",
                "Ribbed Turtleneck", "Lace Blouse", "Satin Slip Dress", "Longline Cardigan",
                "Peplum Top", "Velvet Dress", "Cami Top", "Trench Coat",
                "Shirt Dress"
            };

            string[] kidsTitles = {
                "Cozy Hoodie", "Fun T-Shirt", "Comfy Joggers", "Cute Dress",
                "Denim Overalls", "Colorful Tee", "Warm Jacket", "Playful Romper",
                "Sport Shorts", "Striped Shirt", "Floral Dress", "Zip-Up Hoodie",
                "Cargo Pants", "Summer Set", "School Shirt", "Pajama Set",
                "Rain Jacket", "Swimwear", "Festival Top", "Winter Coat",
                "Track Suit", "Puffer Jacket", "Knit Sweater", "Dungarees",
                "Polo Shirt", "Leggings Set", "Print Tee", "Fleece Vest",
                "Corduroy Set", "Cargo Shorts", "Mesh Top", "Canvas Jacket",
                "Button Shirt"
            };

            // 34 Men's Products
            for (int i = 0; i < 34; i++)
            {
                string color = mensColors[i % mensColors.Length];
                string title = mensTitles[i % mensTitles.Length];
                context.Products.Add(new Product {
                    Title = $"Men's {title}",
                    Price = Math.Round((decimal)(rnd.NextDouble() * 200 + 20), 2),
                    Description = $"Premium men's {title.ToLower()} crafted for comfort, style and quality.",
                    Category = "men",
                    Image = $"https://placehold.co/400x400/{color}?text={Uri.EscapeDataString($"Men's {title}")}",
                    RatingRate = Math.Round((decimal)(rnd.NextDouble() * 2 + 3), 1),
                    RatingCount = rnd.Next(50, 500)
                });
            }

            // 33 Women's Products
            for (int i = 0; i < 33; i++)
            {
                string color = womensColors[i % womensColors.Length];
                string title = womensTitles[i % womensTitles.Length];
                context.Products.Add(new Product {
                    Title = $"Women's {title}",
                    Price = Math.Round((decimal)(rnd.NextDouble() * 200 + 20), 2),
                    Description = $"Premium women's {title.ToLower()} crafted for elegance and comfort.",
                    Category = "women",
                    Image = $"https://placehold.co/400x400/{color}?text={Uri.EscapeDataString($"Women's {title}")}",
                    RatingRate = Math.Round((decimal)(rnd.NextDouble() * 2 + 3), 1),
                    RatingCount = rnd.Next(50, 500)
                });
            }

            // 33 Kids' Products
            for (int i = 0; i < 33; i++)
            {
                string color = kidsColors[i % kidsColors.Length];
                string title = kidsTitles[i % kidsTitles.Length];
                context.Products.Add(new Product {
                    Title = $"Kids' {title}",
                    Price = Math.Round((decimal)(rnd.NextDouble() * 100 + 10), 2),
                    Description = $"Premium kids' {title.ToLower()} crafted for play and everyday adventures.",
                    Category = "kids",
                    Image = $"https://placehold.co/400x400/{color}?text={Uri.EscapeDataString($"Kids' {title}")}",
                    RatingRate = Math.Round((decimal)(rnd.NextDouble() * 2 + 3), 1),
                    RatingCount = rnd.Next(20, 300)
                });
            }

            context.SaveChanges();
        }
    }
}
