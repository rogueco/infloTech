using System;

namespace Domain
{
    public class UserAuditNote
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public string ActionType { get; set; }
        
        public string ActionDescription { get; set; }

        public string Forename { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }
    }
}