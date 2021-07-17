using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Features.FlashCards;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardSetController : ControllerBase
    {
        private readonly DataContext _context;

        public FlashCardSetController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashCardSet>>> GetFlashCardSet()
        {
            return await _context.FlashCardSet.Include(c => c.flashCard).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FlashCardSet>> PostFlashCardSet(FlashCardSet flashcardset)
        {
            _context.FlashCardSet.Add(flashcardset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostFlashCardSet", new { id = flashcardset.FlashCardId }, flashcardset);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<FlashCardSet>> GetFlashCardSet(int id)
        {
            var flashcardset = await _context.FlashCardSet.FindAsync(id);

            if (flashcardset == null)
            {
                return NotFound();
            }

            flashcardset.flashCard = _context.FlashCard.Where<FlashCard>(a => a.FlashCardSetId == id).ToArray<FlashCard>();

            return flashcardset;
        }





        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlashCardSet(int id)
        {
            var flashcardset = await _context.FlashCardSet.FindAsync(id);
            if (flashcardset == null)
            {
                return NotFound();
            }

            _context.FlashCardSet.Remove(flashcardset);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}





