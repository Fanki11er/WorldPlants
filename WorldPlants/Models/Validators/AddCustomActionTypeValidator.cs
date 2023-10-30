// Ignore Spelling: Validator Validators

using FluentValidation;
using WorldPlants.Models.CustomTaskModels;
using WorldPlants.Models.PlantsModels;

namespace WorldPlants.Models.Validators
{
    public class AddCustomActionTypeValidator : AbstractValidator<AddCustomActionTypeDTO>
    {
        public AddCustomActionTypeValidator()
        {
            RuleFor(s => s.Description)
                .NotEmpty()
                .WithMessage("Typ akcji nie może być pusty")
                .NotNull()
                .WithMessage("Typ akcji nie może być pusty")
                .MinimumLength(3)
                .WithMessage("Typ akcji musi mieć długość minimum 3 znaki");
        }
    }
}
