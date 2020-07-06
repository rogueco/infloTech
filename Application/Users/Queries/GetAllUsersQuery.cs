using System.Collections.Generic;
using Domain;
using MediatR;

namespace Application.Users.Queries
{
    public class GetAllUsersQuery : IRequest<List<User>>
    {
        
    }
}