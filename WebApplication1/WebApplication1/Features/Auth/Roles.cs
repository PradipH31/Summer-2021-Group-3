using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Features.Auth
{
    public class Roles
    {
        public virtual string Student { get; set; }
        public virtual string Instructor { get; set; }
        public virtual string Guest { get; set; }
    }
}
