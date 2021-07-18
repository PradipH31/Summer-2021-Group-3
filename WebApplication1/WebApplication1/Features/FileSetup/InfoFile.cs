using WebApplication1.Features.Classes;

namespace WebApplication1.Features.FileSetup
{
    public class InfoFile
    {
        public int InfoFileId { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public string Content { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }

     }
}
