// Ignore Spelling: Validator Dto Validators

using FluentValidation;
using System.Text.RegularExpressions;
using WorldPlants.Entities;

namespace WorldPlants.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(WorldPlantsDbContext dbContext)
        {
            RuleFor(u => u.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Email jest wymagany");

            RuleFor(u => u.Name).MinimumLength(2)
                .WithMessage("Minimalna długośc imienia to 2");

            RuleFor(u => u.Email)
                .Custom((value, context) =>
                {
                    var emailExists = dbContext.Users.Any(u => u.Email == value);
                    if (emailExists)
                    {
                        context.AddFailure("Email", "Podany Email jest już zajęty");
                    }
                });

            RuleFor(u => u.Password).MinimumLength(8)
                .WithMessage("Minimalna dłuośc hasła wynosi 8 znaków");

            RuleFor(u => u.RepeatedPassword).Equal(u => u.Password).
                WithMessage("Nowe hasło i powtórzone hasło nie są takie same");

            RuleFor(u => u.PhoneNumber).Custom((value, context) =>
            {
                string pattern = @"^\+\d{11}$";
                if (value != "" && value != null && !Regex.IsMatch(value, pattern))
                {
                    context.AddFailure("PhoneNumber", "Podany numer jest nie prawidłowy");
                }

            });
        }
    }
}
