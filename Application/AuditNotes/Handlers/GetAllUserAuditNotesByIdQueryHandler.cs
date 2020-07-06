using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AuditNotes.Queries;
using Domain;
using MediatR;
using Persistence;

namespace Application.AuditNotes.Handlers
{
    public class
        GetAllUserAuditNotesByIdQueryHandler : IRequestHandler<GetAllUserAuditNotesByIdQuery, List<UserAuditNote>>
    {
        private readonly DataContext _dataContext;

        public GetAllUserAuditNotesByIdQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<UserAuditNote>> Handle(GetAllUserAuditNotesByIdQuery request,
            CancellationToken cancellationToken)
        {
            List<UserAuditNote> userAuditNotes =
                _dataContext.UserAuditNotes.ToList().Where(x => x.UserId == request.Id).ToList();

            return userAuditNotes;
        }
    }
}