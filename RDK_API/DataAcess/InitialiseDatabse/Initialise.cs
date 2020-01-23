using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.InitialiseDatabse
{
    public class Initialise
    {
        public static void InitialiseDatabase()
        {
            var mc = new Migrations.Configuration();
            var dm = new DbMigrator(mc);
            dm.Update();
        }
    }
}
