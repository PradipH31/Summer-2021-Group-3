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
            _context.FlashCard.Add(flashcard);

            await _context.SaveChangesAsync();

            return CreatedAtAction("PostFlashCard", new { id = flashcard.FlashCardId }, flashcard);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<FlashCard>> GetFlashCard(int id, int flashcardsetid, int userid)
        {
            var flashcard = _context.FlashCard.Where(a => a.UserId == userid).Where(a => a.FlashCardSetId == flashcardsetid).First(b => b.FlashCardId == id);

            if (flashcard == null)
            {
                return NotFound();
            }

            return flashcard;
        }


        //Make flashcard name and descriptions updateable

        [HttpPatch("{userid}/{flashcardsetid}/{flashcardid}")]
        public async Task<IActionResult> UpdateSetInfo(int userid, int flashcardsetid, int flashcardid, string? title = null, string? description = null)
        {


            if (description != null)
                if (description.Length > 0)
                {
                    {
                        _context.FlashCard.Where(a => a.UserId == userid).Where(b => b.FlashCardSetId == flashcardsetid).First(c => c.FlashCardId == flashcardid).Description = description;
                    }
                }

            if (title != null)
                if (title.Length > 0)
                {
                    {
                        _context.FlashCard.Where(a => a.UserId == userid).Where(b => b.FlashCardSetId == flashcardsetid).First(c => c.FlashCardId == flashcardid).Title = title;
                    }
                }

            await _context.SaveChangesAsync();


            return NoContent();
        }


        [HttpDelete("{flashcardid}/{flashcardsetid}/{userid}")]
        public async Task<IActionResult> DeleteFlashCard(int flashcardid, int flashcardsetid, int userid)
        {
            var flashcard = _context.FlashCard.Where(a => a.UserId == userid).Where(b => b.FlashCardSetId == flashcardsetid).First(c => c.FlashCardId == flashcardid);
            if (flashcard == null)
            {
                return NotFound();
            }

            _context.FlashCardSet.First(c => c.FlashCardSetId == flashcard.FlashCardSetId).flashCard.Remove(flashcard);
            await _context.SaveChangesAsync();

            return NoContent();
        }



























    }

}
