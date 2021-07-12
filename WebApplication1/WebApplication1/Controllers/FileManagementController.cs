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
using System.Web;
using Octokit;



namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileManagementController : ControllerBase
    {
        private readonly DataContext _context;
        private object urlfetch;

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

        [HttpPost("{user}/{repo}/{filepath}")]
        public async Task PostFromGithub(string user, string repo, string filepath)
        {
            //Generate random header for anonymous access (only works for public repositories)
            Random header = new Random();
            var client = new GitHubClient(new ProductHeaderValue(header.Next().ToString()));
            client.Credentials = new Credentials("token", AuthenticationType.Anonymous);

            //Base base 64 string of file. Oktokit gets byte[] of fille content from github
            //and convert turns it into a base64 string so it can be converted into
            //an InfoFile
            var content = await client.Repository.Content.GetRawContent(user, repo, filepath);
            string sfcontent = Convert.ToBase64String(content);

            //Gets Mime type of file based on file name from large set of Mime types 
            var contenttype = MimeMapping.MimeUtility.GetMimeMapping(filepath);

            //Gets name of file from filepath
            string[] subdirs = filepath.Split("/");
            string name = subdirs[^1];

            //Push InfoFile to database
            await PostInfofile(new InfoFile { Name = name, ContentType = contenttype, Content = sfcontent });

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
