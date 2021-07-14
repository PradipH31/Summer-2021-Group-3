using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using WebApplication1.Features.FileSetup;
using WebApplication1.Features.Auth;

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
        public virtual ICollection<InfoFile> CourseFiles { get; set; } = new List<InfoFile>();
        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
