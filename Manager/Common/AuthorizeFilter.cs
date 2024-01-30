using Manager.Models.Auth;
using Manager.Models.Manage;
using Manager.Service.Manage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Web;

namespace Manager.Common
{
    public class AuthorizeFilter : ActionFilterAttribute, IActionFilter
    {
        private readonly AdminGroupService adminGroupService;
        private readonly MenuService menuService;

        public AuthorizeFilter()
        {
            this.adminGroupService = new AdminGroupService();
            this.menuService = new MenuService();
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string sProgID = filterContext.HttpContext.Request.Path;
            string thisPage = filterContext.HttpContext.Request.Path;
            string returnPageType = Func.getReturnPageType(thisPage);
            string pageType = Func.getPageType(thisPage);
            bool isRead = false;
            bool isWrite = false;

            if (string.IsNullOrEmpty(Func.GetCookie("adminid")))
            {
                string sProgQueryString;
                try
                {
                    sProgQueryString = filterContext.HttpContext.Request.QueryString.ToString();
                }
                catch
                {
                    sProgQueryString = "";
                }

                if (sProgQueryString.Length > 0)
                {
                    sProgID = HttpUtility.UrlEncode(sProgID + '?' + sProgQueryString);
                }
                else
                {
                    sProgID = HttpUtility.UrlEncode(sProgID);
                }

                if (returnPageType.Equals("ajax"))
                {
                    filterContext.Result = MessageConfig.AlertMessage("", returnPageType);
                }
                else
                {
                    filterContext.Result = MessageConfig.AlertMessage("", "location.replace('/login?ProgID=" + sProgID + "');");
                }
                //filterContext.HttpContext.Response.Redirect("/login?ProgID=" + sProgID);
                //filterContext.Result = MessageConfig.AlertMessage("로그인 정보가 없습니다.", "");
            }
            else
            {
                if (!Func.GetUserIP().Equals(Func.GetCookie("ip")))
                {
                    filterContext.Result = MessageConfig.AlertMessage("정상적인 접근이 아닙니다.", "location.replace('/login');");
                }

                string adminGroup = Func.GetCookie("admingroup");
                if (string.IsNullOrEmpty(adminGroup))
                {
                    filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                }

                AdminGroupModel adminGroupModel = adminGroupService.getInfoByGroupCode(Convert.ToInt32(adminGroup));
                if (string.IsNullOrEmpty(adminGroupModel.groupread))
                {
                    filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                }

                string[] thisUri = thisPage.Split('/');
                if (thisUri.Length > 2)
                {
                    thisPage = "/" + thisUri[1] + "/" + thisUri[2];
                }
                MenuModel menuModel = menuService.getMenuInfoByMenuUrl(thisPage);

                if (string.IsNullOrEmpty(menuModel.menucode) && !thisPage.Contains("/common"))
                {
                    filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                }
                else
                {
                    if (!string.IsNullOrEmpty(menuModel.menucode))
                    {
                        isRead = adminGroupModel.groupread.Equals("0") || adminGroupModel.groupread.Contains(menuModel.menucode);
                        isWrite = adminGroupModel.groupwrite.Equals("0") || adminGroupModel.groupwrite.Contains(menuModel.menucode);
                    }
                }

                if (filterContext.HttpContext.Request.Method.Equals("GET"))
                {
                    if (thisPage.Equals("/"))
                    {
                        PermissionModel mainPermissionModel = new PermissionModel();
                        mainPermissionModel.MenuCode1 = "0000";
                        mainPermissionModel.MenuCode2 = "0000";
                        mainPermissionModel.isWrite = false;
                        mainPermissionModel.MenuChoice = "N";
                        mainPermissionModel.TopMenuList = getTopMenu(adminGroupModel.groupread);

                        if (filterContext.Controller is Controller mcontroller)
                            mcontroller.ViewBag.Permission = mainPermissionModel;

                        return;
                    }

                    if (thisPage.Contains("/common"))
                    {
                        //return;
                    }

                    if (pageType.Equals("ajax"))
                    {
                        string referer = filterContext.HttpContext.Request.Headers["Referer"].ToString();
                        if (string.IsNullOrEmpty(referer))
                        {
                            filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                        }
                        else
                        {
                            if (!referer.Contains(SetInfo.domain))
                            {
                                filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                            }
                        }
                    }

                    if (!isRead)
                    {
                        filterContext.Result = MessageConfig.AlertMessage("권한이 없습니다.", returnPageType);
                    }

                    PermissionModel permissionModel = new PermissionModel();
                    if (pageType.Equals("general"))
                    {
                        permissionModel.MenuCode1 = menuModel.menupcode;
                        permissionModel.MenuCode2 = menuModel.menucode;
                        permissionModel.MenuChoice = menuModel.menuchoice;
                        permissionModel.isWrite = isWrite;
                        permissionModel.TopMenuList = getTopMenu(adminGroupModel.groupread);
                        permissionModel.LeftMenuList = getLeftMenu(menuModel.menupcode);
                        permissionModel.TopMenuName = getMenuName(menuModel.menupcode, permissionModel.TopMenuList);
                        permissionModel.LeftMenuName = getMenuName(menuModel.menucode, permissionModel.LeftMenuList);
                    }
                    else
                    {
                        permissionModel.MenuCode1 = menuModel.menupcode;
                        permissionModel.MenuCode2 = menuModel.menucode;
                        permissionModel.MenuChoice = menuModel.menuchoice;
                        permissionModel.isWrite = isWrite;
                    }
                    if (filterContext.Controller is Controller controller)
                        controller.ViewBag.Permission = permissionModel;

                    return;
                }
                else
                {
                    string referer = filterContext.HttpContext.Request.Headers["Referer"].ToString();
                    if (string.IsNullOrEmpty(referer))
                    {
                        filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                    }
                    else
                    {
                        if (!referer.Contains(SetInfo.domain))
                        {
                            filterContext.Result = MessageConfig.AlertMessage("유효하지 않은 경로 입니다.", returnPageType);
                        }
                    }

                    if (!isWrite && !thisPage.Contains("/common"))
                    {
                        filterContext.Result = MessageConfig.AlertMessage("권한이 없습니다.", returnPageType);
                    }
                }
            }
            base.OnActionExecuting(filterContext);
        }

        public List<MenuModel> getTopMenu(string groupRead)
        {
            List<MenuModel> topMenuList = new List<MenuModel>();
            foreach (var menu in menuService.getMenuDepth1ForUse())
            {
                if (groupRead.Contains(menu.menucode) || groupRead.Equals("0"))
                {
                    menu.menuurl = getChildMenuUrl(groupRead, menu.menucode);
                    topMenuList.Add(menu);
                }
            }
            return topMenuList;
        }

        public List<MenuModel> getLeftMenu(string menuPCode)
        {
            return menuService.getMenuDepth2ForUse(menuPCode);
        }

        public string getChildMenuUrl(string groupRead, string menuPCode)
        {
            string retUrl = "";

            foreach (var menu in menuService.getMenuDepth2ForUse(menuPCode))
            {
                if (groupRead.Equals("0"))
                {
                    retUrl = menu.menuurl;
                    break;
                }
                else
                {
                    if (groupRead.Contains(menu.menucode))
                    {
                        retUrl = menu.menuurl;
                        break;
                    }
                }
            }

            return retUrl;
        }

        public string getMenuName(string menucode, List<MenuModel> MenuList)
        {
            string retVal = "";

            foreach (var menu in MenuList)
            {
                if (menucode.Equals(menu.menucode))
                {
                    retVal = menu.menuname;
                    break;
                }
            }

            return retVal;
        }

    }
}
