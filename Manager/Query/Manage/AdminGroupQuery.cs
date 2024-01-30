namespace Manager.Query.Manage
{
    public class AdminGroupQuery
    {
        public string select_admin_group_by_groupcode()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               groupcode, groupname, groupdesc, groupwrite, groupread " +
                "from           admin_groups " +
                "where          groupcode = @groupcode; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_group_by_list()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               groupcode, groupname, groupdesc, " +
                "               (select count(*) from admins where admin_groups.groupcode = admins.groupcode and admins.delflag = 'N') as admincnt " +
                "from           admin_groups " +
                "where          groupcode != '1000'; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_group_by_menucode_in_for_count()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               IFNULL(COUNT(groupcode), 0) as groupcount " +
                "from           admin_groups " +
                "where          groupread LIKE CONCAT('%', #{menucode}, '%') " +
                "or             groupwrite LIKE CONCAT('%', #{menucode}, '%'); " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string select_admin_group_for_groupcode_max()
        {
            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               IFNULL(MAX(groupcode), 1000) + 1 " +
                "from           admin_groups; " +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }

        public string insert_admin_group()
        {
            string MySql = "" +
                "insert into admin_groups ( " +
                "            groupcode, " +
                "            groupname, " +
                "            groupdesc, " +
                "            groupwrite, " +
                "            groupread, " +
                "            createid, " +
                "            createip " +
                ") values ( " +
                "            @groupcode, " +
                "            @groupname, " +
                "            @groupdesc, " +
                "            @groupwrite, " +
                "            @groupread, " +
                "            @adminid, " +
                "            @adminip " +
                ")";
            return MySql;
        }

        public string update_admin_group()
        {
            string MySql = "" +
                "update admin_groups set " +
                "            groupname = @groupname, " +
                "            groupdesc = @groupdesc, " +
                "            groupwrite = @groupwrite, " +
                "            groupread = @groupread, " +
                "            updateid = @adminid, " +
                "            updateip = @adminip " +
                "where groupcode = @groupcode ";
            return MySql;
        }

        public string delete_admin_group()
        {
            string MySql = "" +
                "delete from admin_groups " +
                "where groupcode = @groupcode ";
            return MySql;
        }

        public string select_admin_group_by_list_for_adminlist_group_search(string authType)
        {
            string groupWhere = "";
            if (authType.Equals("R"))
            {
                groupWhere = "and groupread LIKE CONCAT('%', @MCode2, '%'); ";
            }
            else
            {
                groupWhere = "and groupwrite LIKE CONCAT('%', @MCode2, '%'); ";
            }

            string MySql = "" +
                "set session transaction isolation level read uncommitted; " +
                "select " +
                "               groupcode, groupname, groupdesc, createdt," +
                "               (select IFNULL(COUNT(adminid), 0) from admins where groupcode = admin_groups.groupcode and delflag = 'N') as admincnt " +
                "from           admin_groups " +
                "where          groupcode != '1000' " +
                "" + groupWhere +
                "set session transaction isolation level repeatable read;";
            return MySql;
        }
    }
}
