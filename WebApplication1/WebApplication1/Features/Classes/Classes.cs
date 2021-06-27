using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebApplication1.Features.Classes
{
	public class Classes
	{
		public int Id { get; set; }
		public string ClassName { get; set; }
		public string ClassDescription { get; set; }
		public string ClassOwner { get; set; }
		public string ImageName { get; set; }
		[NotMapped]
		public IFormFile ImageFile { get; set; }
	}
}
