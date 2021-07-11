using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Features;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotebookJHController : ControllerBase
    {
        private readonly DataContext _context;

        public NotebookJHController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Notebooks
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Notebook>>> GetNotebookJH(int id)
        {
            return await _context.Notebook
                .Where(n => n.ClassId == id)
                .Select(n => new Notebook()
                {
                    NotebookId = n.NotebookId,
                    GithubLink = n.GithubLink,
                    Title = n.Title,
                    Description = n.Description,
                    ClassId = n.ClassId,
                    CreatedDate = n.CreatedDate,
                    JupyterHubLink = getJupyter(n.GithubLink)
                })
                .OrderBy(n => n.CreatedDate)
                .ToListAsync();
        }
        [NonAction]
        public static string getJupyter(string link)
        {
            string Try = link.Replace("/blob/master", "");
            int direct = link.IndexOf("/blob/master/");
            string repo = Try.Substring(19, direct - 19).Replace("/", "%2F");
            string file = Try.Substring(direct + 1).Replace("/", "%2F");
            string retLink = "localhost:12000/hub/user-redirect/git-pull?repo=https:%2F%2Fgithub.com%2F" + repo + "&subPath=" + file + "&app=lab";
            return retLink;
        }
    }
}
