using Manager.Common;
using Manager.Query.Manage;
using Manager.Request;
using System.Data;
using System.Transactions;
using MySql.Data.MySqlClient;

namespace Manager.Service.Manage
{
    public class AdminService
    {
        private readonly AdminQuery adminQuery;
        private readonly MyMenuChoiceService myMenuChoiceService;

        public AdminService()
        {
            this.adminQuery = new AdminQuery();
            this.myMenuChoiceService = new MyMenuChoiceService();
        }


        public string LoginProc(LoginRequest loginRequest)
        {
            string adminid;
            string adminname;
            string adminpwd;
            string groupcode;
            string authflag;
            int pwderrcnt;
            string hp;
            string groupwrite;
            string groupread;

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(adminQuery.select_by_adminId_for_group(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@adminId", loginRequest.mid));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        adminid = dr["adminid"].ToString();
                        adminname = dr["adminname"].ToString();
                        adminpwd = dr["adminpwd"].ToString();
                        groupcode = dr["groupcode"].ToString();
                        authflag = dr["authflag"].ToString();
                        pwderrcnt = Convert.ToInt32(dr["pwderrcnt"].ToString()) + 1;
                        hp = dr["hp"].ToString();
                        groupwrite = dr["groupwrite"].ToString();
                        groupread = dr["groupread"].ToString();
                    }
                    else
                    {
                        dr.Close();
                        dbcon.Close();
                        dbcon.Dispose();

                        return "아이디와 비밀번호를 다시 확인 하여 주세요.";
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            if (!Func.Sha512_Encrypt(loginRequest.mpwd).Equals(adminpwd))
            {
                if (pwderrcnt <= 5)
                {
                    LoginForPwdErrorUpdate(loginRequest.mid);
                    return "비밀번호가 " + pwderrcnt + "번 틀렸습니다. 5번 틀리면 계정이 잠깁니다.";
                }
                else
                {
                    return "비밀번호가 5번 틀렸습니다. 관리자에게 문의 하시기 바랍니다.";
                }
            }

            Func.SetCookie("adminid", adminid);
            Func.SetCookie("adminname", adminname);
            Func.SetCookie("admingroup", groupcode);
            Func.SetCookie("menuchoice", myMenuChoiceService.getMenuChoice(loginRequest.mid));
            Func.SetCookie("ip", Func.GetUserIP());

            if (!string.IsNullOrEmpty(loginRequest.saveid) && loginRequest.saveid.Equals("Y"))
            {
                Func.SetCookie("saveid", loginRequest.saveid, 365);
                Func.SetCookie("saveadminid", loginRequest.mid, 365);
            }
            else
            {
                Func.SetCookie("saveid", "", -1);
                Func.SetCookie("saveadminid", "", -1);
            }

            LoginSuccess(loginRequest.mid);
            return "OK";
        }

        public void LoginForPwdErrorUpdate(string mid)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(adminQuery.update_for_login_fail(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@adminId", mid));
                        cmd.Parameters.Add(new MySqlParameter("@ip", Func.GetUserIP()));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
        }

        public void LoginSuccess(string mid)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(adminQuery.update_for_login_success(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@adminId", mid));
                        cmd.Parameters.Add(new MySqlParameter("@ip", Func.GetUserIP()));

                        cmd.ExecuteNonQuery();
                    }

                    using (var cmd = new MySqlCommand(adminQuery.login_insert(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@adminId", mid));
                        cmd.Parameters.Add(new MySqlParameter("@ip", Func.GetUserIP()));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }
        }
    }
}
