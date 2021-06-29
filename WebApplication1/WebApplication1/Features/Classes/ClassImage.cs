using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Features.Classes
{
    public class ClassImage
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string ContentType { get; set; }

        public byte[] Data { get; set; }
    }
}
