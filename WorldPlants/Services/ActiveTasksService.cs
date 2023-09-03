using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Models.ActiveTasksModels;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{

    public interface IActiveTasksService
    {
        public ActiveTaskDTO? GetStandardPlantTask(string taskType, string plantId);
    }
    public class ActiveTasksService: IActiveTasksService
    {
        private readonly IUtilities _utilities;
        private readonly IMapper _mapper;
        private readonly WorldPlantsDbContext _dbContext;
        public ActiveTasksService(
            IUtilities utilities,
            WorldPlantsDbContext dbContext,
            IMapper mapper
            )
        {
            _utilities = utilities;
            _dbContext = dbContext;
            _mapper = mapper;
        }


        public ActiveTaskDTO? GetStandardPlantTask(string plantId, string taskType) 
        {
            var plant = _utilities.FindPlantWithTasks(plantId);

            var task = plant.ActiveTasks.FirstOrDefault(t=> t.ActionType.ToString() == taskType);

            if(task == null)
            {
                return null;
            }

            var taskDto = _mapper.Map<ActiveTaskDTO>(task);

            return taskDto;

        }
    }
}
