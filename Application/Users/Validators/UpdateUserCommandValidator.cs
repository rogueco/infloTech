using Application.Users.Commands;
using FluentValidation;

namespace Application.Users.Validators
{
    public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
    {

        public UpdateUserCommandValidator()
        {
            RuleFor(x => x.Email).NotEmpty().Length(1, 50);
            RuleFor(x => x.Forename).NotEmpty();
            RuleFor(x => x.Surname).NotEmpty();
            RuleFor(x => x.DateOfBirth).NotEmpty();
        }
    }
}