using Manager.Common;
using Manager.Models.Manage;
using Manager.Service.Manage;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Controllers
{
    [AuthorizeFilter, ValidationFilter]
    public class MenuController : Controller
    {
        private readonly MenuService menuService;
        public MenuController()
        {
            this.menuService = new MenuService();
        }

        [HttpGet]
        [Route("manage/menu/list")]
        [Route("manage/menu/list/{menuPCode}")]
        public IActionResult List(string? menuPCode = "")
        {
            List<MenuModel> menuDepth1List = menuService.getMenuDepth1ForAll();
            if (string.IsNullOrEmpty(menuPCode))
            {
                menuPCode = menuDepth1List[0].menucode;
            }

            ViewBag.MenuPCode = menuPCode;

            MenuListModel model = new MenuListModel()
            {
                Depth1List = menuDepth1List,
                Depth2List = menuService.getMenuDepth2ForAll(menuPCode)
            };

            return View(model);
        }
    }
}
