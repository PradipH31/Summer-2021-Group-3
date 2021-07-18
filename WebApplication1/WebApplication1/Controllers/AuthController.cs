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
using WebApplication1.Features.DTOs;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly DataContext context;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO dto)
        {
            var user = await userManager.FindByNameAsync(dto.Username);
            var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);
            if (user == null)
            {
                return NotFound();
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, true);
            if (!result.Succeeded)
            {
                return NotFound();
            }
            await signInManager.SignInAsync(user, false, "Password");
            return Ok(new { User = user, Roles = rolesList });
        }

        [HttpPost("logout")]
        public async Task<ActionResult> LogOut()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<UserInfoDTO>> ReturnOfUserData()
        {
            var result = await userManager.GetUserAsync(User);
            var user = await context.Set<User>().Where(x => x.Id == result.Id).FirstOrDefaultAsync();
            var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);
            if (user == null)
            {
                return Unauthorized();
            }

            var dataToReturn = new UserInfoDTO
            {
                Role = rolesList,
                Username = user.UserName
            };

            return Ok(dataToReturn);
        }
    }
}
