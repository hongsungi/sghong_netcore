using Manager.Common;
using Manager.Request;
using Manager.Service.Manage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Controllers
{
    public class LoginController : Controller
    {
        private readonly AdminService adminService;

        public LoginController()
        {
            this.adminService = new AdminService();
        }

        [HttpGet]
        [Route("login")]
        public IActionResult Index()
        {
            return View();
        }

        [Validation, ValidateAntiForgeryToken]
        [HttpPost]
        [Route("login")]
        public IActionResult LoginOk(LoginRequest loginRequest)
        {
            string result = adminService.LoginProc(loginRequest);
            if (result.Equals("OK"))
            {
                if (string.IsNullOrEmpty(loginRequest.ProgID))
                {
                    loginRequest.ProgID = "/";
                }

                Response.Redirect(loginRequest.ProgID);
            }
            return MessageConfig.AlertMessage(result, "history.back();");
        }

        [Route("logout")]
        public void logout()
        {
            Func.SetCookie("adminid", "", -1);
            Func.SetCookie("adminname", "", -1);
            Func.SetCookie("admingroup", "", -1);
            Func.SetCookie("menuchoice", "", -1);
            Func.SetCookie("ip", "", -1);

            Response.Redirect("/");
        }
    }
}
