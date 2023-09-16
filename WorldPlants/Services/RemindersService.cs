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
                 var users = _dbContext
                 .Users
                 .Include(i => i.UserSettings)
                 .AsSplitQuery()
                 .Where(u => u.SpaceId == space.Id && u.IsActive);

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

        private List<DailyPlantEmailReminder> PrepareUserReminders(List<Plant> plants, User user)
        {
            List<DailyPlantEmailReminder> reminders = new();

            var today = _utilities.GetTodayDate();

            var userActiveEmailRemindersTypes = GetUserWantedEmailNotifications(user.UserSettings);

            foreach (var plant in plants)
            {
                var plantWithReminders = plant.ActiveTasks
                .Where(a => userActiveEmailRemindersTypes.Contains(a.ActionType.ToString()))
                   .Select(t => new TodayTask()
                   {
                       ActionType = _translationUtilities.TranslateActionTypeEnum(t.ActionType),

                       PartOfTheDay = _translationUtilities.TranslatePartOfTheDayEnum(t.PartOfTheDay),

                       DaysLate = today.DayNumber - DateOnly.FromDateTime(t.ActionDate).DayNumber
                   });

                if (plantWithReminders.Any())
                {
                    Console.Write($"{_pathHelper.GetClientUrl()}/Authorized/SelectedPlant/{plant.Id}");

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

    }
}

