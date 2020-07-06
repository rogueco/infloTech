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
        GetAllUserAuditNotesByFuzzySearchQueryHandler : IRequestHandler<GetAllUserAuditNotesByFuzzySearchQuery,
            List<UserAuditNote>>
    {
        private readonly DataContext _dataContext;

        public GetAllUserAuditNotesByFuzzySearchQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<UserAuditNote>> Handle(GetAllUserAuditNotesByFuzzySearchQuery request,
            CancellationToken cancellationToken)
        {
            List<UserAuditNote> userAuditNotes =
                _dataContext.UserAuditNotes.Where(x =>
                        x.Email.ToLower().Contains(request.SearchTerm) ||
                        x.Forename.ToLower().Contains(request.SearchTerm) ||
                        x.Surname.ToLower().Contains(request.SearchTerm) ||
                        x.ActionDescription.ToLower().Contains(request.SearchTerm) ||
                        x.ActionType.ToLower().Contains(request.SearchTerm))
                    .ToList();

            return userAuditNotes;
        }
    }
}