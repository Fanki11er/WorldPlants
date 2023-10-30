using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models.CustomActionTypes;
using WorldPlants.Models.CustomTaskModels;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{
    public interface ICustomActionTypesService
    {
        public void AddCustomActionType(AddCustomActionTypeDTO newType);
        public List<CustomActionTypeInformationDTO> GetCustomActionTypesInformation();
        public void EditCustomActionType(AddCustomActionTypeDTO editedCustomActionTypeDTO, int actionTypeId);
        public void DeleteCustomActionType(int actionTypeId);
    }

    public class CustomActionTypesService : ICustomActionTypesService
    {
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IUtilities _utilities;
        private readonly IMapper _mapper;
        public CustomActionTypesService(
            WorldPlantsDbContext dbContext
            , IUtilities utilities,
            IMapper mapper
            )
        {
            _dbContext = dbContext;
            _utilities = utilities;
            _mapper = mapper;
        }

        public void AddCustomActionType(AddCustomActionTypeDTO newType)
        {
            var spaceId = _utilities.GetUserSpaceId();

            var user = _utilities.GetUserWithSettings();

            _utilities.CheckForUserPermission(user.UserSettings.CanCreateCustomActionTypes);

            ActionType newActionType = new()
            {
                Name = StandardActionType.Custom.ToString(),
                Description = newType.Description,
                StandardType = false,
                SpaceId = new Guid(spaceId),
            };

            _dbContext.ActionTypes.Add(newActionType);

            _utilities.SaveChangesToDatabase();
        }

        public List<CustomActionTypeInformationDTO> GetCustomActionTypesInformation()
        {

            var spaceId = _utilities.GetUserSpaceId();

            var customActions = _dbContext
                .ActionTypes
                .Where(t => t.SpaceId != null &&
                t.SpaceId.ToString() == spaceId &&
                t.StandardType == false);

            var customTaksInformationDTOList = _mapper.Map<List<CustomActionTypeInformationDTO>>(customActions);

            return customTaksInformationDTOList;
        }

        public void EditCustomActionType(AddCustomActionTypeDTO editedCustomActionTypeDTO, int actionTypeId) 
        {
            var user = _utilities.GetUserWithSettings();

            _utilities.CheckForUserPermission(user.UserSettings.CanEditCustomActionTypes);

            var actionType = FindActionType(actionTypeId);

            actionType.Description = editedCustomActionTypeDTO.Description;

            _dbContext.Update(actionType);

            _utilities.SaveChangesToDatabase();
        }

        public void DeleteCustomActionType(int actionTypeId)
        {
            var user = _utilities.GetUserWithSettings();

            _utilities.CheckForUserPermission(user.UserSettings.CanEditCustomActionTypes);

            var actionType = FindActionType(actionTypeId);

            var list = _dbContext.ActiveTasks.Where(t => t.ActionTypeId == actionTypeId);

            _dbContext.RemoveRange(list);

            _dbContext.ActionTypes.Remove(actionType);

            _utilities.SaveChangesToDatabase();
        }

        private ActionType FindActionType(int actionTypeId)
        {
            var spaceId = _utilities.GetUserSpaceId();

            var actionType = _dbContext
                .ActionTypes.
                FirstOrDefault(at => at.Id == actionTypeId
                && at.StandardType == false
                && at.SpaceId.ToString() == spaceId)
                ?? throw new NotFoundException("Nie odnaleziono typu akcji");

            return actionType;
        }
    }
}
