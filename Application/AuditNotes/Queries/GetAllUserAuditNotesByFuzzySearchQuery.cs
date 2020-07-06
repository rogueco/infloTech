using System.Collections.Generic;
using Domain;
using MediatR;

namespace Application.AuditNotes.Queries
{
    public class GetAllUserAuditNotesByFuzzySearchQuery : IRequest<List<UserAuditNote>>
    {
        public string SearchTerm { get; set; }
    }
}