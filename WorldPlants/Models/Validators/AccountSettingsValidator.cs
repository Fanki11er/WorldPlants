// Ignore Spelling: Validator Validators

using FluentValidation;
using System.Text.RegularExpressions;
using WorldPlants.Entities;
using WorldPlants.Services;

namespace WorldPlants.Models.Validators
{
    public class AccountSettingsValidator : AbstractValidator<AccountSettingsDto>
    {
       

        public AccountSettingsValidator(WorldPlantsDbContext dbContext, IUserContextService userContextService)
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
                    var userCurrentEmail = userContextService.GetUserEmail;

                    if (userCurrentEmail == value)
                    {
                        return;
                    }

                    var emailExists = dbContext.Users.Any(u => u.Email == value);
                    if (emailExists)
                    {
                        context.AddFailure("Email", "Podany Email jest już zajęty");
                    }
                });

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
