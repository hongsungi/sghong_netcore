using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Manager.Common
{
    public class Func
    {
        public static string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits
                //for each byte
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }


        public static string AESEncrypt(string val)
        {
            string retVal = "";
            AES aes = new AES();
            if (val != null && val != "")
            {
                try
                {
                    retVal = aes.Encrypt(val);
                }
                catch
                {
                    retVal = "";
                }
            }
            return retVal;
        }
        public static string AESDecrypt(string val)
        {
            string retVal = "";
            AES aes = new AES();
            if (val != null && val != "")
            {
                try
                {
                    retVal = aes.Decrypt(val);
                }
                catch
                {
                    retVal = "";
                }
            }
            return retVal;
        }


        public static string Base64Encode(string data)
        {
            try
            {
                byte[] encData_byte = new byte[data.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(data);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception e)
            {
                throw new Exception("Error in Base64Encode: " + e.Message);
            }
        }
        public static string Base64Decode(string data)
        {
            try
            {
                System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
                System.Text.Decoder utf8Decode = encoder.GetDecoder();

                byte[] todecode_byte = Convert.FromBase64String(data);
                int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);

                char[] decoded_char = new char[charCount];
                utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);

                string result = new String(decoded_char);
                return result;
            }
            catch (Exception e)
            {
                throw new Exception("Error in Base64Decode: " + e.Message);
            }
        }

        public static string Sha512_Encrypt(string strValue)
        {
            SHA512 sha = new SHA512Managed();
            byte[] hash = sha.ComputeHash(Encoding.ASCII.GetBytes(strValue));
            StringBuilder stringBuilder = new StringBuilder();
            foreach (byte b in hash)
            {
                stringBuilder.AppendFormat("{0:x2}", b);
            }
            return stringBuilder.ToString();
        }

        public static string GetNow()
        {
            return System.DateTime.Now.ToString("yyyyMMddHHmmss");
        }

        public static string getRequestQueryStringToString(string Name)
        {
            IHttpContextAccessor context = new HttpContextAccessor();

            string strReturnValue = context.HttpContext.Request.Query[Name].ToString();

            if (strReturnValue == null)
            {
                strReturnValue = "";
            }

            return strReturnValue;
        }

        public static string GetUserIP()
        {
            string retIP = "";

            IHttpContextAccessor context = new HttpContextAccessor();

            if (context.HttpContext.Request.Headers != null)
            {
                var forwardedHeader = context.HttpContext.Request.Headers["X-Forwarded-For"];
                if (!Microsoft.Extensions.Primitives.StringValues.IsNullOrEmpty(forwardedHeader))
                {
                    retIP = forwardedHeader;
                }
            }

            if (retIP.Equals("") && context.HttpContext.Connection.RemoteIpAddress != null)
            {
                retIP = context.HttpContext.Connection.RemoteIpAddress.ToString();
            }

            return retIP.Replace("::1", "192.168.0.1").Replace("::ffff:", "");
        }

        public static void SetCookie(string cookieName, string cookieValue, int cookieExpiresDay = 0)
        {
            AES aes = new AES();

            IHttpContextAccessor context = new HttpContextAccessor();

            if (cookieExpiresDay.ToString() != "0")
            {
                CookieOptions cookieOptions = new CookieOptions();
                cookieOptions.Expires = DateTime.Now.AddDays(cookieExpiresDay);
                context.HttpContext.Response.Cookies.Append(cookieName, aes.Encrypt(WebUtility.UrlEncode(cookieValue)), cookieOptions);
            }
            else
            {
                context.HttpContext.Response.Cookies.Append(cookieName, aes.Encrypt(WebUtility.UrlEncode(cookieValue)));
            }

        }

        public static string GetCookie(string cookieName)
        {
            string cookieValue = "";
            IHttpContextAccessor context = new HttpContextAccessor();
            if (context.HttpContext.Request.Cookies[cookieName] != null && context.HttpContext.Request.Cookies[cookieName] != "")
            {
                AES aes = new AES();
                cookieValue = WebUtility.UrlDecode(aes.Decrypt(context.HttpContext.Request.Cookies[cookieName]));
            }

            return cookieValue;
        }

        public static void SetSesion(string sessionName, string sessionValue)
        {
            HttpContextAccessor context = new HttpContextAccessor();
            context.HttpContext.Session.SetString(sessionName, sessionValue);
        }

        public static string GetSession(string sessionName)
        {
            HttpContextAccessor context = new HttpContextAccessor();
            if (context.HttpContext.Session.GetString(sessionName) != null)
            {
                return context.HttpContext.Session.GetString(sessionName);
            }
            else
            {
                return "";
            }
        }

        public static string getPageType(string thisPage)
        {
            IHttpContextAccessor context = new HttpContextAccessor();
            var forwardedHeader = context.HttpContext.Request.Headers["x-requested-with"];
            if (!Microsoft.Extensions.Primitives.StringValues.IsNullOrEmpty(forwardedHeader) && forwardedHeader.Equals("XMLHttpRequest"))
            {
                return "ajax";
            }
            else
            {
                if (thisPage.Contains("/popup"))
                {
                    return "popup";
                }
                else
                {
                    return "general";
                }
            }
        }

        public static string getReturnPageType(string thisPage)
        {
            IHttpContextAccessor context = new HttpContextAccessor();
            var forwardedHeader = context.HttpContext.Request.Headers["x-requested-with"];
            if (!Microsoft.Extensions.Primitives.StringValues.IsNullOrEmpty(forwardedHeader) && forwardedHeader.Equals("XMLHttpRequest"))
            {
                return "ajax";
            }
            else
            {
                if (thisPage.Contains("/popup"))
                {
                    return "window.close();";
                }
                else
                {
                    return "history.back();";
                }
            }
        }

        public static string ArrayToStringForComma(string[] array)
        {
            String result = "";

            if (array.Length > 0)
            {
                StringBuilder sb = new StringBuilder();

                foreach (string s in array)
                {
                    sb.Append(s).Append(",");
                }

                result = sb.Remove(sb.Length - 1, 1).ToString();
            }

            return result;
        }

        public static string Left(string str, int len)
        {
            if (str.Length < len)
            {
                len = str.Length;
            }
            return str.Substring(0, len);
        }

        public static string Right(string str, int len)
        {
            if (str.Length < len)
            {
                len = str.Length;
            }
            return str.Substring(str.Length - len);
        }

        public static string MaketoZero(string str, int len)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < len + 1; i++)
            {
                sb.Append("0");
            }
            sb.Append(str);
            str = Right(sb.ToString(), len);
            return str;
        }

        public static string ArrarytoStringForComma(string[] array)
        {
            String result = "";

            if (array.Length > 0)
            {
                StringBuilder sb = new StringBuilder();

                foreach (string s in array)
                {
                    sb.Append(s).Append(",");
                }

                result = sb.Remove(sb.Length - 1, 1).ToString();
            }

            return result;
        }
    }
}
