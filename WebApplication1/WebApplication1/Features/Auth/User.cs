using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using WebApplication1.Features.Classes;

namespace WebApplication1.Features.Auth
{
    public class User : IdentityUser<int>
    {
        //[PersonalData]
        //public string Name { get; set; }
        //[PersonalData]
        //public DateTime DOB { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
 
    }
}
