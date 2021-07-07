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
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly DataContext _context;

        public StudentController(DataContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(CreateUserDTO user)
        {
            var newUser = new User { UserName = user.Username, Email = user.Email };
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var identityResult = await userManager.CreateAsync(newUser, user.Password);
                if (!identityResult.Succeeded)
                {
                    return BadRequest();
                }

                if (user.Password != user.ConfirmPassword)
                {
                    return BadRequest();
                }

                if (user.Email != user.ConfirmEmail)
                {
                    return BadRequest();
                }

                var roleResult = await userManager.AddToRoleAsync(newUser, Roles.Student);
                if (!roleResult.Succeeded)
                {
                    return BadRequest();
                }

                transaction.Commit(); // this marks our work as done

                await signInManager.SignInAsync(newUser, isPersistent: false);

                return Created(string.Empty, new UserDTO
                {
                    Username = newUser.UserName
                });
            }
        }
    }
}
