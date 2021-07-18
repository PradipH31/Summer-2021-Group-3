using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Features.Auth;
using WebApplication1.Features.Classes;

namespace WebApplication1.Features.Courses
{
    public class Enrollment : UserEnroll<int>
    {
        public virtual User User {get; set;}
        public virtual Course Course { get; set; }

    }
}
