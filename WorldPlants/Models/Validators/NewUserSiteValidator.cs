// Ignore Spelling: Validator Validators

using FluentValidation;
using WorldPlants.Entities;

namespace WorldPlants.Models.Validators
{
    public class NewUserSiteValidator : AbstractValidator<NewUserSiteDto>
    {
        public NewUserSiteValidator(WorldPlantsDbContext dbContext)
        {
            RuleFor(s => s.DefaultSiteId)
                .NotNull()
                .WithMessage("Id prototypowej przestrzeni nie może być nullem")
                .Custom((value, context) =>
                {
                    var defaultSiteExists = dbContext.DefaultSites.Any(u => u.Id == value);
                    if (!defaultSiteExists)
                    {
                        context.AddFailure("DefaultSiteId", "Wybrany prototyp przestrzeni nie istnieje");
                    }
                });

            RuleFor(se => se.SunExposureId)
               .NotNull()
               .WithMessage("Id nasłonecznienia nie może być nullem")
               .Custom((value, context) =>
               {
                   var sunExposureExists = dbContext.SunExposures.Any(u => u.Id == value);
                   if (!sunExposureExists)
                   {
                       context.AddFailure("SunExposureId", "Wybrany poziom nasłonecznienia nie istnieje");
                   }
               });

            RuleFor(s => s.Name).NotNull()
                 .WithMessage("Nazwa nie może być pusta")
                 .MaximumLength(30)
                 .WithMessage("Maksymalna dłogość nazwy wynosi 30 znaków");

            RuleFor(s => s.HasRoof).NotNull()
                .WithMessage("Pole \"pod dachem\" nie może być puste");
        }
    }
}
