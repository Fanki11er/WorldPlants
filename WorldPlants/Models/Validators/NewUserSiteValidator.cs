using FluentValidation;

namespace WorldPlants.Models.Validators
{
    public class NewUserSiteValidator : AbstractValidator<NewUserSiteDto>
    {
        public NewUserSiteValidator() {
            RuleFor(s => s.DefaultSiteId).NotNull().GreaterThan(0);
            RuleFor(s => s.SunExposureId).NotNull().GreaterThan(0);
            RuleFor(s => s.Name).NotNull();
        }
    }
}
