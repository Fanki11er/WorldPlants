// Ignore Spelling: Dto

namespace WorldPlants.Models
{
    public class GuestUserWithPermissionsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public GuestUserPermissions GuestUserPermissions { get; set; }
    }
}
