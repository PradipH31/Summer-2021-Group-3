using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Features.Classes;
using System.Threading.Tasks;


namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClassImageController : ControllerBase
    {
        private readonly DBContext _context;
        public ClassImageController(DBContext context) => _context = context;     
        [HttpPost]
        public async Task<IActionResult> PostClassImage(IFormFile postedFile)
        {
            byte[] bytes;

            {
                using (var memoryStream = new MemoryStream())
                {
                    postedFile.OpenReadStream().CopyTo(memoryStream);
                    bytes = memoryStream.ToArray();
                }
            }

            string Name = Path.GetFileName(postedFile.FileName);
            string ContentType = postedFile.ContentType;
            byte[] Data = bytes;

            ClassImage img = new ClassImage { Name = Name, ContentType = ContentType, Data = Data };

            _context.ClassImages.Add(img);
            _context.SaveChanges();

            return CreatedAtAction("PostClassImage", img);
        }


        

        /*[HttpGet]
        public FileResult DownloadFile(int? fileId)
        {
            FilesEntities entities = new FilesEntities();
            var file = entities.ClassImage.ToList().Find(p => p.id == fileId.Value);
            return File(file.Data, file.ContentType, file.Name);
        }
        */
    }
}