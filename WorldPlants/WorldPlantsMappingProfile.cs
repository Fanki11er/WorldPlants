using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Models;
using WorldPlants.Models.ActiveTasksModels;
using WorldPlants.Models.PlantsModels;
using WorldPlants.Models.PlantTaskHistory;

namespace WorldPlants
{
    public class WorldPlantsMappingProfile : Profile
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
                .ForMember(m => m.DefaultImage, m => m.MapFrom(i => i.DefaultImage.Medium))
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
                .ForMember(m => m.Description, m => m.Ignore());

            CreateMap<AddPlantDto, Plant>()
                 .ForMember(m => m.UserSite, m => m.Ignore())
                  .ForMember(m => m.UserSiteId, m => m.Ignore());

            CreateMap<Plant, PlantHeaderInformationDTO>()
                .ForMember(m => m.UserSiteId, m => m.MapFrom(s => s.UserSite.Id))
                .ForMember(m => m.UserSiteName, m => m.MapFrom(s => s.UserSite.Name))
                .ForMember(p => p.ImageUrl, p => p.Ignore());

            CreateMap<Plant, PlantBasicInformationDto>()
                 .ForMember(p => p.ImageUrl, p => p.Ignore())
                 .ForMember(p => p.TasksInformation, p => p.MapFrom(s => new List<ActiveTaskInformationDto>()));

            CreateMap<ActiveTask, ActiveTaskInformationDto>()
                .ForMember(m => m.DaysLeft, m => m.MapFrom(d => ( DateOnly.FromDateTime(d.ActionDate).DayNumber - DateOnly.FromDateTime(DateTime.UtcNow).DayNumber)));
                

            CreateMap<ActiveTask, ActiveTaskDTO>()
                .ForMember(m=> m.ActionDate, m=> m.MapFrom(d => DateOnly.FromDateTime(d.ActionDate)));

            CreateMap<ActiveTaskDTO, ActiveTask>()
                .ForMember(m => m.Id, m => m.Ignore())
                .ForMember(m => m.ActionDate, m => m.MapFrom(d => DateTime.Parse(d.ActionDate)))
                .ForMember(m => m.PartOfTheDay, m => m.MapFrom(p => Enum.Parse(typeof(PartOfTheDay), p.PartOfTheDay)))
                .ForMember(m => m.ActionType, m => m.MapFrom(p => Enum.Parse(typeof(ActionType), p.ActionType)));
            
            CreateMap<PlantTaskHistory, PlantTaskHistoryDTO>()
                .ForMember(m=> m.TaskType, m=> m.MapFrom(t => t.TaskType.ToString()));

            CreateMap<Plant, PlantWithTasksDTO>()
                .ForMember(m => m.PlantId, m => m.MapFrom(p => p.Id))
                .ForMember(m => m.PlantName, m => m.MapFrom(p => p.Name))
                .ForMember(m => m.UserSiteId, m => m.MapFrom(p => p.UserSite.Id))
                .ForMember(m => m.UserSiteName, m => m.MapFrom(p => p.UserSite.Name))
                .ForMember(m => m.PlantPhoto, m => m.Ignore())
                .ForMember(m => m.PlantTasks, m => m.Ignore());


        }
    }
}
