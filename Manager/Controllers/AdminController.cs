using Microsoft.AspNetCore.Mvc;

namespace Manager.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
