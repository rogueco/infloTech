using System.Threading;
using System.Threading.Tasks;
using Application.AuditNotes.Queries;
using Domain;
using MediatR;
using Persistence;

namespace Application.AuditNotes.Handlers
{
    public class GetUserAuditNoteByIdQueryHandler : IRequestHandler<GetUserAuditNoteByIdQuery, UserAuditNote>
    {
        private readonly DataContext _dataContext;

        public GetUserAuditNoteByIdQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<UserAuditNote> Handle(GetUserAuditNoteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _dataContext.UserAuditNotes.FindAsync(request.Id);
        }
    }
}