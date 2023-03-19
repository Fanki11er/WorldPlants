using FluentValidation;
using WorldPlants.Entities;

namespace WorldPlants.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(WorldPLantsDbContext dbContext)
        {
            RuleFor(u => u.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(u => u.Email)
                .Custom((value, context) =>
                {
                    var emailExists = dbContext.Users.Any(u => u.Email == value);
                    if (emailExists)
                    {
                        context.AddFailure("Email", "Podany Email jest już zajęty");
                    }
                });

            RuleFor(u => u.Password).MinimumLength(8);
            RuleFor(u => u.RepeatedPassword).Equal(u => u.Password);
        }
    }
}
