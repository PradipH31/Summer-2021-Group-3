using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Features.Classes;
using WebApplication1.Security;
using WebApplication1.Features;

namespace WebApplication1.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        public DbSet<Class> ClassDescription { get; set; }


    }
}
