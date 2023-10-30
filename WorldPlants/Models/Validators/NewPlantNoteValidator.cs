// Ignore Spelling: Validator Validators

using FluentValidation;
using WorldPlants.Models.PlantNotes;

namespace WorldPlants.Models.Validators
{
    public class NewPlantNoteValidator: AbstractValidator<NewPlantNoteDTO>
    {
        public NewPlantNoteValidator()
        {
            RuleFor(s => s.Title)
               .NotEmpty()
               .WithMessage("Tytuł nie może być pusty")
               .NotNull()
               .WithMessage("Tytuł nie może być pusty")
               .MinimumLength(3)
               .WithMessage("Tytuł musi mieć długość minimum 3 znaków");

            RuleFor(s => s.Note)
               .NotEmpty()
               .WithMessage("Treść notatki może być pusta")
               .NotNull()
               .WithMessage("Treść notatki nie może być pusta");
        }
    }
}
