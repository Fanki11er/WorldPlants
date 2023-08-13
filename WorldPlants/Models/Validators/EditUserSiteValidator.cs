// Ignore Spelling: Validator Validators

using FluentValidation;
using WorldPlants.Entities;

namespace WorldPlants.Models.Validators
{
    public class EditUserSiteValidator : AbstractValidator<EditUserSiteSettingsDto>
    {

        public EditUserSiteValidator(WorldPlantsDbContext dbContext)
        {
            RuleFor(s => s.Name)
                 .NotEmpty()
                 .WithMessage("Nazwa nie może byc pusta")
                 .MinimumLength(3)
                 .WithMessage("Nazwa musi mieć długość minimum 3 znaki");

            RuleFor(s => s.ColdPeriodMinTemperature)
                .NotNull()
                .LessThanOrEqualTo(s => s.ColdPeriodMaxTemperature)
                .WithMessage("Wartośc minimalna musi być mniejsza od wartości maksymalnej")
                .GreaterThanOrEqualTo(-45)
                .WithMessage("Wartość musi być równa lub większa od -45");

            RuleFor(s => s.ColdPeriodMaxTemperature)
                .NotNull()
                .LessThanOrEqualTo(50)
                 .WithMessage("Wartość musi być równa lub mniejsza od 50");

            RuleFor(s => s.WarmPeriodMinTemperature)
                .NotNull()
                .LessThanOrEqualTo(s => s.WarmPeriodMaxTemperature)
                 .WithMessage("Wartośc minimalna musi być mniejsza od wartości maksymalnej")
                .GreaterThanOrEqualTo(-45)
                .WithMessage("Wartość musi być równa lub większa od -45");

            RuleFor(s => s.WarmPeriodMaxTemperature)
                .NotNull()
                .LessThanOrEqualTo(50)
                 .WithMessage("Wartość musi być równa lub mniejsza od 50"); ;

            RuleFor(s => s.SunExposureId)
                .Custom((value, context) =>
                {
                    var sunExposure = dbContext.SunExposures.FirstOrDefault(s => s.Id == value);
                    if (sunExposure == null)
                    {
                        context.AddFailure("Podany stopień nasłonecznienia nie istnieje");
                    }
                });
        }
    }
}
