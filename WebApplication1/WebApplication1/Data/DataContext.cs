using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Features;
using WebApplication1.Features.Auth;
using WebApplication1.Features.Classes;
using WebApplication1.Features.FileSetup;
using WebApplication1.Features.FlashCards;

namespace WebApplication1.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Course> ClassDescription { get; set; }
        public DbSet<Notebook> Notebook { get; set; }
        public DbSet<InfoFile> InfoFile { get; set; }
        public DbSet<FlashCard> FlashCard { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var UserRoleBuilder = builder.Entity<UserRole>();

            UserRoleBuilder.HasKey(x => new { x.UserId, x.RoleId });

            UserRoleBuilder.HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId);

            UserRoleBuilder.HasOne(x => x.User)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.UserId);
        }
    }
}
