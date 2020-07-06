using System.Collections.Generic;
using Domain;
using MediatR;

namespace Application.AuditNotes.Queries
{
    public class GetAllUserAuditNotesQuery : IRequest<List<UserAuditNote>>
    {
        
    }
}