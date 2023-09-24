using SendGrid;
using SendGrid.Helpers.Mail;
using WorldPlants.Models.Reminders;

namespace WorldPlants.Services
{

    public interface IEmailService
    {
        public Task<bool> SendReminderEmail(EmailAddress to, DailyEmailReminder template);
    }
    public class EmailService : IEmailService
    {

        public async Task<bool> SendReminderEmail(EmailAddress to, DailyEmailReminder template)
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");

            var templateId = "d-849fd873eb19414883c4c3f21f9999ce";

            var client = new SendGridClient(apiKey);

            var from = new EmailAddress(Environment.GetEnvironmentVariable("REMINDERS_EMAIL_ADDRESS"));

            var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, template);


            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            Console.Write("Email send failed with status code: " + response.StatusCode);
            return false;

        }
    }
}
