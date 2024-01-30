using Manager.Common;
using Manager.Models;
using Manager.Request;
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