using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Models.PlantsModels;

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

            CreateMap<RawSearchPlantResult, SearchPlantResultDto>()
                .ForMember(m => m.DefaultImage, m => m.MapFrom(i => i.DefaultImage.Thumbnail))
                .ForMember(m => m.Watering, m => m.Ignore())
                .ForMember(m => m.Sunlight, m => m.Ignore());

            CreateMap<RawPlantDetailsData, PlantDetailsDto>()
                .ForMember(m => m.DefaultImage, m => m.MapFrom(i => i.Image != null ? i.Image.OriginalUrl : null))
                .ForMember(m => m.Watering, m => m.Ignore())
                .ForMember(m => m.Sunlight, m => m.Ignore())
                .ForMember(m => m.LifeCycle, m => m.Ignore())
                .ForMember(m => m.PlantType, m => m.Ignore())
                .ForMember(m => m.WateringPeriod, m => m.Ignore())
                .ForMember(m => m.PruningMonth, m => m.Ignore())
                .ForMember(m => m.PruningCount, m => m.Ignore())
                .ForMember(m => m.GrowthRate, m => m.Ignore())
                .ForMember(m => m.CareLevel, m => m.Ignore())
                .ForMember(m => m.FloweringSeason, m => m.Ignore())
                .ForMember(m => m.HarvestSeason, m => m.Ignore())
                .ForMember(m => m.PoisonousToHumans, m => m.Ignore())
                .ForMember(m => m.PoisonousToPets, m => m.Ignore())
                .ForMember(m => m.Description, m => m.Ignore());
            //.ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));



        } 
    }
}
