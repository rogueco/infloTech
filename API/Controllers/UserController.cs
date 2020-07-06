using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Users.Commands;
using Application.Users.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return await Mediator.Send(new GetAllUsersQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            return await Mediator.Send(new GetUserByIdQuery {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(CreateUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUserById(int id, UpdateUserCommand command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteUserById(int id)
        {
            return await Mediator.Send(new DeleteUserByIdCommand {Id = id});
        }
    }
}