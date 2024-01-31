using Manager.Common;
using Manager.Models.Manage;
using Manager.Request.Manage;
using Manager.Service.Manage;
using Microsoft.AspNetCore.Mvc;
using System.Text;

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

        [HttpPost, ValidateAntiForgeryToken]
        [Route("manage/menu/add")]
        public IActionResult AddOk(MenuAddRequest menuAddRequest)
        {
            string result = menuService.insertMenu(menuAddRequest);
            if (result.Equals("OK"))
            {
                return MessageConfig.AlertMessage("추가 되었습니다.", "location.replace('/manage/menu/list');");

            }
            else
            {
                return MessageConfig.AlertMessage(result, "history.back();");
            }
        }

        [HttpGet]
        [Route("manage/menu/modify/{menuPCode}/{menuCode}")]
        public IActionResult Modify(string menuPCode, string menuCode)
        {
            MenuModel menuModel = menuService.getMenuInfo(menuPCode, menuCode);

            return View(menuModel);
        }

        [HttpPost, ValidateAntiForgeryToken]
        [Route("manage/menu/modify")]
        public IActionResult ModifyOk(MenuModifyRequest menuModifyRequest)
        {
            string result = menuService.updateMenu(menuModifyRequest);
            if (result.Equals("OK"))
            {
                return MessageConfig.AlertMessage("수정 되었습니다.", "location.replace('/manage/menu/modify/" + menuModifyRequest.menuPCode + "/" + menuModifyRequest.menuCode + "');");
            }
            else
            {
                return MessageConfig.AlertMessage(result, "history.back();");
            }
        }


        [HttpPost, ValidateAntiForgeryToken]
        [Route("manage/menu/delete")]
        public IActionResult DeleteOk(MenuDeleteRequest menuDeleteRequest)
        {
            string result = menuService.deleteMenu(menuDeleteRequest);
            if (result.Equals("OK"))
            {
                string retUrl = "/manage/menu/list";
                if (!menuDeleteRequest.menuPCode.Equals("0000"))
                {
                    retUrl += "/" + menuDeleteRequest.menuPCode;
                }
                return MessageConfig.AlertMessage("삭제 되었습니다.", "location.replace('" + retUrl + "');");
            }
            else
            {
                return MessageConfig.AlertMessage(result, "history.back();");
            }
        }

        [HttpPost, ValidateAntiForgeryToken]
        [Route("manage/menu/dispnummodify")]
        public IActionResult updateDisplayNum(MenuDisplayNumModifyRequest menuDisplayNumModifyRequest)
        {
            string result = menuService.updateMenuDisplayNum(menuDisplayNumModifyRequest);
            if (result.Equals("OK"))
            {
                string retUrl = "/manage/menu/list";
                if (!menuDisplayNumModifyRequest.menuPCode.Equals("0000"))
                {
                    retUrl += "/" + menuDisplayNumModifyRequest.menuPCode;
                }
                return MessageConfig.AlertMessage("", "location.replace('" + retUrl + "');");
            }
            else
            {
                return MessageConfig.AlertMessage(result, "history.back();");
            }
        }

        [HttpGet]
        [Route("manage/menu/ajax/getmcode2list")]
        public void menuDepth2List()
        {
            string MenuPCode = Func.getRequestQueryStringToString("MCode1");
            List<MenuModel> menuList = menuService.getMenuDepth2ForUse(MenuPCode);
            StringBuilder MenuCode = new StringBuilder();
            StringBuilder MenuName = new StringBuilder();

            foreach (MenuModel menuModel in menuList)
            {
                MenuCode.Append(menuModel.menucode).Append(",");
                MenuName.Append(menuModel.menuname).Append(",");
            }

            MenuCode.Remove(MenuCode.Length - 1, 1);
            MenuName.Remove(MenuName.Length - 1, 1);

            Response.WriteAsync("OK|||||" + MenuCode + "|||||" + MenuName);
        }
    }
}
