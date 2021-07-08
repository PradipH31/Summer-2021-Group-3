using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Features.Classes;

namespace WebApplication1.Features.Courses
{
    public class CourseNotes
    {
        public virtual Course Course { get; set; }
        public virtual Notebook Notebook { get; set; }
    }
}
