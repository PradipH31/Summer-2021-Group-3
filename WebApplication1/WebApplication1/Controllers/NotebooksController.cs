using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Features;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotebooksController : ControllerBase
    {
        private readonly DataContext _context;

        public NotebooksController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Notebooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notebook>>> GetNotebook()
        {
            return await _context.Notebook.ToListAsync();
        }

        // GET: api/Notebooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notebook>> GetNotebook(int id)
        {
            var notebook = await _context.Notebook.FindAsync(id);

            if (notebook == null)
            {
                return NotFound();
            }

            return notebook;
        }

        [Authorize(Roles = "Admin, Instructor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotebook(int id, Notebook notebook)
        {
            if (id != notebook.NotebookId)
            {
                return BadRequest();
            }

            _context.Entry(notebook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException)
            {
                if (!NotebookExists(id))
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

        [Authorize(Roles = "Admin, Instructor")]
        [HttpPost]
        public async Task<ActionResult<Notebook>> PostNotebook(Notebook notebook)
        {
            _context.Notebook.Add(notebook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotebook", new { id = notebook.NotebookId }, notebook);
        }

        [Authorize(Roles = "Admin, Instructor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotebook(int id)
        {
            var notebook = await _context.Notebook.FindAsync(id);
            if (notebook == null)
            {
                return NotFound();
            }

            _context.Notebook.Remove(notebook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NotebookExists(int id)
        {
            return _context.Notebook.Any(e => e.NotebookId == id);
        }
    }
}
