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
        private readonly DataContext context;
        private readonly UserManager<User> userManager;
        
        public UserController(DataContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(CreateUserDTO createUser)
        {
            var newUser = new User { UserName = createUser.Username, Email = createUser.Email};
            using (var transaction = await context.Database.BeginTransactionAsync())
            {
                if (string.Equals(createUser.Role, Roles.Student, StringComparison.InvariantCultureIgnoreCase))
                {
                    return BadRequest();
                }

                if (!await context.Roles.AnyAsync(x => x.Name == createUser.Role))
                {
                    return BadRequest();
                }
                
                var identityResult = await userManager.CreateAsync(newUser, createUser.Password);
                if (!identityResult.Succeeded)
                {
                   return BadRequest("Double check the password");
                }
                
                var roleResult = await userManager.AddToRoleAsync(newUser, createUser.Role);
                if (!roleResult.Succeeded)
                {
                    return BadRequest("Check the role");
                }

                transaction.Commit(); 

                return Ok(new UserDTO { Username = newUser.UserName });

            }
        }
    }
}
