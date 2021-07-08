using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Features;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotebookJHController : ControllerBase
    {
        private readonly DBContext _context;

        public NotebookJHController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Notebooks
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Notebook>>> GetNotebookJH(int id)
        {
            return await _context.Notebook
                .Where(n => n.ClassId == id)
                .ToListAsync();
        }
    }
}
