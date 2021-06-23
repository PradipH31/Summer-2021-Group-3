using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Features.Classes;


namespace WebApplication1.Data
{
    public class ClassesContext : DbContext
    {
        public ClassesContext(DbContextOptions<ClassesContext> options) : base(options)
        {

        }

        public DbSet<Classes> ClassDescription { get; set; }
        
    }
}
