using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Features.Auth;


namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> manager;
        
        public UserController(DataContext context, UserManager<User> manager)
        {
            _context = context;
            this.manager = manager;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(CreateUserDTO user)
        {
            var newUser = new User { UserName = user.Username };

        }
    }
}
