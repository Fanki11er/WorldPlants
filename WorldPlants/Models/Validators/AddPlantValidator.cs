// Ignore Spelling: Validator Validators

using FluentValidation;
using Microsoft.IdentityModel.Tokens;
using WorldPlants.Models.PlantsModels;
using WorldPlants.Services;

namespace WorldPlants.Models.Validators
{
    public class AddPlantValidator : AbstractValidator<AddPlantDto>
    {

        public AddPlantValidator(IImageService imageService)
        {
            RuleFor(d => d.Name)
                .NotEmpty().NotNull()
                .WithMessage("Nazwa nie może być pusta")
                .MaximumLength(50)
                .WithMessage("Zbyt długa nazwa");


            RuleFor(d => d.PotWidth)
               .GreaterThanOrEqualTo(0)
               .WithMessage("Szerokość doniczki nie może być mniejsza od 0")
               .LessThanOrEqualTo(1000)
               .WithMessage("Zbyt duża szerokość doniczki");


            RuleFor(d => d.PotHeight)
              .GreaterThanOrEqualTo(0)
              .WithMessage("Wysokość doniczki nie może być mniejsza od 0")
                .LessThanOrEqualTo(1000)
               .WithMessage("Zbyt duża wysokość doniczki");

            RuleFor(d => d.PlantHeight)
               .GreaterThanOrEqualTo(0)
               .WithMessage("Wysokość rośliny nie może być mniejsza od 0")
                .LessThanOrEqualTo(5000)
               .WithMessage("Zbyt duża wysokość rosliny");

            RuleFor(d => d.AdditionalDescription)
              .MaximumLength(300)
              .WithMessage("Maksymalna długość opisu wynosi 300 zaków");

            RuleFor(d => d.ImageFile)
              .Custom((value, context) =>
              {
                  if (value == null)
                  {
                      return;
                  }

                  var result = imageService.CheckFileExtension(value.FileName);

                  if (!result.IsNullOrEmpty())
                  {
                      context.AddFailure(result);
                  }
              });

            RuleFor(d => d.ImageUrl)
             .Custom((value, context) =>
             {
                 if (value == null)
                 {
                     return;
                 }

                 var result = imageService.CheckFileExtension(value);

                 if (!result.IsNullOrEmpty())
                 {
                     context.AddFailure(result);
                 }
             });
        }
    }
}
