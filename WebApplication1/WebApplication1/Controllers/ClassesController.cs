using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Features.Classes;

namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly ClassesContext _context;

        public ClassesController(ClassesContext context) => _context = context;

        [HttpGet]
        public ActionResult<IEnumerable<Classes>> GetClasses()
        {
            return _context.ClassDescription;
        }

        [HttpGet("{id}")]
        public ActionResult<Classes> GetClass(int id)
        {
            var ClassDescription = _context.ClassDescription.Find(id);

            if (ClassDescription == null)
                return NotFound();

            return ClassDescription;
        }

        [HttpPost]
        public ActionResult<Classes> ClassCreate(Classes Class)
        {
            _context.ClassDescription.Add(Class);
            _context.SaveChanges();

            return CreatedAtAction("GetClass", new Classes { Id = Class.Id }, Class);
        }

        [HttpDelete("{id}")]
        public ActionResult<Classes> DeleteClass(int id)
        {
            var ClassDescription = _context.ClassDescription.Find(id);
            if (ClassDescription == null)
                return NotFound();

            _context.ClassDescription.Remove(ClassDescription);
            _context.SaveChanges();

            return ClassDescription;
        }
        
    }
}
