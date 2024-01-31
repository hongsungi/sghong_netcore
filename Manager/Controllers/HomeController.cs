using Manager.Common;
using Manager.Models;
using Manager.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Manager.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [AuthorizeFilter]
        [HttpGet]
        [Route("/")]
        public IActionResult Index()
        {
            return View();
        }

        [AutoValidateAntiforgeryToken]
        [Route("home/test2")]
        public void Test2()
        {
            Response.WriteAsync("OK");
        }

        [Route("test1")]
        public void Test1()
        {
            Response.WriteAsync(Request.Path);
            Response.WriteAsync(Request.QueryString.ToString());
        }

        [ValidationFilter, ValidateAntiForgeryToken]
        [HttpPost]
        [Route("test")]
        public void Test(LoginRequest loginRequest)
        {
            Response.WriteAsync(loginRequest.mid + "------::------");            
            Response.WriteAsync(loginRequest.mpwd + "------::------");
        }

        [HttpGet]
        [Route("test3")]
        public IActionResult fileUp()
        {
            return View();
        }

        [HttpPost, ValidateAntiForgeryToken]
        [Route("test3")]
        public void fileUpOk(IFormFile FileName)
        {
            Response.WriteAsync(FileUtil.validFileMimeType(FileName, "xls").ToString());
            //Response.WriteAsync(FileName.FileName + "____");
            //Response.WriteAsync(FileName.ContentType + "____");
            //Response.WriteAsync(FileName.Length + "____");
            //Response.WriteAsync(FileUtil.uploadFile(FileName, "aaaa"));
            //Response.WriteAsync(FileUtil.uploadFile(FileName, "soterm"));
            //Response.WriteAsync(Path.GetFullPath("/upload/aaaa/20240131/0e5c92317764406992f27cb203966bc2.xls".Replace("/upload", SetInfo.fileUploadRealRoot)));
            //Response.WriteAsync(FileUtil.deleteFile("/upload/aaaa/20240131/0e5c92317764406992f27cb203966bc2.xls").ToString());




        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}