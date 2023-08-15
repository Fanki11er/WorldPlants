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
                .ForMember(m => m.Description, m => m.MapFrom(z => z.Description.Split("/", StringSplitOptions.None)));

            CreateMap<UserSite, GetUserSiteSettingsDto>();

            CreateMap<UserSite, GetSiteBeforeDeleteInformationDto>()
                .ForMember(m => m.PlantsCount, m => m.MapFrom(p => p.Plants.Count()));

            CreateMap<UserSettings, GuestUserPermissions>();

            CreateMap<DefaultSite, UserSite>()
                .ForMember(m => m.Id, m => m.Ignore());
                
        } 
    }
}
