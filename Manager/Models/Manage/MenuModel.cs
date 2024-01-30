namespace Manager.Models.Manage
{
    public class MenuModel
    {
        public string? menucode { get; set; }
        public string? menupcode { get; set; }
        public string? menuname { get; set; }
        public string? menuurl { get; set; }
        public int menudispnum { get; set; }
        public string? menuuseflag { get; set; }
        public string? menuchoice { get; set; }
    }

    public class MenuListModel
    {
        public List<MenuModel>? Depth1List { get; set; }
        public List<MenuModel>? Depth2List { get; set; }
    }

    public class MenuAuthModel
    {
        public string? menucode1 { get; set; }
        public string? menuname1 { get; set; }
        public string? menucode2 { get; set; }
        public string? menuname2 { get; set; }
        public int readgroupcount { get; set; }
        public int readusercount { get; set; }
        public int writegroupcount { get; set; }
        public int writeusercount { get; set; }
    }

    public class MenuAuthListModel
    {
        public List<MenuAuthModel>? MenuAuthList { get; set; }
    }
}
