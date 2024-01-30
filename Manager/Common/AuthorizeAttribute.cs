using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Web;

namespace Manager.Common
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            string sProgID = context.HttpContext.Request.Path;
            string thisPage = context.HttpContext.Request.Path;
            string returnPageType = Func.getReturnPageType(thisPage);
            string pageType = Func.getPageType(thisPage);

            if (string.IsNullOrEmpty(Func.GetCookie("adminid")))
            {
                string sProgQueryString;
                try
                {
                    sProgQueryString = context.HttpContext.Request.QueryString.ToString();
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
                    context.Result = MessageConfig.AlertMessage("로그인 정보가 없습니다.", returnPageType);
                }
                else
                {
                    context.Result = MessageConfig.AlertMessage("로그인 정보가 없습니다.", "");
                    return;
                }                
            }
            else
            {
                context.Result = MessageConfig.AlertMessage("로그인 정보가 없습니다.", "");
            }
        }
    }
}
