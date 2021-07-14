using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Features.Classes;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly DataContext _context;

        public ClassController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Class
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetClassDescription()
        {
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

        // PUT: api/Class/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // DELETE: api/Class/5
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

        [HttpPost("Enrollment")]
        public async Task<ActionResult> AddUserToCourse(int userId, int classId)
        {
            var course = await _context.ClassDescription.FindAsync(classId);
            var User = await _context.Users.FindAsync(userId);

            User.Courses.Add(course);

            return Ok();
        }
        [HttpDelete("Enrollment")]
        public async Task<ActionResult> RemoveUserFromCourse(int userId, int classId)
        {
            var course = await _context.ClassDescription.FindAsync(classId);
            var User = await _context.Users.FindAsync(userId);

            User.Courses.Remove(course);

            return Ok();
        }
    }
}
