using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Web.Mvc;
using Microsoft.AspNetCore.Http;
namespace FileUploadDatabase.Controllers
{
    public class HomeController : Controller
    {
        public bool Infile(IFormFile imgfile)
        {
            return (imgfile != null && imgfile.Length > 0) ? true : false;
        }
        public ActionResult Index()
        {
            foreach (string Save in Request.Files)
            {
                if (!Infile(Request.Files[Save])) continue;
                string fileType = Request.Files[Save].ContentType;
                Stream file_Strm = Request.Files[Save].InputStream;
                string file_Name = Path.GetFileName(Request.Files[Save].FileName);
                int fileSize = Request.Files[Save].ContentLength;
                byte[] fileRcrd = new byte[fileSize];
                file_Strm.Read(fileRcrd, 0, fileSize);
                const string connect = @"Server=.;Database=Demo; User Id=sa; password=wintellect;";
                using (var conn = new SqlConnection(connect))
                {
                    var qry = "INSERT INTO Datafile (Filerecord, Filetype, Name)VALUES (@Filerecord, @Filetype, @Name)";
                    var cmd = new SqlCommand(qry, conn);
                    cmd.Parameters.AddWithValue("@Filerecord", fileRcrd);
                    cmd.Parameters.AddWithValue("@Filetype", fileType);
                    cmd.Parameters.AddWithValue("@Name", file_Name);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
            }
            return View();
        }
        public ActionResult DownloadImage()
        {
            const string connect = @"Server=.;Database=Demo;User id=sa;password=wintellect;";
            List<string> fileList = new List<string>();
            using (var con = new SqlConnection(connect))
            {
                var query = "SELECT Filerecord, Filetype,Name FROM Datafile";
                var cmd = new SqlCommand(query, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    fileList.Add(rdr["Name"].ToString());
                }
            }
            ViewBag.Images = fileList;
            return View();
        }
        public FileContentResult GetFile(int id)
        {
            SqlDataReader rdr;
            byte[] fileContent = null;
            string fileType = "";
            string file_Name = "";
            const string connect = @"Server=.;Database=Demo;User id=sa;password=wintellect;";
            using (var con = new SqlConnection(connect))
            {
                var query = "SELECT Filerecord, Filetype, Name FROM Datafile WHERE ID = @ID";
                var cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@ID", id);
                con.Open();
                rdr = cmd.ExecuteReader();
                if (rdr.HasRows)
                {
                    rdr.Read();
                    fileContent = (byte[])rdr["Filerecord"];
                    fileType = rdr["Filetype"].ToString();
                    file_Name = rdr["Name"].ToString();
                }
            }
            return File(fileContent, fileType, file_Name);
        }
    }
}