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
                .LessThanOrEqualTo(s => s.ColdPeriodMaxTemperature)
                .GreaterThanOrEqualTo(-45);

            RuleFor(s => s.ColdPeriodMaxTemperature)
                .NotNull()
                .LessThanOrEqualTo(50);


            RuleFor(s=> s.WarmPeriodMinTemperature)
                .NotNull()
                .LessThanOrEqualTo(s => s.WarmPeriodMaxTemperature)
                .GreaterThanOrEqualTo(-45);

            RuleFor(s => s.WarmPeriodMaxTemperature)
                .NotNull()
                .LessThanOrEqualTo(50);

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
