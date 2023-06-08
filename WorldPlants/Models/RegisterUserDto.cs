using System.ComponentModel.DataAnnotations;

namespace WorldPlants.Models
{
    public class RegisterUserDto
    {
        public string Name { get; set; }
  
        public string Email { get; set; }

        public string PhoneNumber { get; set; }
       
        public string Password { get; set; }
 
        public string RepeatedPassword { get; set; }
    }
}
