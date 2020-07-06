using System.Collections.Generic;
using Domain;
using MediatR;

namespace Application.AuditNotes.Queries
{
    public class GetAllUserAuditNotesByIdQuery : IRequest<List<UserAuditNote>>
    {
        public int Id { get; set; }
    }
}