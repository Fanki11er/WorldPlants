using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Models.ActiveTasksModels;
using WorldPlants.Models.PlantTaskHistory;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{

    public interface IActiveTasksService
    {
        public ActiveTaskDTO GetStandardPlantTask(string taskType, string plantId);
        public ActiveTaskDTO SetPlantTask(ActiveTaskDTO task);
        public void DeletePlantTask(string taskId);
        public List<ActiveTaskInformationDto> GetPlantAllTasks(string plantId);
        public ActiveTaskInformationDto SnoozeTask(string taskId);
        public ActiveTaskInformationDto? SkipTask(string taskId);
        public ActiveTaskInformationDto? ExecuteTask(string taskId);
        public List<PlantTaskHistoryDTO> GetTasksHistory(string plantId);
        public List<PlantWithTasksDTO> GetTodayTasks();
        public List<PlantWithTasksDTO> GetIncomingTasks();
    }
    public class ActiveTasksService : IActiveTasksService
    {
        private readonly IUtilities _utilities;
        private readonly IMapper _mapper;
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IImageService _imageService;

        public ActiveTasksService(
            IUtilities utilities,
            WorldPlantsDbContext dbContext,
            IMapper mapper,
            IImageService imageService
            )
        {
            _utilities = utilities;
            _dbContext = dbContext;
            _mapper = mapper;
            _imageService = imageService;
        }


        public ActiveTaskDTO GetStandardPlantTask(string plantId, string taskType)
        {
            var plant = _utilities.FindPlantWithTasks(plantId);

            var task = plant.ActiveTasks.FirstOrDefault(t => t.ActionType.ToString() == taskType);

            if (task == null)
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
            if (task == null)
            {
                throw new ArgumentNullException("Nie prawidłowe dane zadania");
            }

            var currentTask = _dbContext.ActiveTasks.FirstOrDefault(t => t.Id.ToString() == task.Id);

            if (currentTask == null)
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

        public List<ActiveTaskInformationDto> GetPlantAllTasks(string plantId)
        {
            var plant = _utilities.FindPlantWithTasks(plantId);

            var tasks = _mapper.Map<List<ActiveTaskInformationDto>>(plant.ActiveTasks);

            return tasks;
        }

        public ActiveTaskInformationDto SnoozeTask(string taskId)
        {
            var task = GetTask(taskId);

            if (GetNumberOfDaysLeft(task) < 0)
            {
                task.ActionDate = _utilities.GetTodayDateTime().AddDays(1);
            }
            else
            {
                task.ActionDate = task.ActionDate.AddDays(1);
            }

            _dbContext.Update(task);

            _utilities.SaveChangesToDatabase();

            var updatedTask = _mapper.Map<ActiveTaskInformationDto>(task);

            return updatedTask;
        }

        public ActiveTaskInformationDto? SkipTask(string taskId)
        {
            var task = GetTask(taskId);

            if (task.Interval != 0 && task.Interval != null)
            {

                if (GetNumberOfDaysLeft(task) < 0)
                {
                    task.ActionDate = _utilities.GetTodayDateTime().AddDays((double)task.Interval);
                }
                else
                {
                    task.ActionDate = task.ActionDate.AddDays((double)task.Interval);
                }

                _dbContext.Update(task);

                _utilities.SaveChangesToDatabase();

                var updatedTask = _mapper.Map<ActiveTaskInformationDto>(task);

                return updatedTask;

            }
            else
            {
                _dbContext.ActiveTasks.Remove(task);

                _utilities.SaveChangesToDatabase();

                return null;
            }
        }

        public ActiveTaskInformationDto? ExecuteTask(string taskId)
        {
            var task = GetTask(taskId);

            if (task.Interval != 0 && task.Interval != null)
            {

                task.ActionDate = _utilities.GetTodayDateTime().AddDays((double)task.Interval);

                var taskHistory = CreateTaskHistoryItem(task);

                _dbContext.Update(task);

                _dbContext.Update(taskHistory);

                _utilities.SaveChangesToDatabase();

                var updatedTask = _mapper.Map<ActiveTaskInformationDto>(task);

                return updatedTask;

            }
            else
            {
                var taskHistory = CreateTaskHistoryItem(task);

                _dbContext.ActiveTasks.Remove(task);

                _dbContext.Update(taskHistory);

                _utilities.SaveChangesToDatabase();

                return null;
            }
        }

        public List<PlantTaskHistoryDTO> GetTasksHistory(string plantId)
        {
            var tasksHistory = _dbContext
                .PlantTasksHistory
                .Where(p => p.PlantId.ToString() == plantId)
                .OrderByDescending(o => o.Id);

            var listOfTasksHistoryDTOs = _mapper.Map<List<PlantTaskHistoryDTO>>(tasksHistory);

            return listOfTasksHistoryDTOs;
        }

        private ActiveTask GetTask(string taskId)
        {
            var task = _dbContext.ActiveTasks
               .FirstOrDefault(t => t.Id.ToString() == taskId)
               ?? throw new NotFoundException("Nie odnaleziono zadania");

            return task;
        }

        public List<PlantWithTasksDTO> GetTodayTasks()
        {
            var spaceId = _utilities.GetUserSpaceId();

            List<PlantWithTasksDTO> plantsWithTasks = new();

            var today = _utilities.GetTodayDateTime();

            var plants = _dbContext
                .Plants
                .Include(i => i.UserSite)
                .AsSplitQuery()
                .Include(i => i.ActiveTasks)
                .AsSplitQuery()
                .Where(p => p.UserSite.SpaceId.ToString() == spaceId &&
                p.ActiveTasks.Any(t => t.ActionDate <= today))
                .OrderBy(o => o.UserSite.Name);

            foreach (var plant in plants)
            {
                var plantTodayTasks = plant
                    .ActiveTasks
                    .Where(t => t.ActionDate <= today);

                var tasksInformation = _mapper.Map<List<ActiveTaskInformationDto>>(plantTodayTasks);

                PlantWithTasksDTO plantInformation = _mapper.Map<PlantWithTasksDTO>(plant);

                plantInformation.PlantPhoto = _imageService.GetImageUrl(plant.ImageName);

                plantInformation.PlantTasks = tasksInformation;

                plantsWithTasks.Add(plantInformation);
            }

            return plantsWithTasks;
        }

        public List<PlantWithTasksDTO> GetIncomingTasks()
        {
            var spaceId = _utilities.GetUserSpaceId();

            List<PlantWithTasksDTO> plantsWithTasks = new();

            var today = _utilities.GetTodayDateTime();

            var plants = _dbContext
                .Plants
                .Include(i => i.UserSite)
                .AsSplitQuery()
                .Include(i => i.ActiveTasks)
                .AsSplitQuery()
                .Where(p => p.UserSite.SpaceId.ToString() == spaceId &&
                p.ActiveTasks.Any(t => t.ActionDate > today && 
                t.ActionDate <= today.AddDays(7)))
                .OrderBy(o => o.UserSite.Name);
                
            foreach (var plant in plants)
            {
                var plantTodayTasks = plant.ActiveTasks
                .Where(t => t.ActionDate > today && 
                t.ActionDate <= today.AddDays(7));

                var tasksInformation = _mapper.Map<List<ActiveTaskInformationDto>>(plantTodayTasks);

                PlantWithTasksDTO plantInformation = _mapper.Map<PlantWithTasksDTO>(plant);

                plantInformation.PlantPhoto = _imageService.GetImageUrl(plant.ImageName);

                plantInformation.PlantTasks = tasksInformation;

                plantsWithTasks.Add(plantInformation);
            }

            return plantsWithTasks;
        }

        private int GetNumberOfDaysLeft(ActiveTask task)
        {
            var today = _utilities.GetTodayDateTime();

            return (int)(task.ActionDate - today).TotalDays;
        }

        private PlantTaskHistory CreateTaskHistoryItem(ActiveTask task)
        {
            var user = _utilities.GetUser();

            PlantTaskHistory item = new()
            {
                TaskType = task.ActionType,
                UserName = user.Name,
                ExecutionDate = _utilities.GetTodayDate().ToShortDateString(),
                PlantId = task.PlantId
            };

            return item;
        }
    }
}
