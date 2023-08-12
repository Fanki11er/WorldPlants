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
            CreateMap<UserSettings, GuestUserPermissions>();
            CreateMap<SunExposure, SunExposureDto>()
                .ForMember(m => m.Description, m => m.MapFrom(z => z.Description.Split("/", System.StringSplitOptions.None)));
        }
    }
}
