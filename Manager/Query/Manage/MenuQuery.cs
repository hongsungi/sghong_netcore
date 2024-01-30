namespace Manager.Query.Manage
{
    public class MenuQuery
    {
        public string select_admin_menu_Depth1_For_Use()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag " +
                "from           admin_menus " +
                "where          menupcode = '0000' " +
                "and            menuuseflag = 'Y'" +
                "order by       menudispnum ASC, menucode ASC; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_Depth1_For_All()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag " +
                "from           admin_menus " +
                "where          menupcode = '0000' " +
                "order by       menudispnum ASC, menucode ASC; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_Depth2_by_menupcode_For_Use()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode " +
                "and            menuuseflag = 'Y'" +
                "order by       menudispnum ASC, menucode ASC; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_Depth2_by_menupcode_For_All()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode " +
                "order by       menudispnum ASC, menucode ASC; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_Depth2_For_All_NoPCode()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menupcode != '0000' " +
                "order by       menudispnum ASC, menucode ASC; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_by_menuUrl()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menuurl LIKE CONCAT('%', @menuUrl, '%') " +
                "and            menuuseflag = 'Y' " +
                "limit          1; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_by_menuUrl_Like_Count()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               IFNULL(COUNT(menucode), 0) as menucount " +
                "from           admin_menus " +
                "where          menuurl LIKE CONCAT('%', @menuUrl, '%') " +
                "and            menucode != @menuCode; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_by_menupcode_For_Max_menucode()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               IFNULL(MAX(menucode), 0) as maxcode " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_by_menupcode_For_Max_menudispnum()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               IFNULL(MAX(menudispnum), 0) + 1 as maxdispnum " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string insert_admin_menu()
        {
            string MySql = "" +
                "insert into admin_menus (" +
                "            menucode," +
                "            menupcode," +
                "            menuname," +
                "            menuurl," +
                "            menudispnum," +
                "            menuuseflag," +
                "            menuchoice" +
                "       ) values (" +
                "            @menucode," +
                "            @menupcode," +
                "            @menuname," +
                "            @menuurl," +
                "            @menudispnum," +
                "            @menuuseflag," +
                "            @menuchoice" +
                "       )";
            return MySql;
        }

        public string select_admin_menu_by_menuPCode_menuCode()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode " +
                "and            menucode = @menuCode; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string update_admin_menu()
        {
            string MySql = "" +
                "update admin_menus set " +
                "           menuname = @menuname, " +
                "           menuurl = @menuurl, " +
                "           menuuseflag = @menuuseflag, " +
                "           menuchoice = @menuchoice " +
                "where      menucode = @menucode " +
                "and        menupcode = @menupcode ";
            return MySql;
        }

        public string delete_admin_menu()
        {
            string MySql = "" +
                "delete " +
                "from       admin_menus " +
                "where      menupcode = @menuPCode " +
                "and        menucode = @menuCode";
            return MySql;
        }

        public string select_admin_menu_by_menupcode_For_displaynum_Up()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode " +
                "and            menudispnum < @displayNum " +
                "order by       menudispnum desc " +
                "limit          1; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_by_menupcode_For_displaynum_Down()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode, menupcode, menuname, menuurl, menudispnum, menuuseflag, menuchoice " +
                "from           admin_menus " +
                "where          menupcode = @menuPCode " +
                "and            menudispnum > @displayNum " +
                "order by       menudispnum asc " +
                "limit          1; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string update_admin_menu_For_displayNum()
        {
            string MySql = "" +
                "update admin_menus set " +
                "           menudispnum = @displayNum " +
                "where      menucode = @menucode " +
                "and        menupcode = @menupcode ";
            return MySql;
        }

        public string select_admin_menu_by_list_For_menuAuth()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               menucode as menucode2, menupcode as menucode1, menuname as menuname2, " +
                "               (select menuname from admin_menus as t where admin_menus.menupcode = t.menucode and t.menupcode = '0000') as menuname1, " +
                "               (select IFNULL(COUNT(groupcode), 0) from admin_groups where groupread LIKE CONCAT('%', admin_menus.menucode, '%') and groupcode != '1000') as readgroupcount, " +
                "               (select IFNULL(COUNT(groupcode), 0) from admin_groups where groupwrite LIKE CONCAT('%', admin_menus.menucode, '%') and groupcode != '1000') as writegroupcount, " +
                "               (select IFNULL(COUNT(adminid), 0) from admins as a inner join admin_groups as b on a.groupcode = b.groupcode where b.groupread LIKE CONCAT('%', admin_menus.menucode, '%') and a.delflag = 'N' and a.groupcode != '1000') as readusercount, " +
                "               (select IFNULL(COUNT(adminid), 0) from admins as a inner join admin_groups as b on a.groupcode = b.groupcode where b.groupwrite LIKE CONCAT('%', admin_menus.menucode, '%') and a.delflag = 'N' and a.groupcode != '1000') as writeusercount " +
                "from           admin_menus " +
                "where          menupcode != '0000' " +
                "order by       menupcode asc, menudispnum asc, menucode asc; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }
    }
}
