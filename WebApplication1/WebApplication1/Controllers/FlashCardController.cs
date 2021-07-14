using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Features.FlashCards;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardController : ControllerBase
    {
        private readonly DataContext _context;

        public FlashCardController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashCard>>> GetFlashCard()
        {
            return await _context.FlashCard.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FlashCard>> PostFlashCard(FlashCard flashcard)
        {
            flashcard.State = 0;
            _context.FlashCard.Add(flashcard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlashCard", new { id = flashcard.FlashCardId }, flashcard);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> GetFlashCard(int id)
        {
            var flashcard = await _context.FlashCard.FindAsync(id);

            if (flashcard == null)
            {
                return NotFound();
            }

            return flashcard;

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlashCard(int id)
        {
            var flashcard = await _context.FlashCard.FindAsync(id);
            if (flashcard == null)
            {
                return NotFound();
            }

            _context.FlashCard.Remove(flashcard);
            await _context.SaveChangesAsync();

            return NoContent();
        }



























    }

}
