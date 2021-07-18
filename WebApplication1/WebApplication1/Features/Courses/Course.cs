using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using WebApplication1.Features.FileSetup;
using WebApplication1.Features.Auth;
using WebApplication1.Features.Courses;

namespace WebApplication1.Features.Classes
{
    public class Course
    {
        [Key]
        public int ClassId { get; set; }
        public string ClassName { get; set; }
        public string ClassDescription { get; set; }
        public string ClassOwner { get; set; }
        [NotMapped]
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        [NotMapped]
        public virtual ICollection<Notebook> Notebooks { get; set; } = new List<Notebook>();

        public int InfoFileId { get; set; }
        public virtual ICollection<InfoFile> CourseFiles { get; set; } = new List<InfoFile>();
        public virtual ICollection<Enrollment> Users { get; set; } = new List<Enrollment>();
    }
}
