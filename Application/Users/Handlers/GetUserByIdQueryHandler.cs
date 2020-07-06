using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Users.Queries;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users.Handlers
{
    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, User>
    {
        private readonly DataContext _dataContext;

        public GetUserByIdQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<User> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            return await _dataContext.Users.FindAsync(request.Id);
            
            // TODO: ADD handler for if no user is found
        }
    }
}