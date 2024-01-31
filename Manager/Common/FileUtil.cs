using Manager.Models;
using Microsoft.AspNetCore.Components.Forms;
using System.Drawing;
using System.Runtime.InteropServices;
using static System.Net.Mime.MediaTypeNames;

namespace Manager.Common
{
    public class FileUtil
    {
        [DllImport(@"urlmon.dll", CharSet = CharSet.Auto)]
        private extern static System.UInt32 FindMimeFromData(
                System.UInt32 pBC,
                [MarshalAs(UnmanagedType.LPStr)] System.String pwzUrl,
                [MarshalAs(UnmanagedType.LPArray)] byte[] pBuffer,
                System.UInt32 cbSize,
                [MarshalAs(UnmanagedType.LPStr)] System.String pwzMimeProposed,
                System.UInt32 dwMimeFlags,
                out System.UInt32 ppwzMimeOut,
                System.UInt32 dwReserverd
        );

        public static string getMimeFromFile(string filename)
        {
            if (!File.Exists(filename))
                //throw new FileNotFoundException(filename + " not found");
                return filename + " not found";

            byte[] buffer = new byte[256];
            using (FileStream fs = new FileStream(filename, FileMode.Open))
            {
                if (fs.Length >= 256)
                    fs.Read(buffer, 0, 256);
                else
                    fs.Read(buffer, 0, (int)fs.Length);
            }
            try
            {
                System.UInt32 mimetype;
                FindMimeFromData(0, null, buffer, 256, null, 0, out mimetype, 0);
                System.IntPtr mimeTypePtr = new IntPtr(mimetype);
                string mime = Marshal.PtrToStringUni(mimeTypePtr);
                Marshal.FreeCoTaskMem(mimeTypePtr);
                return mime;
            }
            catch (Exception e)
            {
                return "unknown/unknown";
            }
        }

        public static string getMimeFromUploadFile(IFormFile uploadFile)
        {
            BinaryReader br = new BinaryReader(uploadFile.OpenReadStream());
            byte[] binData = br.ReadBytes(256);

            try
            {
                System.UInt32 mimetype;
                FindMimeFromData(0, null, binData, 256, null, 0, out mimetype, 0);
                System.IntPtr mimeTypePtr = new IntPtr(mimetype);
                string mime = Marshal.PtrToStringUni(mimeTypePtr);
                Marshal.FreeCoTaskMem(mimeTypePtr);
                return mime;
            }
            catch (Exception e)
            {
                return "unknown/unknown";
            }
        }

        public static bool validFileMimeType(IFormFile uploadFile, string mimeType)
        {
            List<string> typeList = new List<string>();
            List<string> extentionList = new List<string>();
            switch (mimeType)
            {
                case "images":
                    typeList.Add("image/jpeg");
                    typeList.Add("image/pjpeg");
                    typeList.Add("image/gif");
                    typeList.Add("image/png");
                    typeList.Add("image/x-png");
                    typeList.Add("image/bmp");
                    typeList.Add("image/x-windows-bmp");

                    extentionList.Add("jpeg");
                    extentionList.Add("jpg");
                    extentionList.Add("gif");
                    extentionList.Add("png");
                    extentionList.Add("bmp");
                    break;
                case "xls":
                    typeList.Add("application/octet-stream");
                    typeList.Add("application/x-zip-compressed");

                    extentionList.Add("xls");
                    extentionList.Add("xlsx");
                    break;
                default:
                    typeList.Add("image/jpeg");
                    typeList.Add("image/pjpeg");
                    typeList.Add("image/gif");
                    typeList.Add("image/png");
                    typeList.Add("image/x-png");
                    typeList.Add("image/bmp");
                    typeList.Add("image/x-windows-bmp");
                    typeList.Add("application/octet-stream");
                    typeList.Add("application/x-zip-compressed");
                    typeList.Add("application/pdf");

                    extentionList.Add("jpeg");
                    extentionList.Add("jpg");
                    extentionList.Add("gif");
                    extentionList.Add("png");
                    extentionList.Add("bmp");
                    extentionList.Add("xls");
                    extentionList.Add("xlsx");
                    extentionList.Add("ppt");
                    extentionList.Add("pptx");
                    extentionList.Add("pdf");
                    extentionList.Add("zip");
                    break;
            }

            string mime = getMimeFromUploadFile(uploadFile);
            string ext = uploadFile.FileName.Substring(uploadFile.FileName.LastIndexOf(".")).ToLower().Replace(".", "");

            return typeList.Contains(mime) && extentionList.Contains(ext);
        }

        public static string uploadFile(IFormFile uploadFile, string subDir)
        {
            if (uploadFile.Length > 0)
            {
                string saveFileName = generateSaveFileName(uploadFile.FileName);
                string today = DateTime.Now.ToString("yyyyMMdd");
                string uploadRealPath;
                string uploadWebPath;
                if (string.IsNullOrEmpty(subDir))
                {
                    uploadRealPath = SetInfo.fileUploadRealRoot + @"\" + today;
                    uploadWebPath = SetInfo.fielUploadWebRoot + "/" + today + "/" + saveFileName;
                }
                else
                {
                    uploadRealPath = SetInfo.fileUploadRealRoot + @"\" + subDir + @"\" + today;
                    uploadWebPath = SetInfo.fielUploadWebRoot + "/" + subDir + "/" + today + "/" + saveFileName;
                }

                makeDir(uploadRealPath);

                string uploadFilePath = Path.Combine(uploadRealPath, saveFileName);
                using (var stream = System.IO.File.Create(uploadFilePath))
                {
                    uploadFile.CopyToAsync(stream);
                }

                return uploadWebPath;
            }
            else
            {
                return "";
            }            
        }

        public static string generateSaveFileName(string fileName)
        {
            string uuid = Guid.NewGuid().ToString().ToLower().Replace("-", "");
            string ext = fileName.Substring(fileName.LastIndexOf(".")).ToLower();
            return uuid + ext;
        }

        public static void makeDir(string path)
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(path);
            if (!directoryInfo.Exists)
            {
                directoryInfo.Create();
            }
        }

        public static bool deleteFile(string fileName)
        {
            //fileName = HttpContext.Current.Server.MapPath(fileName);
            string delFileName = fileName.Replace("/upload", SetInfo.fileUploadRealRoot);
            if (File.Exists(delFileName))
            {
                File.Delete(delFileName);
                return true;
            }
            return false;
        }

        public static string createThumbnail(string fileName, int width, int height)
        {
            string path = fileName.Substring(0, fileName.LastIndexOf("/"));
            string orginFileName = fileName.Substring(fileName.LastIndexOf("/") + 1);
            string thumbnailPath = path + "/thumb";
            string thumbnailPathName = thumbnailPath + "/" + generateSaveFileName(orginFileName);
            makeDir(thumbnailPath);

         

            return thumbnailPathName;
        }

    }
}
