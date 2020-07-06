using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Users.Commands;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users.Handlers
{
    public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand, Unit>
    {
        private readonly DataContext _dataContext;

        public DeleteUserByIdCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(DeleteUserByIdCommand request, CancellationToken cancellationToken)
        {
            User user = await _dataContext.Users.FindAsync(request.Id);

            if (user == null)
            {
                throw new Exception("Not Found");
            }

            UserAuditNote userAuditNote = new UserAuditNote
            {
                ActionDescription = $"The following user has been deleted: {user.Forename}: {user.Surname}",
                ActionType = "Deletion",
                Email = user.Email,
                Surname = user.Surname,
                Forename = user.Forename,
                CreatedOn = DateTime.Now,
                UserId = request.Id
            };
            _dataContext.UserAuditNotes.Add(userAuditNote);
            _dataContext.Remove(user);


            bool successful = await _dataContext.SaveChangesAsync() > 0;

            if (successful)
            {
                return Unit.Value;
            }

            throw new Exception("Problem removing User");
        }
    }
}