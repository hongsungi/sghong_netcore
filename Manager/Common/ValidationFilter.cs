using Microsoft.AspNetCore.Mvc.Filters;

namespace Manager.Common
{
    public class ValidationFilter : ActionFilterAttribute, IActionFilter
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {           
            if (!filterContext.ModelState.IsValid)
            {
                var httpContext = filterContext.HttpContext;
                string thisPage = httpContext.Request.Path;
                string returnPageType = Func.getPageType(thisPage).Equals("ajax") ? "ajax" : "history.back();";

                string errMsg = "";
                List<string> list = (from modelState in filterContext.ModelState.Values from error in modelState.Errors select error.ErrorMessage).ToList();
                foreach (string error in list)
                {
                    errMsg = error.ToString();
                }
                
                filterContext.Result = MessageConfig.AlertMessage(errMsg, returnPageType);
            }
            base.OnActionExecuting(filterContext);
        }
    }
}
