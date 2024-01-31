namespace Manager.Common
{
    public class SetInfo
    {
        public const string dbconn = "Data Source=192.168.0.84; Initial Catalog=ShoeMarker_Shop_2023; User Id=sa; Password=dltkdgns1!;";
        public const string m_dbconn = "Server=192.168.0.84;Port=3306;Database=eshop;Uid=root;Pwd=shleeshlee1!;";

        public const string domain = "http://127.0.0.1";

        public const string fileUploadRealRoot = @"D:\Web\coreManager\upload";
        public const string fielUploadWebRoot = "/upload";

        public static readonly int[] productimagesize = { 60, 150, 300, 500, 800 };
        public static readonly int[] productsubimagesize = { 150, 300, 500 };
    }
}
