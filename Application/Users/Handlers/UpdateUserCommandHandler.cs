using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Users.Commands;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users.Handlers
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, User>
    {
        private readonly DataContext _dataContext;

        public UpdateUserCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            User user = _dataContext.Users.Find(request.Id);


            UserAuditNote userAuditNote = new UserAuditNote
            {
                ActionDescription =
                    $"The following user has been updated: {user.Forename}: {user.Surname}. Changed Values are:" +
                    $"{(user.Email != request.Email ? $"Email has updated from {user.Email} to {request.Email}." : string.Empty)}" +
                    $"{(user.Forename != request.Forename ? $"Forename has updated from {user.Forename} to {request.Forename}." : string.Empty)}" +
                    $"{(user.Surname != request.Surname ? $"Surname has updated from {user.Surname} to {request.Surname}." : string.Empty)}" +
                    $"{(user.IsActive != request.IsActive ? $"IsActive has updated from {user.IsActive} to {request.IsActive}." : string.Empty)}" +
                    $"{(user.DateOfBirth != request.DateOfBirth ? $"DateOfBirth has updated from {user.DateOfBirth} to {request.DateOfBirth}." : string.Empty)}",
                ActionType = "Update",
                Email = user.Email,
                Surname = user.Surname,
                Forename = user.Forename,
                CreatedOn = DateTime.Now,
                UserId = request.Id
            };


            user.Email = request.Email ?? user.Email;
            user.Forename = request.Forename ?? user.Forename;
            user.Surname = request.Surname ?? user.Email;
            user.DateOfBirth = request.DateOfBirth != null ? request.DateOfBirth : user.DateOfBirth;

            _dataContext.UserAuditNotes.Add(userAuditNote);

            bool successful = await _dataContext.SaveChangesAsync() > 0;

            if (successful)
            {
                return user;
            }

            throw new Exception("Issue updating User");
        }
    }
}