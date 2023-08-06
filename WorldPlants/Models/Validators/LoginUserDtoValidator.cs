// Ignore Spelling: Validator Validators Dto

using FluentValidation;

namespace WorldPlants.Models.Validators
{
    public class LoginUserDtoValidator: AbstractValidator<LoginUserDto>
    {
        public LoginUserDtoValidator()
        {
            RuleFor(u => u.Email).EmailAddress()
                .WithMessage("Nie prawidłowa wartość email");
        }
    }
}
