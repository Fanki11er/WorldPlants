using System.ComponentModel.DataAnnotations;

namespace WorldPlants.Models
{
    public class RegisterUserDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
        [Required]
        [MinLength(8)]
        public string RepeatedPassword { get; set; }
    }
}
