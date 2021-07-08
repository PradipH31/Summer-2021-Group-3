using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Features.Classes;

namespace WebApplication1.Features
{
    public class Notebook
    {
        public int NotebookId { get; set; }
        public string GithubLink { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ClassId { get; set; }
        public Class Class { get; set; }
        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }
    }
}
