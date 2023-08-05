using FluentValidation;

namespace WorldPlants.Models.Validators
{
    public class NewUserSiteValidator : AbstractValidator<NewUserSiteDto>
    {
        public NewUserSiteValidator() {
            RuleFor(s => s.DefaultSiteId).NotNull().GreaterThan(0)
                .WithMessage("Nie prawidłowa wartość indexu miesjsca");

            RuleFor(s => s.SunExposureId).NotNull().GreaterThan(0)
                 .WithMessage("Nie prawidłowa wartość indexu ekspozycji na światło");

            RuleFor(s => s.Name).NotNull()
                 .WithMessage("Nazwa nie może być pusta");
        }
    }
}
