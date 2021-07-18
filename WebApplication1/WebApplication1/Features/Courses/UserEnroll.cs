using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Features.Courses
{
    public class UserEnroll<TKey> where TKey : IEquatable<TKey>
    {
        //public LLEnrollment();
        public virtual TKey UserId { get; set; }
        public virtual TKey ClassId { get; set; }
    }
}

