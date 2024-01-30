using Microsoft.AspNetCore.Mvc;

namespace Manager.Controllers
{
    public class SharedController : Controller
    {
        public IActionResult Header()
        {
            return View();
        }
    }
}
