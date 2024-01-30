namespace Manager.Query.Manage
{
    public class AdminQuery
    {
        public string select_by_adminId_for_group()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               a.adminid, a.adminname, a.adminpwd, a.groupcode, a.authflag, a.pwderrcnt, a.hp, b.groupwrite, b.groupread " +
                    "from           admins as a " +
                    "inner join     admin_groups as b on a.groupcode = b.groupcode " +
                    "where          adminid = @adminId " +
                    "and            a.delflag = 'N'; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string login_insert()
        {
            string MySql = "" +
                    "insert into admin_logins ( " +
                    "           adminid, " +
                    "           ip" +
                    "        ) values ( " +
                    "           @adminId, " +
                    "           @ip" +
                    "        )";
            return MySql;
        }

        public string update_for_login_success()
        {
            string MySql = "" +
                    "update admins set " +
                    "       pwderrcnt = 0, " +
                    "       updateid = @adminId, " +
                    "       updateip = @ip, " +
                    "       updatedt = now() " +
                    "where adminid = @adminId";
            return MySql;
        }

        public string update_for_login_fail()
        {
            string MySql = "" +
                "update admins set " +
                "       pwderrcnt = pwderrcnt + 1, " +
                "       updateid = @adminId, " +
                "       updateip = @ip, " +
                "       updatedt = now() " +
                "where adminid = @adminId";
            return MySql;
        }

        public string select_admin_by_groupcode()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               a.adminid, a.adminname, a.adminpwd, a.groupcode, a.hp, a.authflag, a.pwderrcnt, a.createdt, " +
                    "               b.groupname, b.groupwrite, b.groupread " +
                    "from           admins as a " +
                    "inner join     admin_groups as b on a.groupcode = b.groupcode " +
                    "where          a.groupcode = @groupcode " +
                    "and            a.delflag = 'N'; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_by_list_for_totalcount()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               IFNULL(COUNT(adminid), 0) as totalcount " +
                    "from           admins " +
                    "where          delflag = 'N' " +
                    "#where; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_by_list()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               adminid, adminname, adminpwd, groupcode, hp, authflag, pwderrcnt, createdt " +
                    "from           admins " +
                    "where          delflag = 'N' " +
                    "#where " +
                    "order by       createdt desc " +
                    "limit          @startlimit, @endlimit; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_by_adminid_for_count()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               IFNULL(COUNT(adminid), 0) as admincount " +
                    "from           admins " +
                    "where          adminid = @adminid; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string insert_admin()
        {
            string MySql = "" +
                    "insert into admins ( " +
                    "           adminid, " +
                    "           groupcode, " +
                    "           adminname, " +
                    "           adminpwd, " +
                    "           hp, " +
                    "           createid, " +
                    "           createip " +
                    "        ) values ( " +
                    "           @adminId, " +
                    "           @groupcode, " +
                    "           @adminname, " +
                    "           @adminpwd, " +
                    "           @hp, " +
                    "           @id, " +
                    "           @ip" +
                    "        )";
            return MySql;
        }

        public string select_admin_by_adminid()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               adminid, adminpwd, groupcode, adminname, hp, authflag, pwderrcnt, " +
                    "               createid, createip, createdt, updateid, updateip, updatedt " +
                    "from           admins " +
                    "where          adminid = @adminid; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string update_admin_for_groupcode()
        {
            string MySql = "" +
                "update admins set " +
                "       groupcode = @groupcode, " +
                "       updateid = @id, " +
                "       updateip = @ip, " +
                "       updatedt = now() " +
                "where adminid = @adminId";
            return MySql;
        }

        public string update_admin_for_pwd()
        {
            string MySql = "" +
                "update admins set " +
                "       adminpwd = @adminpwd, " +
                "       updateid = @id, " +
                "       updateip = @ip, " +
                "       updatedt = now() " +
                "where adminid = @adminId";
            return MySql;
        }

        public string update_admin_for_hp()
        {
            string MySql = "" +
                "update admins set " +
                "       hp = @hp, " +
                "       sdupinfo = '', " +
                "       authflag = 'N', " +
                "       authdate = null, " +
                "       updateid = @id, " +
                "       updateip = @ip, " +
                "       updatedt = now() " +
                "where adminid = @adminId";
            return MySql;
        }

        public string update_admin_for_groupcode_adminname()
        {
            string MySql = "" +
                "update admins set " +
                "       groupcode = @groupcode, " +
                "       adminname = @adminname, " +
                "       updateid = @id, " +
                "       updateip = @ip, " +
                "       updatedt = now() " +
                "where adminid = @adminId";
            return MySql;
        }

        public string update_admin_for_delflag()
        {
            string MySql = "" +
                "update admins set " +
                "       delflag = 'Y', " +
                "       updateid = @id, " +
                "       updateip = @ip, " +
                "       updatedt = now() " +
                "where adminid = @adminId";
            return MySql;
        }


        public string select_admin_login_by_list_for_totalcount()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               IFNULL(COUNT(idx), 0) as totalcount " +
                    "from           admin_logins " +
                    "where          adminid = @adminid; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_login_by_list()
        {
            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               adminid, ip, logindt " +
                    "from           admin_logins " +
                    "where          adminid = @adminid " +
                    "order by       idx desc " +
                    "limit          @startlimit, @endlimit; " +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_by_list_for_group_search(string authType)
        {
            string groupWhere = "";
            if (authType.Equals("R"))
            {
                groupWhere = "and b.groupread LIKE CONCAT('%', @MCode2, '%'); ";
            }
            else
            {
                groupWhere = "and b.groupwrite LIKE CONCAT('%', @MCode2, '%'); ";
            }

            string MySql = "" +
                    "set session transaction isolation level read uncommitted; " +
                    "select " +
                    "               a.adminid, a.adminname, a.hp, a.createdt, b.groupname " +
                    "from           admins as a " +
                    "inner join     admin_groups as b on a.groupcode = b.groupcode " +
                    "where          a.groupcode != '1000' " +
                    "and            a.delflag = 'N' " +
                    "" + groupWhere +
                    "set session transaction isolation level repeatable read;";
            return MySql;
        }
    }
}
