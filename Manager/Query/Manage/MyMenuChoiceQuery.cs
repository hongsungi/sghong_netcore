namespace Manager.Query.Manage
{
    public class MyMenuChoiceQuery
    {
        public string select_admin_menu_choice_by_adminId()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select      " +
                    "               a.menucode, a.dispnum, b.menuname, b.menuurl " +
                    "from           admin_menu_choices as a " +
                    "inner join     admin_menus as b on a.menucode = b.menucode " +
                    "where          a.adminid = @adminid " +
                    "and            b.menuuseflag = 'Y' " +
                    "and            b.menuchoice = 'Y' " +
                    "order by       a.dispnum ASC; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_choice_by_adminId_menucode()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select      " +
                    "               menucode, dispnum " +
                    "from           admin_menu_choices " +
                    "where          adminid = @adminid " +
                    "and            menucode = @menucode; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string delete_admin_menu_choice_by_menucode_For_All()
        {
            string MySql = "" +
                    "delete " +
                    "from        admin_menu_choices " +
                    "where       menucode = @menuCode";
            return MySql;
        }

        public string select_admin_menu_choice_by_adminid_menucode_for_count()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select      " +
                    "               IFNULL(COUNT(idx), 0) " +
                    "from           admin_menu_choices " +
                    "where          adminid = @adminid " +
                    "and            menucode = @menucode; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_choice_by_adminid_for_dispnum_max()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select      " +
                    "               IFNULL(MAX(dispnum), 0) + 1 " +
                    "from           admin_menu_choices " +
                    "where          adminid = @adminid; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string insert_admin_menu_choice()
        {
            string MySql = "" +
                "insert into admin_menu_choices ( " +
                "       menucode, " +
                "       adminid, " +
                "       dispnum " +
                ") values ( " +
                "       @menucode, " +
                "       @adminid, " +
                "       @dispnum " +
                ")";
            return MySql;
        }

        public string update_admin_menu_choice_for_dispnum_down()
        {
            string MySql = "" +
                "update admin_menu_choices set " +
                "       dispnum = dispnum - 1 " +
                "where  adminid = @adminid " +
                "and    dispnum > @dispnum";
            return MySql;
        }

        public string delete_admin_menu_choice_by_adminid_menucode()
        {
            string MySql = "" +
                "delete " +
                "from       admin_menu_choices " +
                "where      menucode = @menucode " +
                "and        adminid = @adminid";
            return MySql;
        }

        public string select_admin_menu_choice_by_adminid_for_dispnum_up()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select      " +
                    "               menucode, adminid, dispnum " +
                    "from           admin_menu_choices " +
                    "where          adminid = @adminid " +
                    "and            dispnum < @dispnum " +
                    "order by       dispnum desc " +
                    "limit          1; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_menu_choice_by_adminid_for_dispnum_down()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select      " +
                    "               menucode, adminid, dispnum " +
                    "from           admin_menu_choices " +
                    "where          adminid = @adminid " +
                    "and            dispnum > @dispnum " +
                    "order by       dispnum asc " +
                    "limit          1; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string update_admin_menu_choice_for_dispnum_chg()
        {
            string MySql = "" +
                "update admin_menu_choices set " +
                "       dispnum = @dispnum " +
                "where  adminid = @adminid " +
                "and    menucode = @menucode";
            return MySql;
        }
    }
}
