using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserAuditNote> UserAuditNotes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasData(
                    new User
                    {
                        Id = 1, Forename = "Grant", Surname = "Cooper", Email = "grant.cooper@example.com",
                        IsActive = true, DateOfBirth = DateTime.Now
                    },
                    new User
                    {
                        Id = 2, Forename = "Tom", Surname = "Gathercole", Email = "tom.gathercole@example.com",
                        IsActive = true, DateOfBirth = DateTime.Now
                    },
                    new User
                    {
                        Id = 3, Forename = "Mark", Surname = "Edmondson", Email = "mark.edmondson@example.com",
                        IsActive = true, DateOfBirth = DateTime.Now
                    },
                    new User
                    {
                        Id = 4, Forename = "Graham", Surname = "Clark", Email = "graham.clark@example.com",
                        IsActive = true, DateOfBirth = DateTime.Now
                    }
                );
        }
    }
}