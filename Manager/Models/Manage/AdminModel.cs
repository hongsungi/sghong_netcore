using Manager.Request;
using Manager.Request.Manage;

namespace Manager.Models.Manage
{
    public class AdminModel
    {
        public string? adminid { get; set; }
        public string? adminpwd { get; set; }
        public string? adminname { get; set; }
        public int groupcode { get; set; }
        public string? hp { get; set; }
        public string? authflag { get; set; }
        public int pwderrcnt { get; set; }
        public string? groupname { get; set; }
        public string? groupwrite { get; set; }
        public string? groupread { get; set; }
        public string? createid { get; set; }
        public string? createip { get; set; }
        public DateTime createdt { get; set; }
        public string? updateid { get; set; }
        public string? updateip { get; set; }
        public DateTime updatedt { get; set; }
    }

    public class AdminSearchModel
    {
        public List<AdminModel>? AdminList { get; set; }
        public Pagination? pagination { get; set; }
    }

    public class AdminSearchListModel
    {
        public AdminSearch? Search { get; set; }
        public List<AdminModel>? AdminList { get; set; }
        public List<AdminGroupModel>? AdminGroupList { get; set; }
    }

    public class AdminInfoModel
    {
        public AdminModel? AdminModel { get; set; }
        public List<AdminGroupModel>? AdminGroupList { get; set; }
    }

    public class AdminLoginModel
    {
        public string adminid { get; set; }
        public string? ip { get; set; }
        public DateTime logindt { get; set; }
    }

    public class AdminLoginListModel
    {
        public List<AdminLoginModel>? AdminLoginList { get; set; }
        public Search? Search { get; set; }
    }

    public class MenuAuthGroupListModel
    {
        public AdminMenuAuthRequest? adminMenuAuthRequest { get; set; }
        public List<MenuModel>? Depth1List { get; set; }
        public List<MenuModel>? Depth2List { get; set; }
        public List<AdminGroupModel>? GroupList { get; set; }
    }

    public class MenuAuthAdminListModel
    {
        public AdminMenuAuthRequest? adminMenuAuthRequest { get; set; }
        public List<MenuModel>? Depth1List { get; set; }
        public List<MenuModel>? Depth2List { get; set; }
        public List<AdminModel>? AdminList { get; set; }
    }
}
