using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Models;

namespace WorldPlants
{
    public class WorldPlantsMappingProfile: Profile
    {
        public WorldPlantsMappingProfile()
        {
            CreateMap<User, SanitizedGuestUserDto>();
        }
    }
}
