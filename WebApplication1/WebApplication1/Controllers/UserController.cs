using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                if (string.Equals(user.Role, Roles.Student, StringComparison.InvariantCultureIgnoreCase))
                {
                    return BadRequest();
                }

                if (!await _context.Roles.AnyAsync(x => x.Name == user.Role))
                {
                    return BadRequest();
                }

               // var identityResult = await manager.CreateAsync(newUser, user.Password);
               // if (!identityResult.Succeeded)
               // {
                //    return BadRequest();
               // }

                var roleResult = await manager.AddToRoleAsync(newUser, user.Role);
                if (!roleResult.Succeeded)
                {
                    return BadRequest();
                }

                transaction.Commit(); 

                return Ok(new UserDTO
                {
                    Username = newUser.UserName
                });

            }
        }
    }
}
