using FluentValidation;
using WorldPlants.Entities;
using WorldPlants.Services;

namespace WorldPlants.Models.Validators
{
    public class UserChangePasswordValidator : AbstractValidator<UserChangePasswordDto>
    {
        public UserChangePasswordValidator(WorldPlantsDbContext context, IUserContextService userContext)
        {
            RuleFor(u => u.NewPassword).MinimumLength(8);
            RuleFor(u => u.NewRepeatedPassword).Equal(u => u.Password);
        }
    }
}
