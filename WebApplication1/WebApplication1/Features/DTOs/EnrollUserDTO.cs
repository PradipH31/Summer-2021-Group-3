using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Features.Classes;

namespace WebApplication1.Features.DTOs
{
    public class EnrollUserDTO
    {
        public int courseId { get; set; }
        public string Course { get; set; }
        public string Instructor { get; set; }
    }
}
