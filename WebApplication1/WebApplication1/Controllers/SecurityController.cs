using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebApplication1.Data;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WebApplication1.Security;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : Controller
    {
        private IConfiguration config;

        private DBContext db;

        public SecurityController(IConfiguration config, DBContext db)
        {
            this.config = config;
            this.db = db;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult SignIn([FromBody] SignIn loginDetails)
        {
            var query = from u in db.Users
                        where u.WNumber == loginDetails.WNumber && u.Password == loginDetails.Password
                        select u;

            if (query.Count() > 0)
            {
                var tokenString = GenerateJWT(loginDetails.WNumber);
                return Ok(new { 
                    token = tokenString ,
                    firstName = query.FirstOrDefault().FirstName
                });
            }
            else
            {
                return Unauthorized();
            }
        }


        //[AllowAnonymous]
        //[HttpPost]
        //[Route("[action]")]
        //public IActionResult Register([FromBody] Register userDetails)
        //{
        //    var usr = from u in db.Users
        //              where u.WNumber == userDetails.WNumber
        //              select u;

        //    if (usr.Count() <= 0)
        //    {
        //        var user = new User();
        //        user.WNumber = userDetails.WNumber;
        //        user.Password = userDetails.Password;
        //        user.LastName = userDetails.LastName;
        //        user.FirstName = userDetails.FirstName;
        //        user.BirthDate = userDetails.BirthDate;
        //        user.Role = "Manager";

        //        db.Users.Add(user);
        //        db.SaveChanges();
        //        return Ok("User created successfully.");
        //    }
        //    else
        //    {
        //        return BadRequest("User Name already exists.");
        //    }
        //}



        private string GenerateJWT(string WNumber)
        {
            var usr = (from u in db.Users
                       where u.WNumber == WNumber
                       select u).SingleOrDefault();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, usr.WNumber));

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                expires: DateTime.Now.AddHours(12),
                signingCredentials: credentials,
                claims: claims);

            var tokenHandler = new JwtSecurityTokenHandler();
            var stringToken = tokenHandler.WriteToken(token);
            return stringToken;
        }
    }
}