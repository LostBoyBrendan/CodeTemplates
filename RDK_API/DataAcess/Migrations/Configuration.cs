namespace DataAccess.Migrations
{
    using DataAccess.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataAccess.Context.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DataAccess.Context.DataContext context)
        {
            //  This method will be called after migrating to the latest version.

            //var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new Context.DataContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new Context.DataContext()));

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new ApplicationRole { Name = "SuperAdmin", CanView = true, CanCreate = true, CanEdit = true, CanDelete = true });
                roleManager.Create(new ApplicationRole { Name = "Admin", CanView = true, CanCreate = true, CanEdit = true, CanDelete = true });
                roleManager.Create(new ApplicationRole { Name = "User", CanView = true, CanCreate = false, CanEdit = false, CanDelete = false });
            }
        }
    }
}
