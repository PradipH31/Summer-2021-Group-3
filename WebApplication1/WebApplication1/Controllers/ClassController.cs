﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Features.Auth;
using WebApplication1.Features.Classes;
using WebApplication1.Features.Courses;
using WebApplication1.Features.DTOs;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> userManager;

        public ClassController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/Class
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetClassDescription()
        {
            var currUser = userManager.GetUserId(HttpContext.User);
            var userId = Int32.Parse(currUser);
            //if (User.IsInRole("Student"))
            //{
            //    var user = await _context.Users.FindAsync(userId);
            //    var courses = await _context.Set<Enrollment>().Where(x => x.UserId == userId).Select(x => new EnrollUserDTO
            //    {
            //        courseId = x.Course.ClassId,
            //        Course = x.Course.ClassName,
            //        Instructor = x.Course.ClassOwner
            //    }).ToListAsync();
            //    return Ok(courses);
            //}
            return await _context.ClassDescription.ToListAsync();
        }

        // GET: api/Class/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.ClassDescription.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        [Authorize(Roles = "Admin, Instructor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.ClassId)
            {
                return BadRequest();
            }

            _context.Entry(course).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Class
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            _context.ClassDescription.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = course.ClassId }, course);
        }

        [Authorize(Roles = "Admin, Instructor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.ClassDescription.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.ClassDescription.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return _context.ClassDescription.Any(e => e.ClassId == id);
        }

        [Authorize(Roles = "Admin, Instructor")]
        [HttpPost("Enrollment")]
        public async Task<ActionResult<Enrollment>> AddUserToCourse(int userId, int classId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var User = await _context.Users.FindAsync(userId);
                if (User == null)
                {
                    return BadRequest("User does not exist");
                }

                var Course = await _context.ClassDescription.FindAsync(classId);
                if (Course == null)
                {
                    return BadRequest("Course does not exist");
                }

                var addCourseToUser = await _context.Set<User>().FirstOrDefaultAsync(x => x.Id == userId);
                addCourseToUser.Courses.Add(new Enrollment { ClassId = classId, UserId = userId });
                await _context.SaveChangesAsync();

                transaction.Commit();

                return Ok();
            }
        }

        [Authorize(Roles = "Admin, Instructor")]
        [HttpDelete("Enrollment")]
        public async Task<ActionResult<Enrollment>> RemoveUserFromCourse(int userId, int classId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var User = await _context.Users.FindAsync(userId);
                if (User == null)
                {
                    return BadRequest("User does not exist");
                }

                var Course = await _context.ClassDescription.FindAsync(classId);
                if (Course == null)
                {
                    return BadRequest("Course does not exist");
                }

                var removeUserFromCourse = await _context.Set<User>().FirstOrDefaultAsync(x => x.Id == userId);
                removeUserFromCourse.Courses.Remove(new Enrollment { ClassId = classId, UserId = userId });
                await _context.SaveChangesAsync();

                transaction.Commit();

                return Ok();
            }
        }
    }
}
