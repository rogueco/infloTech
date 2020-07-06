using System;
using Domain;
using MediatR;

namespace Application.Users.Commands
{
    public class CreateUserCommand : IRequest<User>
    {
        public int Id { get; set; }
        
        public string Forename { get; set; }
        
        public string Surname { get; set; }
        
        public string Email { get; set; }

        public bool IsActive { get; set; }
        
        public DateTime DateOfBirth { get; set; }
    }
}