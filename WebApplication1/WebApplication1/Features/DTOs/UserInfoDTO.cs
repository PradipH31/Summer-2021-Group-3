using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Features.DTOs
{
    public class UserInfoDTO
    {
        public string Username { get; set; }
        public ICollection<string> Role { get; set; }
    }

}
        
