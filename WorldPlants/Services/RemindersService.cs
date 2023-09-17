using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Models.Reminders;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{
    public interface IRemindersService
    {
        public Task SendReminderEmails();
        public Task SendReminderSMS();
    }
    public class RemindersService : IRemindersService
    {
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IUtilities _utilities;
        private readonly IPathHelper _pathHelper;
        private readonly IEmailService _emailService;
        private readonly ITranslationUtilities _translationUtilities;

        public RemindersService(
            WorldPlantsDbContext dbContext,
            IUtilities utilities,
            IPathHelper pathHelper,
            IEmailService emailService,
            ITranslationUtilities translationUtilities
            )
        {
            _dbContext = dbContext;
            _utilities = utilities;
            _pathHelper = pathHelper;
            _emailService = emailService;
            _translationUtilities = translationUtilities;
        }

        public async Task SendReminderEmails()
        {
            var targetSpaces = GetSpacesWithEmailRemindersToSend();

            await Parallel.ForEachAsync(targetSpaces, async (space, token) =>
            {
                 var users = GetSpaceActiveUsers(space.Id);

                 var plants = GetPlantsWithRemindersToSend(space.Id);

                 foreach (var user in users)
                 {
                     var data = new DailyEmailReminder()
                     {
                         Data = PrepareUserReminders(plants, user)
                     };

                     if (data.Data.Any())
                     {
                         var subject = $"Zadania do wykonania  w dniu {_utilities.GetTodayDate()}";

                         data.Subject = subject;

                         var toEmail = new EmailAddress(user.Email);

                         var result = await _emailService.SendReminderEmail(toEmail, data);

                         if (result == true)
                         {
                             user.LastEmailReminderSendDate = _utilities.GetTodayDateTime();
                         }
                     }

                 }
            });
        }

        public async Task SendReminderSMS()
        {
            var targetSpaces = GetSpacesWithSMSRemindersToSend();

            await Parallel.ForEachAsync(targetSpaces, async (space, token) =>
            {
                var users = GetSpaceActiveUsersWithPhoneNumber(space.Id);

                var plants = GetPlantsWithRemindersToSend(space.Id);

                foreach (var user in users)
                {
                    var reminder = PrepareUserSmsReminder(plants, user);

                    if(reminder != null)
                    {
                        
                        //Send Sms
                        Console.WriteLine(reminder);
                    }
                }

            });
        }

        private List<DailyPlantEmailReminder> PrepareUserReminders(List<Plant> plants, User user)
        {
            List<DailyPlantEmailReminder> reminders = new();

            var userActiveEmailRemindersTypes = GetUserWantedEmailNotifications(user.UserSettings);

            foreach (var plant in plants)
            {
                var plantWithReminders = PreparePlantReminders(plant, userActiveEmailRemindersTypes);

                if (plantWithReminders.Any())
                {

                    DailyPlantEmailReminder reminder = new()
                    {
                        PlantName = plant.Name,

                        LinkToPlantTasks = $"{_pathHelper.GetClientUrl()}/Authorized/SelectedPlant/{plant.Id}",

                        TodayTasks = plantWithReminders.ToList(),

                    };

                    reminders.Add(reminder);
                }
            }

            return reminders;
        }

        private string PrepareUserSmsReminder(List<Plant> plants, User user)
        {
            string smsBody = string.Empty;

            string smsHeder = "Posiadasz zaległe zadania:\n";

            string smsContent = string.Empty;

            var userActiveSmsRemindersTypes = GetUserWantedSmsNotifications(user.UserSettings);

            foreach (var plant in plants)
            {
                var plantWithReminders = PreparePlantReminders(plant, userActiveSmsRemindersTypes);

                if (plantWithReminders.Any())
                {
                    var preparedString = PrepareStringFromTodaysTasks(plantWithReminders, plant);
                    smsContent += preparedString + "\n";
                }
            }

            if(smsContent.Length > 0)
            {
                smsBody = smsHeder + smsContent;
            }

            return smsBody;
        }

        private List<string> GetUserWantedEmailNotifications(UserSettings userSettings)
        {

            List<string> userActiveEmailRemindersTypes = new();

            if (userSettings.WaterPlantsEmailReminder == true)
            {
                userActiveEmailRemindersTypes.Add(ActionType.Water.ToString());
            }

            if (userSettings.FertilizePlantsEmailReminder == true)
            {
                userActiveEmailRemindersTypes.Add(ActionType.Fertilize.ToString());
            }

            if (userSettings.CutPlantsEmailReminder == true)
            {
                userActiveEmailRemindersTypes.Add(ActionType.Cut.ToString());
            }

            if (userSettings.MistPlantsEmailReminder == true)
            {
                userActiveEmailRemindersTypes.Add(ActionType.Mist.ToString());
            }

            if (userSettings.ReplantPlantsEmailReminder == true)
            {
                userActiveEmailRemindersTypes.Add(ActionType.Replant.ToString());
            }
            if (userSettings.CustomTasksEmailReminder == true)
            {
                userActiveEmailRemindersTypes.Add(ActionType.Custom.ToString());
            }

            return userActiveEmailRemindersTypes;

        }

        private List<string> GetUserWantedSmsNotifications(UserSettings userSettings)
        {
            List<string> userActiveSmsRemindersTypes = new();

            if (userSettings.WaterPlantsSmsReminder == true)
            {
                userActiveSmsRemindersTypes.Add(ActionType.Water.ToString());
            }

            if (userSettings.FertilizePlantsSmsReminder == true)
            {
                userActiveSmsRemindersTypes.Add(ActionType.Fertilize.ToString());
            }

            if (userSettings.CutPlantsSmsReminder == true)
            {
                userActiveSmsRemindersTypes.Add(ActionType.Cut.ToString());
            }

            if (userSettings.MistPlantsSmsReminder == true)
            {
                userActiveSmsRemindersTypes.Add(ActionType.Mist.ToString());
            }

            if (userSettings.ReplantPlantsSmsReminder == true)
            {
                userActiveSmsRemindersTypes.Add(ActionType.Replant.ToString());
            }
            if (userSettings.CustomTasksSmsReminder == true)
            {
                userActiveSmsRemindersTypes.Add(ActionType.Custom.ToString());
            }

            return userActiveSmsRemindersTypes;
        }

        private List<Plant> GetPlantsWithRemindersToSend(Guid spaceId)
        {
            var today = _utilities.GetTodayDateTime();

            var plantsFromSpace = _dbContext.Plants
                .Include(i => i.UserSite)
                .AsSplitQuery()
                .Include(i => i.ActiveTasks)
                .AsSplitQuery()
                .Where(p => p.UserSite.SpaceId == spaceId
                    && p.ActiveTasks.Any(at => at.ActionDate <= today
                    && at.ActionDate >= today.AddDays(-3)
                    )).ToList();


            return plantsFromSpace;
        }

        private IEnumerable<Space> GetSpacesWithEmailRemindersToSend()
        {
            var today = _utilities.GetTodayDateTime();
            var spaces = _dbContext
                .Spaces
                .Include(i => i.Users)
                .AsSplitQuery()
                .Where(u => u.Users.Any(u => u.LastEmailReminderSendDate < today &&
                       u.LastEmailReminderSendDate >= today.AddDays(-3)));

            return spaces;
        }

        private IEnumerable<Space> GetSpacesWithSMSRemindersToSend()
        {
            var today = _utilities.GetTodayDateTime();
            var spaces = _dbContext
                .Spaces
                .Include(i => i.Users)
                .AsSplitQuery()
                .Where(u => u.Users.Any(u => u.LastEmailReminderSendDate < today &&
                       u.LastSMSReminderSendDate >= today.AddDays(-3)));

            return spaces;
        }

        private IQueryable<User> GetSpaceActiveUsers(Guid spaceId)
        {
            var users = _dbContext
             .Users
             .Include(i => i.UserSettings)
             .AsSplitQuery()
             .Where(u => u.SpaceId == spaceId && u.IsActive);

            return users;
        }

        private IQueryable<User> GetSpaceActiveUsersWithPhoneNumber(Guid spaceId)
        {
            var users = _dbContext
             .Users
             .Include(i => i.UserSettings)
             .AsSplitQuery()
             .Where(u => u.SpaceId == spaceId && u.IsActive && u.PhoneNumber != null);

            return users;
        }

        private IEnumerable<TodayTask> PreparePlantReminders(Plant plant, List<string> userAcceptedReminders)
        {
            var today = _utilities.GetTodayDateTime();

            var plantWithReminders = plant.ActiveTasks
               .Where(a => userAcceptedReminders.Contains(a.ActionType.ToString()) && 
               a.ActionDate <= today && a.ActionDate >= today.AddDays(-3))
                  .Select(t => new TodayTask()
                  {
                      ActionType = _translationUtilities.TranslateActionTypeEnum(t.ActionType),

                      PartOfTheDay = _translationUtilities.TranslatePartOfTheDayEnum(t.PartOfTheDay),

                      DaysLate = (int)(today - t.ActionDate).TotalDays
                  });

            return plantWithReminders;
        }

        private string PrepareStringFromTodaysTasks(IEnumerable<TodayTask> tasks, Plant plant)
        {
            string result = $"{plant.Name}: ";

            foreach(var task in tasks)
            {
                result += $"{task.ActionType}, ";
            }

            result += "\n";

            return result;
        }
    }
}

