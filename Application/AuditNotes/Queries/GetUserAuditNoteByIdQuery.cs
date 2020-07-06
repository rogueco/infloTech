using Domain;
using MediatR;

namespace Application.AuditNotes.Queries
{
    public class GetUserAuditNoteByIdQuery : IRequest<UserAuditNote>
    {
        public int Id { get; set; }

        public GetUserAuditNoteByIdQuery(int id)
        {
            Id = id;
        }
    }
}