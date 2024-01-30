using Manager.Models.Manage;

namespace Manager.Models.Auth
{
    public class PermissionModel
    {
        public string? MenuCode1 { get; set; }
        public string? MenuCode2 { get; set; }
        public bool isWrite { get; set; }
        public string? MenuChoice { get; set; }
        public List<MenuModel>? TopMenuList { get; set; }
        public List<MenuModel>? LeftMenuList { get; set; }
        public string? TopMenuName { get; set; }
        public string? LeftMenuName { get; set; }
    }
}
