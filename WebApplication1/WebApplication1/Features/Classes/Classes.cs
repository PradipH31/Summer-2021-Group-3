using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Features.Classes
{
	public class Classes
	{
		public int Id { get; set; }
		public string ClassName { get; set; }
		public string ClassDescription { get; set; }
		public string ClassOwner { get; set; }
		public string Grade { get; set; }
        public DateTime CreatedDate { get; set; }
		public string ImageURL { get; set; }

	}
}
