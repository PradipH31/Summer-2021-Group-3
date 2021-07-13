using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Features.Auth;
using WebApplication1.Features.Classes;

namespace WebApplication1.Features.Courses
{
    public class Enrollment 
    {
        [Key]
        public virtual Course Course { get; set; }
        public virtual User User { get; set; }
    }
}
