using Hangfire;

namespace WorldPlants.Services
{
    public interface IJobsService
    {
        [AutomaticRetry(Attempts = 3, DelaysInSeconds = new int[] { 60 * 10 })]
        public Task ExecuteSendEmailReminders();
        [AutomaticRetry(Attempts = 3/*, DelaysInSeconds = new int[] { 60 * 10 }*/)]
        public Task ExecuteSendSMSReminders();
    }
    public class JobsService : IJobsService
    {
        private readonly IRemindersService _remindersService;

        public JobsService(IRemindersService remindersService)
        {
            _remindersService = remindersService;
        }

        public async Task ExecuteSendEmailReminders()
        {
            await _remindersService.SendReminderEmails();
        }
    
        public async Task ExecuteSendSMSReminders()
        {
            await _remindersService.SendReminderSMS();
        }
    }
}
