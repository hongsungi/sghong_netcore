using Manager.Common;
using Manager.Models.Manage;
using Manager.Query.Manage;
using Manager.Request.Manage;
using MySql.Data.MySqlClient;
using System.Data;
using System.Transactions;

namespace Manager.Service.Manage
{
    public class AdminGroupService
    {
        private AdminGroupQuery adminGroupQuery;

        public AdminGroupService()
        {
            this.adminGroupQuery = new AdminGroupQuery();
        }

        public AdminGroupModel getInfoByGroupCode(int groupCode)
        {
            AdminGroupModel adminGroupModel = new AdminGroupModel();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(adminGroupQuery.select_admin_group_by_groupcode(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@groupcode", groupCode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        adminGroupModel.groupcode = Convert.ToInt32(dr["groupcode"].ToString());
                        adminGroupModel.groupname = dr["groupname"].ToString();
                        adminGroupModel.groupdesc = dr["groupdesc"].ToString();
                        adminGroupModel.groupwrite = dr["groupwrite"].ToString();
                        adminGroupModel.groupread = dr["groupread"].ToString();
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            return adminGroupModel;
        }

        public List<AdminGroupModel> getList()
        {
            List<AdminGroupModel> adminGroupModelList = new List<AdminGroupModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(adminGroupQuery.select_admin_group_by_list(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        AdminGroupModel adminGroupModel = new AdminGroupModel();
                        adminGroupModel.groupcode = Convert.ToInt32(dr["groupcode"].ToString());
                        adminGroupModel.groupname = dr["groupname"].ToString();
                        adminGroupModel.groupdesc = dr["groupdesc"].ToString();
                        adminGroupModel.admincnt = Convert.ToInt32(dr["admincnt"].ToString());
                        adminGroupModelList.Add(adminGroupModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            return adminGroupModelList;
        }

        public void insertAdminGroup(AdminGroupRequest adminGroupRequest)
        {
            string mainWrite = "";
            if (adminGroupRequest.main_write != null)
            {
                mainWrite = Func.ArrarytoStringForComma(adminGroupRequest.main_write);
            }

            string mainRead = "";
            if (adminGroupRequest.main_read != null)
            {
                mainRead = Func.ArrarytoStringForComma(adminGroupRequest.main_read);
            }

            string subWrite = "";
            if (adminGroupRequest.sub_write != null)
            {
                subWrite = Func.ArrarytoStringForComma(adminGroupRequest.sub_write);
            }

            string subRead = "";
            if (adminGroupRequest.sub_read != null)
            {
                subRead = Func.ArrarytoStringForComma(adminGroupRequest.sub_read);
            }

            if (!string.IsNullOrEmpty(mainWrite))
            {
                mainWrite = mainWrite + "," + subWrite;
            }

            if (!string.IsNullOrEmpty(mainRead))
            {
                mainRead = mainRead + "," + subRead;
            }

            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    int groupcode = 0;
                    using (var cmd = new MySqlCommand(adminGroupQuery.select_admin_group_for_groupcode_max(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;

                        MySqlDataReader dr = cmd.ExecuteReader();

                        if (dr.Read())
                        {
                            groupcode = Convert.ToInt32(dr[0]);
                        }

                        dr.Close();
                    }

                    using (var cmd = new MySqlCommand(adminGroupQuery.insert_admin_group(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@groupcode", groupcode));
                        cmd.Parameters.Add(new MySqlParameter("@groupname", adminGroupRequest.groupname));
                        cmd.Parameters.Add(new MySqlParameter("@groupdesc", adminGroupRequest.groupdesc));
                        cmd.Parameters.Add(new MySqlParameter("@groupwrite", mainWrite));
                        cmd.Parameters.Add(new MySqlParameter("@groupread", mainRead));
                        cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                        cmd.Parameters.Add(new MySqlParameter("@adminip", Func.GetCookie("ip")));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
        }

        public void updateAdminGroup(int groupcode, AdminGroupRequest adminGroupRequest)
        {
            string mainWrite = "";
            if (adminGroupRequest.main_write != null)
            {
                mainWrite = Func.ArrarytoStringForComma(adminGroupRequest.main_write);
            }

            string mainRead = "";
            if (adminGroupRequest.main_read != null)
            {
                mainRead = Func.ArrarytoStringForComma(adminGroupRequest.main_read);
            }

            string subWrite = "";
            if (adminGroupRequest.sub_write != null)
            {
                subWrite = Func.ArrarytoStringForComma(adminGroupRequest.sub_write);
            }

            string subRead = "";
            if (adminGroupRequest.sub_read != null)
            {
                subRead = Func.ArrarytoStringForComma(adminGroupRequest.sub_read);
            }

            if (!string.IsNullOrEmpty(mainWrite))
            {
                mainWrite = mainWrite + "," + subWrite;
            }

            if (!string.IsNullOrEmpty(mainRead))
            {
                mainRead = mainRead + "," + subRead;
            }

            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(adminGroupQuery.update_admin_group(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@groupcode", groupcode));
                        cmd.Parameters.Add(new MySqlParameter("@groupname", adminGroupRequest.groupname));
                        cmd.Parameters.Add(new MySqlParameter("@groupdesc", adminGroupRequest.groupdesc));
                        cmd.Parameters.Add(new MySqlParameter("@groupwrite", mainWrite));
                        cmd.Parameters.Add(new MySqlParameter("@groupread", mainRead));
                        cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                        cmd.Parameters.Add(new MySqlParameter("@adminip", Func.GetCookie("ip")));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
        }

        public void deleteAdminGroup(int groupcode)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(adminGroupQuery.delete_admin_group(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@groupcode", groupcode));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
        }

        public List<AdminGroupModel> getListForAdminList(AdminMenuAuthRequest adminMenuAuthRequest)
        {
            List<AdminGroupModel> adminGroupList = new List<AdminGroupModel>();
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(adminGroupQuery.select_admin_group_by_list_for_adminlist_group_search(adminMenuAuthRequest.authType), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@MCode2", adminMenuAuthRequest.MCode2));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        AdminGroupModel adminGroupModel = new AdminGroupModel();
                        adminGroupModel.groupcode = Convert.ToInt32(dr["groupcode"].ToString());
                        adminGroupModel.groupname = dr["groupname"].ToString();
                        adminGroupModel.groupdesc = dr["groupdesc"].ToString();
                        adminGroupModel.admincnt = Convert.ToInt32(dr["admincnt"].ToString());
                        adminGroupModel.createdt = Convert.ToDateTime(dr["createdt"]);
                        adminGroupList.Add(adminGroupModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            return adminGroupList;
        }
    }
}
