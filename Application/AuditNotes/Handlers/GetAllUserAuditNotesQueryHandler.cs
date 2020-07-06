using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.AuditNotes.Queries;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AuditNotes.Handlers
{
    public class GetAllUserAuditNotesQueryHandler : IRequestHandler<GetAllUserAuditNotesQuery, List<UserAuditNote>>
    {
        private readonly DataContext _dataContext;

        public GetAllUserAuditNotesQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<List<UserAuditNote>> Handle(GetAllUserAuditNotesQuery request, CancellationToken cancellationToken)
        {
            return await _dataContext.UserAuditNotes.ToListAsync();
        }
    }
}