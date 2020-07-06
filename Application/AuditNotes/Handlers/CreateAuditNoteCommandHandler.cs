using System;
using System.Threading;
using System.Threading.Tasks;
using Application.AuditNotes.Commands;
using Domain;
using MediatR;
using Persistence;

namespace Application.AuditNotes.Handlers
{
    public class CreateAuditNoteCommandHandler : IRequestHandler<CreateAuditNoteCommand, UserAuditNote>
    {
        private readonly DataContext _dataContext;

        public CreateAuditNoteCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<UserAuditNote> Handle(CreateAuditNoteCommand request, CancellationToken cancellationToken)
        {
            UserAuditNote userAuditNote = new UserAuditNote
            {
                ActionDescription = request.ActionDescription,
                ActionType = request.ActionType,
                CreatedOn = DateTime.Now,
                Email = request.Email,
                Forename = request.Forename,
                Surname = request.Surname
            };

            _dataContext.UserAuditNotes.Add(userAuditNote);

            bool successful = await _dataContext.SaveChangesAsync() > 0;

            if (successful)
            {
                return userAuditNote;
            }
            
            throw new Exception("Problem adding new audit note");
        }
    }
}