using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Users.Commands;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users.Handlers
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, User>
    {
        private readonly DataContext _dataContext;

        public CreateUserCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            User user = new User
            {
                Forename = request.Forename,
                Surname = request.Surname,
                Email = request.Email,
                DateOfBirth = request.DateOfBirth,
                IsActive = request.IsActive
            };

            UserAuditNote userAuditNote = new UserAuditNote
            {
                ActionDescription = $"The following user has been Created: {user.Forename}: {user.Surname}",
                ActionType = "Creation",
                Email = user.Email,
                Surname = user.Surname,
                Forename = user.Forename,
                CreatedOn = DateTime.Now,
                UserId = _dataContext.Users.ToList().Count + 1
            };
            _dataContext.UserAuditNotes.Add(userAuditNote);
            _dataContext.Users.Add(user);

            bool successful = await _dataContext.SaveChangesAsync() > 0;

            if (successful)
            {
                return user;
            }

            throw new Exception("Issue creating User");
        }
    }
}