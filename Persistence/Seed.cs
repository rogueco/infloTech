using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore.Internal;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.UserAuditNotes.Any())
            {
                List<UserAuditNote> userAuditNotes = new List<UserAuditNote>
                {
                    new UserAuditNote
                    {
                    Id = 1, ActionDescription = "Initial Creation on DbBuild", ActionType = "Creation", Forename = "Grant",
                    Surname = "Cooper", Email = "grant.cooper@example.com", CreatedOn = DateTime.Now, UserId = 1
                    },
                    new UserAuditNote
                    {
                    Id = 2, ActionDescription = "Initial Creation on DbBuild", ActionType = "Creation", Forename = "Tom",
                    Surname = "Gathercole", Email = "tom.gathercole@example.com", CreatedOn = DateTime.Now, UserId = 2
                    },
                    new UserAuditNote
                    {
                    Id = 3, ActionDescription = "Initial Creation on DbBuild", ActionType = "Creation", Forename = "Mark",
                    Surname = "Edmondson", Email = "mark.edmondson@example.com", CreatedOn = DateTime.Now, UserId = 3
                    },
                    new UserAuditNote
                    {
                    Id = 4, ActionDescription = "Initial Creation on DbBuild", ActionType = "Creation", Forename = "Graham",
                    Surname = "Clark", Email = "graham.clark@example.com", CreatedOn = DateTime.Now, UserId = 4
                    }
                };

                context.UserAuditNotes.AddRange(userAuditNotes);
                context.SaveChanges();
            }
        }
    }
}