using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Features.Classes;
//using WebApplication1.Security;
using WebApplication1.Features;
using WebApplication1.Features.Courses;

namespace WebApplication1.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        public DbSet<Course> ClassDescription { get; set; }
        public DbSet<Notebook> Notebook { get; set; }
     /* protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var CourseBuilder = builder.Entity<CourseNotes>();
            CourseBuilder.HasKey(y => new { y.ClassId, y.NotebookId });
            CourseBuilder.HasOne(y => y.Course)
                .WithMany(y => y.Notebook)
                .HasForeignKey(y => y.ClassId);
            CourseBuilder.HasOne(y => y.Notebook)
                .WithMany(y => y.Course)
                .HasForeignKey(y => y.NotebookId);
        }*/

    }
}
