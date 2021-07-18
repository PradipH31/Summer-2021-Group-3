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
                    return BadRequest("Role does not exist. \nAvailable Roles: \nAdmin \nClassAdmin \nInstructor \nStudent \nGuest");
                }
                
                var identityResult = await userManager.CreateAsync(newUser, createUser.Password);
                if (!identityResult.Succeeded)
                {
                    if (createUser.Password != createUser.ConfirmPassword)
                        return BadRequest("Passwords do not match");
                    if (createUser.Email != createUser.ConfirmEmail)
                        return BadRequest("Emails do not match");
                    if (await context.Users.AnyAsync(x => createUser.Username == x.NormalizedUserName) && await context.Users.AnyAsync(x => createUser.Username == x.UserName))
                        return BadRequest("User already exists");
                    return BadRequest("Invalid Request. \nCheck username and password. \nUsername cannot contain spaces \nPassword must be 8 characters long \nPassword must contain at least 1 capital letter, symbol, and number ");
                }
                
                var roleResult = await userManager.AddToRoleAsync(newUser, createUser.Role);
                if (!roleResult.Succeeded)
                {
                    return BadRequest("Unable to add user to role");
                }

                transaction.Commit(); 

                return Ok(new UserDTO { Username = newUser.UserName });

            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> getUserList()
        {
            var users = await userManager.Users.ToListAsync();
            return users;

        }

    }
}
