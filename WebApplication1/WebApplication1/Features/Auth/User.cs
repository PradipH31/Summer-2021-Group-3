using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using WebApplication1.Features.Classes;
using WebApplication1.Features.Courses;
using WebApplication1.Features.FlashCards;

namespace WebApplication1.Features.Auth
{
    public class User : IdentityUser<int>
    {
        //[PersonalData]
        //public string Name { get; set; }
        //[PersonalData]
        //public DateTime DOB { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
        public virtual ICollection<Enrollment> Courses { get; set; } = new List<Enrollment>();
        public virtual ICollection<FlashCardSet> FlashCardSet { get; set; } = new List<FlashCardSet>();
 
    }


}
