using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Features.Classes;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClassImageController : ControllerBase
    {
        private readonly DBContext _context;


        public ClassImageController(DBContext context) => _context = context;

        [HttpGet]
        public ActionResult<IEnumerable<ClassImage>> GetClasses()
        {
            return _context.ClassImages;

        }



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


        [HttpGet("{id}")]
        public ActionResult DownloadImage(int id)
        {
                var ClassImageInfo = _context.ClassImages.Find(id);

                if (ClassImageInfo == null)
                    return NotFound();

            byte[] imageData = ClassImageInfo.Data;
            string imageContentType = ClassImageInfo.ContentType;
            string imageName = ClassImageInfo.Name;

            return File(imageData, imageContentType, imageName);
        }

        [HttpDelete("{id}")]
        public ActionResult<ClassImage> DeleteClassImage(int id)
        {
            var ClassImageDescription = _context.ClassImages.Find(id);
            if (ClassImageDescription == null)
                return NotFound();

            _context.ClassImages.Remove(ClassImageDescription);
            _context.SaveChanges();

            return ClassImageDescription;
        }






    }
}
