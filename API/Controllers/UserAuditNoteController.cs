using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AuditNotes.Commands;
using Application.AuditNotes.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserAuditNoteController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<UserAuditNote>>> GetAllUserAuditNotes()
        {
            return await Mediator.Send(new GetAllUserAuditNotesQuery());
        }
        
        [HttpGet("searchByTerm/{searchTerm}")]
        
        public async Task<ActionResult<List<UserAuditNote>>> GetAllUserAuditNotesByFuzzySearch(string searchTerm)
        {
            searchTerm = searchTerm.ToLower();
            return await Mediator.Send(new GetAllUserAuditNotesByFuzzySearchQuery{SearchTerm = searchTerm});
        }
        
        [HttpGet("searchById/{id}")]
        public async Task<ActionResult<List<UserAuditNote>>> GetAllUserAuditNotesById(int id)
        {
            return await Mediator.Send(new GetAllUserAuditNotesByIdQuery{Id = id});
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAuditNote>> GetUserAuditNoteById(int id)
        {
            return await Mediator.Send(new GetUserAuditNoteByIdQuery(id));
        }

        [HttpPost]
        public async Task<ActionResult<UserAuditNote>> CreateAuditNote(CreateAuditNoteCommand command)
        {
            return await Mediator.Send(command);
        }
        
        
        
    }
}