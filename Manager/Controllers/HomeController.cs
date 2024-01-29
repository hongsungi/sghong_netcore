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

        public IActionResult Index()
        {
            Func.SetCookie("wow", "12345");
            ViewBag.wow = Func.GetCookie("wow");

            Func.SetSesion("s", "2222");
            ViewBag.s = Func.GetSession("s");

            //return MessageConfig.AlertMessage("a", "");
            return View();
        }

        [Validation, ValidateAntiForgeryToken]
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