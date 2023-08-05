// Ignore Spelling: Validator Validators

using FluentValidation;
using System.Text.RegularExpressions;
using WorldPlants.Entities;

namespace WorldPlants.Models.Validators
{
    public class AccountSettingsValidator : AbstractValidator<AccountSettingsDto>
    {
        private readonly WorldPlantsDbContext _dbContext;

        public AccountSettingsValidator(WorldPlantsDbContext dbContext)
        {
            _dbContext = dbContext;

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

            RuleFor(u => u.PhoneNumber).Custom((value, context) =>
            {
                string pattern = @"^\d{9}$";
                if (value != null && !Regex.IsMatch(value, pattern))
                {
                    context.AddFailure("PhoneNumber", "Podany numer jest nie prawidłowy");
                }

            });
        }
    }
}
