using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Features.Auth
{
    internal static class Roles
    {
        public const string Admin = nameof(Admin);
        public const string ClassAdmin = nameof(ClassAdmin);
        public const string Student = nameof(Student);
        public const string Instructor = nameof(Instructor);
        public const string Guest = nameof(Guest);
    }
}
