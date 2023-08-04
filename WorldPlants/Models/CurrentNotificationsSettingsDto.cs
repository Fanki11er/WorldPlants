// Ignore Spelling: Sms Dto

using Microsoft.AspNetCore.Authentication;

namespace WorldPlants.Models
{
    public class CurrentNotificationsSettingsDto
    {
        public NotificationSettingsDto EmailSettings { get; set; }
        public NotificationSettingsDto? SmsSettings { get; set; }
    }

}
