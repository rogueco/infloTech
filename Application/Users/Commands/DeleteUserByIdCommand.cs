using MediatR;

namespace Application.Users.Commands
{
    public class DeleteUserByIdCommand : IRequest<Unit>
    {
        public int Id { get; set; }
    }
}