using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Features.Auth
{
    public class LoggedInUserDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> roles { get; set; } = new List<string>();
    }
}
