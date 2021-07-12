using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Features.FileSetup;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileManagementController : ControllerBase
    {
        private readonly DataContext _context;

        public FileManagementController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfoFile>>> GetInfoFile()
        {
            return await _context.InfoFile.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InfoFile>> GetInfoFile(int id, bool download = false)
        {
            var infofile = await _context.InfoFile.FindAsync(id);

            if (infofile == null)
            {
                return NotFound();
            }

            if (!download)
            {
                return infofile;
            }
            else
            {
                string name = infofile.Name;
                string contenttype = infofile.ContentType;
                byte[] content = Convert.FromBase64String(infofile.Content);

                return File(content, contenttype, name);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInfoFile(int id, InfoFile infofile)
        {
            if (id != infofile.InfoFileId)
            {
                return BadRequest();
            }

            _context.Entry(infofile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException)
            {
                if (!InfoFileExists(id))
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

        [HttpPost]
        public async Task<ActionResult<InfoFile>> PostInfofile(InfoFile infofile)
        {
            _context.InfoFile.Add(infofile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInfoFile", new { id = infofile.InfoFileId }, infofile);
        }



        [HttpPost("{postedFile}")]
        public async Task UploadInfoFile(IFormFile postedFile)
        {
            byte[] bytes;

            {
                using (var memoryStream = new MemoryStream())
                {
                    postedFile.OpenReadStream().CopyTo(memoryStream);
                    bytes = memoryStream.ToArray();
                }
            }

            string name = Path.GetFileName(postedFile.FileName);
            string contenttype = postedFile.ContentType;
            string content = Convert.ToBase64String(bytes);

            await PostInfofile(new InfoFile { Name = name, Content = content, ContentType = contenttype });
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInfoFile(int id)
        {
            var infofile = await _context.InfoFile.FindAsync(id);
            if (infofile == null)
            {
                return NotFound();
            }

            _context.InfoFile.Remove(infofile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InfoFileExists(int id)
        {
            return _context.InfoFile.Any(e => e.InfoFileId == id);
        }
    }
}
