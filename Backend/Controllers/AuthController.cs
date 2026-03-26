using ECommerce.API.Data;
using ECommerce.API.DTOs;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Security.Claims;
using System.Text;

namespace ECommerce.API.Controllers
{
    public class ForgotPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
        public string Token { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }

    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var cleanEmail = dto.Email?.Trim().ToLower();
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == cleanEmail))
                return BadRequest("Email already exists");
            dto.Email = cleanEmail;

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var cleanEmail = dto.Email?.Trim().ToLower();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == cleanEmail);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials");

            var token = GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role
                }
            });
        }

        [Authorize]
        [HttpGet("/user")]
        public async Task<IActionResult> GetUser()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null) return NotFound();
            
            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                user.Role
            });
        }

        [HttpPost("/logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPost("/forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var cleanEmail = request.Email?.Trim().ToLower();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == cleanEmail);
            
            if (user != null)
            {
                var token = GenerateResetToken(user);
                var frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:5173";
                var resetLink = $"{frontendUrl.TrimEnd('/')}/reset-password?token={token}";

                var emailSettings = _configuration.GetSection("EmailSettings");
                var senderEmail = emailSettings["SenderEmail"];
                var appPassword = emailSettings["AppPassword"];

                if (!string.IsNullOrEmpty(senderEmail) && !senderEmail.Contains("YOUR_GMAIL_HERE"))
                {
                    try
                    {
                        var message = new MimeMessage();
                        message.From.Add(new MailboxAddress(emailSettings["SenderName"], senderEmail));
                        message.To.Add(new MailboxAddress(user.Name, cleanEmail));
                        message.Subject = "Hexashop - Secure Password Reset";

                        var bodyBuilder = new BodyBuilder
                        {
                            HtmlBody = $@"
                                <h2>Password Reset Request</h2>
                                <p>Hi {user.Name},</p>
                                <p>You recently requested to reset your password. Click the secure link below to proceed:</p>
                                <p><br><a href='{resetLink}' style='display:inline-block;padding:12px 24px;background-color:#F63232;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;'>Reset Password</a><br><br></p>
                                <p>This secure link will expire in exactly 15 minutes.</p>
                                <p>If you did not request a password reset, please ignore this email.</p>
                            "
                        };
                        message.Body = bodyBuilder.ToMessageBody();

                        using var client = new SmtpClient();
                        var port = int.Parse(emailSettings["Port"]!);
                        // Port 465 uses implicit SSL (SslOnConnect), while 587 uses STARTTLS (StartTls)
                        var secureOption = port == 465 ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls;

                        await client.ConnectAsync(emailSettings["SmtpServer"], port, secureOption);
                        await client.AuthenticateAsync(senderEmail, appPassword);
                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);

                        Console.WriteLine($"[SMTP SUCCESS] Secure reset email dispatched to {cleanEmail}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[SMTP ERROR] Could not send email via MailKit: {ex.Message}");
                    }
                }
                else
                {
                    // Fallback to console if SMTP is not configured by the user yet
                    Console.WriteLine("\n=======================================================");
                    Console.WriteLine("[ATTENTION] SMTP Credentials not configured in appsettings.json.");
                    Console.WriteLine($"[MOCK EMAIL SENT TO {cleanEmail}] ");
                    Console.WriteLine($"[RESET LINK]: {resetLink}");
                    Console.WriteLine("=======================================================\n");
                }
            }

            return Ok(new { message = "If your email is registered, a password reset link has been dispatched." });
        }

        [HttpPost("/reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Token) || string.IsNullOrWhiteSpace(request.NewPassword))
                return BadRequest(new { message = "Invalid request parameters." });

            if (!TryValidateResetToken(request.Token, out var email) || string.IsNullOrEmpty(email))
                return BadRequest(new { message = "Invalid or expired reset token." });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return NotFound(new { message = "User not found." });

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password has been successfully reset." });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var keyStr = jwtSettings["Key"] ?? "ThisIsAVerySecretKeyForJwtAuthenticationWhichNeedsToBeLongEnough";
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(keyStr));
            
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(int.Parse(jwtSettings["ExpireDays"] ?? "7")),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }

        private string GenerateResetToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"]!));
            
            var claims = new[] { new Claim(ClaimTypes.Email, user.Email) };
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(15),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = credentials
            };

            return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityTokenHandler().CreateToken(tokenDescriptor));
        }

        private bool TryValidateResetToken(string token, out string? email)
        {
            email = null;
            var jwtSettings = _configuration.GetSection("Jwt");
            var handler = new JwtSecurityTokenHandler();
            try
            {
                var principal = handler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"]!)),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ClockSkew = TimeSpan.Zero
                }, out var validatedToken);

                email = principal.FindFirst(ClaimTypes.Email)?.Value;
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
