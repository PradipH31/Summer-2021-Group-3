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


        //Return all flashcard sets. Doesn't show individual flashcards

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashCardSet>>> GetFlashCardSet()
        {
            return await _context.FlashCardSet.ToListAsync();
        }

        //Create a flashcardset

        [HttpPost]
        public async Task<ActionResult<FlashCardSet>> PostFlashCardSet(FlashCardSet flashcardset)
        {
            _context.FlashCardSet.Add(flashcardset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostFlashCardSet", new { id = flashcardset.FlashCardId }, flashcardset);
        }


        //Make flashcard set name and descriptions updateable

        [HttpPatch("{userid}/{flashcardsetid}")]
        public async Task<IActionResult> UpdateSetInfo(int userid, int flashcardsetid, string? title = null, string? description = null)
        {


            if (description != null)
                if (description.Length > 0)
                {
                    {
                        _context.FlashCardSet.Where(a => a.UserId == userid).First(b => b.FlashCardSetId == flashcardsetid).Description = description;
                    }
                }

            if (title != null)
                if (title.Length > 0)
                {
                    {
                        _context.FlashCardSet.Where(a => a.UserId == userid).First(b => b.FlashCardSetId == flashcardsetid).Title = title;
                    }
                }

            await _context.SaveChangesAsync();


            return NoContent();
        }




        //Return a flashcardset by its id. Flashcards are shown.

        [HttpGet("{id}/{userid}")]
        public async Task<ActionResult<FlashCardSet>> GetFlashCardSet(int flashcardsetid, int userid)
        {
            var flashcardset = _context.FlashCardSet.Include(c => c.flashCard).Where(a => a.UserId == userid).First(b => b.FlashCardSetId == flashcardsetid);

            if (flashcardset == null)
            {
                return NotFound();
            }

            return flashcardset;
        }



        //Delete a flashcard set referenced by its id and by the user id

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlashCardSet(int flashcardsetid, int userid)
        {
            var flashcardset = _context.FlashCardSet.Where(a => a.UserId == userid).First(b => b.FlashCardSetId == flashcardsetid); ;
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





