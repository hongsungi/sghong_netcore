namespace Manager.Models.Manage
{
    public class AdminGroupModel
    {
        public int groupcode { get; set; }
        public string? groupname { get; set; }
        public string? groupdesc { get; set; }
        public string? groupwrite { get; set; }
        public string? groupread { get; set; }
        public int admincnt { get; set; }
        public DateTime createdt { get; set; }
    }

    public class AdminGroupListModel
    {
        public List<AdminGroupModel>? AdminGroupList { get; set; }
    }

    public class AdminGroupModifyModel
    {
        public List<MenuModel>? Depth1List { get; set; }
        public List<MenuModel>? Depth2List { get; set; }
        public AdminGroupModel? AdminGroup { get; set; }
    }

    public class AdminGroupInAdminListModel
    {
        public int groupcode { get; set; }
        public List<AdminGroupModel>? AdminGroupList { get; set; }
        public List<AdminModel>? AdminList { get; set; }
    }
}
