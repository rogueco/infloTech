using System;
using Domain;
using MediatR;

namespace Application.AuditNotes.Commands
{
    public class CreateAuditNoteCommand : IRequest<UserAuditNote>
    {
        public int Id { get; set; }
        
        public DateTime CreatedOn { get; set; }
        
        public string ActionType { get; set; }
        
        public string ActionDescription { get; set; }

        public string Forename { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }
    }
}