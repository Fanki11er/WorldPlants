namespace WorldPlants.Models
{
    public class UserChangePasswordDto
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string NewRepeatedPassword { get; set; }
    }
}
