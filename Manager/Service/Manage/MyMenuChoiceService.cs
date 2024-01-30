using Manager.Common;
using Manager.Models.Manage;
using Manager.Query.Manage;
using Manager.Request.Manage;
using MySql.Data.MySqlClient;
using System.Data;
using System.Text;
using System.Transactions;

namespace Manager.Service.Manage
{
    public class MyMenuChoiceService
    {
        private readonly MyMenuChoiceQuery myMenuChoiceQuery;

        public MyMenuChoiceService()
        {
            this.myMenuChoiceQuery = new MyMenuChoiceQuery();
        }

        public string getMenuChoice(string mid)
        {
            string menuChoice = "";

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(myMenuChoiceQuery.select_admin_menu_choice_by_adminId(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminId", mid));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    StringBuilder sb = new StringBuilder();
                    while (dr.Read())
                    {
                        sb.Append(dr["menucode"].ToString()).Append(",");
                    }
                    if (sb.Length > 0)
                    {
                        menuChoice = sb.Remove(sb.Length - 1, 1).ToString();
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return menuChoice;
        }

        public void delete_MenuChoiceMenuCodeAll(string menuCode)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(myMenuChoiceQuery.delete_admin_menu_choice_by_menucode_For_All(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@menucode", menuCode));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
        }

        public string insert_MyMenu(MyMenuChoiceAddDeleteRequest myMenuChoiceAddDeleteRequest)
        {
            int existcount = 0;
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(myMenuChoiceQuery.select_admin_menu_choice_by_adminid_menucode_for_count(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                    cmd.Parameters.Add(new MySqlParameter("@menucode", myMenuChoiceAddDeleteRequest.menucode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        existcount = Convert.ToInt32(dr[0]);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            if (existcount > 0)
            {
                return "FAIL|||||이미 등록된 메뉴 입니다.";
            }

            int dispNum = 0;
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(myMenuChoiceQuery.select_admin_menu_choice_by_adminid_for_dispnum_max(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        dispNum = Convert.ToInt32(dr[0]);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(myMenuChoiceQuery.insert_admin_menu_choice(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                        cmd.Parameters.Add(new MySqlParameter("@menucode", myMenuChoiceAddDeleteRequest.menucode));
                        cmd.Parameters.Add(new MySqlParameter("@dispnum", dispNum));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
            Func.SetCookie("menuchoice", getMenuChoice(Func.GetCookie("adminid")));

            return "OK|||||";
        }

        public List<MyMenuChoiceModel> getList()
        {
            List<MyMenuChoiceModel> myMenuChoiceList = new List<MyMenuChoiceModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(myMenuChoiceQuery.select_admin_menu_choice_by_adminId(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminId", Func.GetCookie("adminid")));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MyMenuChoiceModel myMenuChoice = new MyMenuChoiceModel();
                        myMenuChoice.menucode = dr["menucode"].ToString();
                        myMenuChoice.menuname = dr["menuname"].ToString();
                        myMenuChoice.menuurl = dr["menuurl"].ToString();
                        myMenuChoiceList.Add(myMenuChoice);

                    }
                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return myMenuChoiceList;
        }

        public string delete_MyMenu(MyMenuChoiceAddDeleteRequest myMenuChoiceAddDeleteRequest)
        {
            int dispNum = 0;
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(myMenuChoiceQuery.select_admin_menu_choice_by_adminId_menucode(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                    cmd.Parameters.Add(new MySqlParameter("@menucode", myMenuChoiceAddDeleteRequest.menucode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        dispNum = Convert.ToInt32(dr["dispnum"]);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(myMenuChoiceQuery.update_admin_menu_choice_for_dispnum_down(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                        cmd.Parameters.Add(new MySqlParameter("@dispnum", dispNum));

                        cmd.ExecuteNonQuery();
                    }

                    using (var cmd = new MySqlCommand(myMenuChoiceQuery.delete_admin_menu_choice_by_adminid_menucode(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                        cmd.Parameters.Add(new MySqlParameter("@menucode", myMenuChoiceAddDeleteRequest.menucode));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
            Func.SetCookie("menuchoice", getMenuChoice(Func.GetCookie("adminid")));

            return "OK|||||";
        }

        public string update_MyMenu_DispNum(MyMenuChoiceDispNumUpdateRequest myMenuChoiceDispNumUpdateRequest)
        {
            int now_dispnum = 0;
            string now_menucode = "";
            int chg_dispnum = 0;
            string chg_menucode = "";

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(myMenuChoiceQuery.select_admin_menu_choice_by_adminId_menucode(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                    cmd.Parameters.Add(new MySqlParameter("@menucode", myMenuChoiceDispNumUpdateRequest.menucode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        now_dispnum = Convert.ToInt32(dr["dispnum"]);
                        now_menucode = dr["menucode"].ToString();
                    }

                    dr.Close();
                }

                string query = "";
                if (myMenuChoiceDispNumUpdateRequest.udType.Equals("U"))
                {
                    query = myMenuChoiceQuery.select_admin_menu_choice_by_adminid_for_dispnum_up();
                }
                else
                {
                    query = myMenuChoiceQuery.select_admin_menu_choice_by_adminid_for_dispnum_down();
                }
                using (var cmd = new MySqlCommand(query, dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                    cmd.Parameters.Add(new MySqlParameter("@dispnum", now_dispnum));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        chg_dispnum = Convert.ToInt32(dr["dispnum"]);
                        chg_menucode = dr["menucode"].ToString();
                    }

                    dr.Close();
                }
                dbcon.Close();
                dbcon.Dispose();
            }

            if (chg_dispnum > 0)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                    {
                        dbcon.Open();

                        using (var cmd = new MySqlCommand(myMenuChoiceQuery.update_admin_menu_choice_for_dispnum_chg(), dbcon))
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                            cmd.Parameters.Add(new MySqlParameter("@menucode", now_menucode));
                            cmd.Parameters.Add(new MySqlParameter("@dispnum", chg_dispnum));

                            cmd.ExecuteNonQuery();
                        }

                        using (var cmd = new MySqlCommand(myMenuChoiceQuery.update_admin_menu_choice_for_dispnum_chg(), dbcon))
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.Parameters.Add(new MySqlParameter("@adminid", Func.GetCookie("adminid")));
                            cmd.Parameters.Add(new MySqlParameter("@menucode", chg_menucode));
                            cmd.Parameters.Add(new MySqlParameter("@dispnum", now_dispnum));

                            cmd.ExecuteNonQuery();
                        }

                        ts.Complete();

                        dbcon.Close();
                        dbcon.Dispose();
                    }
                }
            }

            return "OK|||||" + chg_menucode;
        }
    }
}
