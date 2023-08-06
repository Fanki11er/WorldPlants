// Ignore Spelling: Validator Validators

using FluentValidation;


namespace WorldPlants.Models.Validators
{
    public class UserChangePasswordValidator : AbstractValidator<UserChangePasswordDto>
    {
        public UserChangePasswordValidator()
        {
            RuleFor(u => u.NewPassword).MinimumLength(8)
                .WithMessage("Minimalna długośc hasła to 8 znaków");
            RuleFor(u => u.NewRepeatedPassword).Equal(u => u.NewPassword)
                .WithMessage("Nowe hasło i powtórzone hasło nie są takie same");
        }
    }
}
