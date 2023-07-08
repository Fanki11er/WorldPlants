using FluentValidation;
using WorldPlants.Entities;

namespace WorldPlants.Models.Validators
{
    public class EditUserSiteValidator : AbstractValidator<EditUserSiteDto>
    {

        public EditUserSiteValidator(WorldPlantsDbContext dbContext)
        {
            RuleFor(s => s.Name)
                .NotEmpty()
                .MinimumLength(3);

            RuleFor(s => s.ColdPeriodMinTemperature)
                .NotNull()
                .GreaterThanOrEqualTo(s => s.ColdPeriodMaxTemperature);

            RuleFor(s => s.ColdPeriodMaxTemperature)
                .NotNull();

            RuleFor(s=> s.WarmPeriodMinTemperature)
                .NotNull()
                .GreaterThanOrEqualTo(s => s.WarmPeriodMaxTemperature);

            RuleFor(s => s.ColdPeriodMaxTemperature)
                .NotNull();

            RuleFor(s => s.SunExposureId)
                .Custom((value, context) =>
                {
                    var sunExposure = dbContext.SunExposures.FirstOrDefault(s => s.Id == value);
                    if (sunExposure == null) {
                        context.AddFailure("Podany stopień nasłonecznienia nie istnieje");
                    }
                });
        }
    }
}
