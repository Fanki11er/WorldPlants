using AutoMapper;
using System.Threading.Tasks;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models.ActiveTasksModels;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{

    public interface IActiveTasksService
    {
        public ActiveTaskDTO GetStandardPlantTask(string taskType, string plantId);
        public ActiveTaskDTO SetPlantTask(ActiveTaskDTO task);
        public void DeletePlantTask(string taskId);
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


        public ActiveTaskDTO GetStandardPlantTask(string plantId, string taskType) 
        {
            var plant = _utilities.FindPlantWithTasks(plantId);

            var task = plant.ActiveTasks.FirstOrDefault(t=> t.ActionType.ToString() == taskType);

            if(task == null)
            {
                var emptyActiveTaskDto = new ActiveTaskDTO()
                {
                    Id = null,
                    Description = "",
                    ActionDate = "",
                    PartOfTheDay = "",
                    ActionType = taskType,
                    Interval = 0,
                    PlantId = plantId,
                };

                return emptyActiveTaskDto;
            }

            var taskDto = _mapper.Map<ActiveTaskDTO>(task);

            return taskDto;

        }

        public ActiveTaskDTO SetPlantTask(ActiveTaskDTO task)
        {
            if(task == null)
            {
                throw new ArgumentNullException("Nie prawidłowe dane zadania");
            }

            var currentTask = _dbContext.ActiveTasks.FirstOrDefault(t => t.Id.ToString() == task.Id);

            if(currentTask == null)
            {
                var newTask = _mapper.Map<ActiveTask>(task);

               _dbContext.ActiveTasks.Add(newTask);
                
               _utilities.SaveChangesToDatabase();

                task.Id = newTask.Id.ToString();

                return task;
            }

           _mapper.Map(task, currentTask);

            _dbContext.Update(currentTask);

            _utilities.SaveChangesToDatabase();

            return task;
        }

        public void DeletePlantTask(string taskId)
        {
            var currentTask = _dbContext.ActiveTasks
                .FirstOrDefault(t => t.Id.ToString() == taskId) 
                ?? throw new NotFoundException("Nie znaleziono zadania");

            _dbContext.ActiveTasks.Remove(currentTask);

            _utilities.SaveChangesToDatabase();
        }

     
    }
}
