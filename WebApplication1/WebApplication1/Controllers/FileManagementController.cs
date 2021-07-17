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
using Octokit;



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
        public ActionResult<IEnumerable<InfoFile>> GetInfoFile()
        {
            //return await _context.InfoFile
            var results =  _context.InfoFile.FromSqlRaw("SELECT InfoFileId, Name, ContentType, Content = NULL, CourseId FROM InfoFile");

            return results.ToList<InfoFile>();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<InfoFile>> GetInfoFile(int courseId, int id, bool download = false, string? saveas = null)
        {
            var infofile =  _context.InfoFile.Where(a => a.CourseId == courseId).First(b => b.InfoFileId == id);

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

                string name;


                name = infofile.Name;
                
                if(saveas != null)
                {
                    if(Path.GetExtension(name) == Path.GetExtension(saveas))
                    {
                        name = saveas;
                    }
                    else
                    {
                        return BadRequest("Extension of file being downloaded must be the same as extension of original file.");
                        {

                        }
                    }
                }
                string contenttype = infofile.ContentType;
                byte[] content = Convert.FromBase64String(infofile.Content);

                return File(content, contenttype, name);
            }
        }


        [HttpPatch("{courseid}/{infofileid}")]
        public async Task<IActionResult> UpdateFileInfo(int courseid, int infofileid, string? name = null)
        {

            if (name != null)
                if (name.Length > 0)
                {
                    {

                        var nameparts = _context.InfoFile.Where(a => a.CourseId == courseid).First(b => b.InfoFileId == infofileid).Name;
                        var filetype = Path.GetExtension(nameparts);

                        var newnametype = Path.GetExtension(name);

                        //Cannot convert file types
                        if (!filetype.Equals(newnametype))
                            return BadRequest("File extension on the new file name must be the same as the old file name.");


                        _context.InfoFile.Where(a => a.CourseId == courseid).First(b => b.InfoFileId == infofileid).Name = name;
                    }
                }


            await _context.SaveChangesAsync();


            return NoContent();
        }





        [HttpPost]
        public async Task<ActionResult<InfoFile>> PostInfofile(InfoFile infofile)
        {
            _context.InfoFile.Add(infofile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInfoFile", new { id = infofile.InfoFileId }, infofile);
        }

        [HttpPost("{courseid}/{user}/{repo}/{filepath}")]
        public async Task PostFromGithub(int courseid, string user, string repo, string filepath, string? saveas = null)
        {
            //Generate random header for anonymous access (only works for public repositories)
            Random header = new Random();
            var client = new GitHubClient(new ProductHeaderValue(header.Next().ToString()));
            client.Credentials = new Credentials("token", AuthenticationType.Anonymous);

            //Base base 64 string of file. Oktokit gets byte[] of file content from github
            //and convert turns it into a base64 string so it can be converted into
            //an InfoFile
            var content = await client.Repository.Content.GetRawContent(user, repo, filepath);
            string sfcontent = Convert.ToBase64String(content);

            //Gets Mime type of file based on file name from large set of Mime types 
            var contenttype = MimeMapping.MimeUtility.GetMimeMapping(filepath);

            string name;

            //Gets name of file from filepath
            if (saveas == null)
            {
                name = filepath.Substring(filepath.LastIndexOf("%") + 3);
            }
            else
            {
                name = saveas;
            }
            //Push InfoFile to database
            await PostInfofile(new InfoFile { Name = name, ContentType = contenttype, Content = sfcontent, CourseId = courseid});

        }


        [HttpPost("{postedFile}/{courseid}")]
        public async Task UploadInfoFile(IFormFile postedFile, int courseid)
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

            await PostInfofile(new InfoFile { Name = name, Content = content, ContentType = contenttype, CourseId = courseid});
        }



        [HttpDelete("{courseid}/{infofileid}")]
        public async Task<IActionResult> DeleteInfoFile(int courseid, int infofileid)
        {
            var infofile = _context.InfoFile.Where(a => a.CourseId == courseid).First(b => b.InfoFileId == infofileid);
            if (infofile == null)
            {
                return NotFound();
            }

            _context.InfoFile.Remove(infofile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InfoFileExists(int courseid, int infofileid)
        {
            return _context.InfoFile.Where(a => a.CourseId == courseid).Any(b => b.InfoFileId == infofileid);
        }
    }
}
