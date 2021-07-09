using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Features.Classes;
using WebApplication1.Features;
using WebApplication1.Security;

namespace WebApplication1.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        public DbSet<Course> ClassDescription { get; set; }
        public DbSet<Notebook> Notebook { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
