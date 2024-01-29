using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Manager.Common
{
    public class MessageConfig
    {
        public static ContentResult AlertMessage(string strAlert, string Location)
        {
            ContentResult result = new ContentResult();
            result.ContentType = "text/html; charset=utf-8";
            

            if (Location.Equals("ajax"))
            {
                result.Content = "FAIL|||||" + strAlert;
            }
            else
            {
                if (strAlert == "")
                {
                    result.Content = "<script>" + Location + "</script>";
                }
                else
                {
                    result.Content = "<script>alert('" + strAlert + "');" + Location + "</script>";
                }
            }

            return result;
        }
    }
}
