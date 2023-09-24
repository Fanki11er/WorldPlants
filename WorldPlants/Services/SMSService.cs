using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace WorldPlants.Services
{
    public interface ISMSService
    {
        public Task<bool> SendSMSReminder(PhoneNumber to, string reminder);
    }
    public class SMSService: ISMSService
    {
        private ILogger<SMSService> _logger;
        public SMSService(ILogger<SMSService> logger)
        {
            _logger = logger;
        }

        public async Task<bool> SendSMSReminder(PhoneNumber to, string reminder)
        {
            var accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID")?? "";

            var authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN")?? "";

            var from = new PhoneNumber("+14786062620");

            TwilioClient.Init(accountSid, authToken);

            var message = await MessageResource.CreateAsync(

                body: reminder,
                from: from,
                to: to
                );

            var status = message.Status;
            
            if( status == MessageResource.StatusEnum.Failed)
            {
                _logger.LogWarning($"Wiadomość nie dostarczona: {to}");

                return false;
            }

            return true;
        }
        
    }
}
