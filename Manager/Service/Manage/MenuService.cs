using Manager.Common;
using Manager.Models.Manage;
using Manager.Query.Manage;
using Manager.Request.Manage;
using MySql.Data.MySqlClient;
using System.Data;
using System.Transactions;

namespace Manager.Service.Manage
{
    public class MenuService
    {
        private readonly MenuQuery menuQuery;
        private readonly MyMenuChoiceService myMenuChoiceService;
        

        public MenuService()
        {
            this.menuQuery = new MenuQuery();
            this.myMenuChoiceService = new MyMenuChoiceService();
        }

        public List<MenuModel> getMenuDepth1ForUse()
        {
            List<MenuModel> menuModelList = new List<MenuModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_Depth1_For_Use(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MenuModel menuModel = new MenuModel();
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();

                        menuModelList.Add(menuModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return menuModelList;
        }

        public MenuModel getMenuInfoByMenuUrl(string menuurl)
        {
            MenuModel menuModel = new MenuModel();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_by_menuUrl(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menuUrl", menuurl));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();
                        menuModel.menuchoice = dr["menuchoice"].ToString();
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            return menuModel;
        }

        public List<MenuModel> getMenuDepth2ForUse(string menuPcode)
        {
            List<MenuModel> menuModelList = new List<MenuModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_Depth2_by_menupcode_For_Use(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menuPCode", menuPcode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MenuModel menuModel = new MenuModel();
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();
                        menuModel.menuchoice = dr["menuchoice"].ToString();

                        menuModelList.Add(menuModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return menuModelList;
        }

        public List<MenuModel> getMenuDepth1ForAll()
        {
            List<MenuModel> menuModelList = new List<MenuModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_Depth1_For_All(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MenuModel menuModel = new MenuModel();
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();

                        menuModelList.Add(menuModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return menuModelList;
        }

        public List<MenuModel> getMenuDepth2ForAll(string menuPcode)
        {
            List<MenuModel> menuModelList = new List<MenuModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_Depth2_by_menupcode_For_All(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menuPCode", menuPcode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MenuModel menuModel = new MenuModel();
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();
                        menuModel.menuchoice = dr["menuchoice"].ToString();

                        menuModelList.Add(menuModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return menuModelList;
        }

        public List<MenuModel> getMenuDepth2ForAll()
        {
            List<MenuModel> menuModelList = new List<MenuModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_Depth2_For_All_NoPCode(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MenuModel menuModel = new MenuModel();
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();
                        menuModel.menuchoice = dr["menuchoice"].ToString();

                        menuModelList.Add(menuModel);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }
            return menuModelList;
        }

        public string insertMenu(MenuAddRequest menuAddRequest)
        {
            if (!menuAddRequest.menuPCode.Equals("0000"))
            {
                string menuUrlchk = MenuUrlCheck("0000", menuAddRequest.menuUrl);
                if (!menuUrlchk.Equals("OK"))
                {
                    return menuUrlchk;
                }
            }

            int MaxCode = 0;
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_by_menupcode_For_Max_menucode(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menuPCode", menuAddRequest.menuPCode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        MaxCode = Convert.ToInt32(dr[0].ToString());
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            if (MaxCode == 0)
            {
                MaxCode = Convert.ToInt32(menuAddRequest.menuPCode);
            }

            if (menuAddRequest.menuPCode.Equals("0000"))
            {
                MaxCode += 100;
            }
            else
            {
                MaxCode += 1;
            }

            string menucode = Func.MaketoZero(MaxCode.ToString(), 4);

            int MaxDispNum = 0;
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_by_menupcode_For_Max_menudispnum(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menuPCode", menuAddRequest.menuPCode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        MaxDispNum = Convert.ToInt32(dr[0].ToString());
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

                    using (var cmd = new MySqlCommand(menuQuery.insert_admin_menu(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@menucode", menucode));
                        cmd.Parameters.Add(new MySqlParameter("@menupcode", menuAddRequest.menuPCode));
                        cmd.Parameters.Add(new MySqlParameter("@menuname", menuAddRequest.menuName));
                        cmd.Parameters.Add(new MySqlParameter("@menuurl", menuAddRequest.menuUrl));
                        cmd.Parameters.Add(new MySqlParameter("@menudispnum", MaxDispNum));
                        cmd.Parameters.Add(new MySqlParameter("@menuuseflag", "Y"));
                        cmd.Parameters.Add(new MySqlParameter("@menuchoice", "N"));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }

            return "OK";
        }

        public MenuModel getMenuInfo(string menuPCode, string menuCode)
        {
            MenuModel menuModel = new MenuModel();
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_by_menuPCode_menuCode(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menupcode", menuPCode));
                    cmd.Parameters.Add(new MySqlParameter("@menucode", menuCode));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        menuModel.menucode = dr["menucode"].ToString();
                        menuModel.menupcode = dr["menupcode"].ToString();
                        menuModel.menuname = dr["menuname"].ToString();
                        menuModel.menuurl = dr["menuurl"].ToString();
                        menuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                        menuModel.menuuseflag = dr["menuuseflag"].ToString();
                        menuModel.menuchoice = dr["menuchoice"].ToString();
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            return menuModel;
        }

        public string updateMenu(MenuModifyRequest menuModifyRequest)
        {
            if (!menuModifyRequest.menuPCode.Equals("0000"))
            {
                string result = MenuUrlCheck(menuModifyRequest.menuCode, menuModifyRequest.menuUrl);
                if (!result.Equals("OK"))
                {
                    return result;
                }
            }

            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(menuQuery.update_admin_menu(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@menucode", menuModifyRequest.menuCode));
                        cmd.Parameters.Add(new MySqlParameter("@menupcode", menuModifyRequest.menuPCode));
                        cmd.Parameters.Add(new MySqlParameter("@menuname", menuModifyRequest.menuName));
                        cmd.Parameters.Add(new MySqlParameter("@menuurl", menuModifyRequest.menuUrl));
                        cmd.Parameters.Add(new MySqlParameter("@menuuseflag", menuModifyRequest.menuUseFlag));
                        cmd.Parameters.Add(new MySqlParameter("@menuchoice", menuModifyRequest.menuChoice));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }

            return "OK";
        }

        public string deleteMenu(MenuDeleteRequest menuDeleteRequest)
        {
            if (menuDeleteRequest.menuPCode.Equals("0000"))
            {
                if (getMenuDepth2ForAll(menuDeleteRequest.menuCode).Count > 0)
                {
                    return "하위 메뉴가 있어 삭제 할 수 없습니다.";
                }
            }

            using (TransactionScope ts = new TransactionScope())
            {
                using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                {
                    dbcon.Open();

                    using (var cmd = new MySqlCommand(menuQuery.delete_admin_menu(), dbcon))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.Add(new MySqlParameter("@menucode", menuDeleteRequest.menuCode));
                        cmd.Parameters.Add(new MySqlParameter("@menupcode", menuDeleteRequest.menuPCode));

                        cmd.ExecuteNonQuery();
                    }

                    ts.Complete();

                    dbcon.Close();
                    dbcon.Dispose();
                }
            }

            if (menuDeleteRequest.menuPCode.Equals("0000"))
            {
                myMenuChoiceService.delete_MenuChoiceMenuCodeAll(menuDeleteRequest.menuCode);
            }

            return "OK";
        }

        public string updateMenuDisplayNum(MenuDisplayNumModifyRequest menuDisplayNumModifyRequest)
        {
            MenuModel menuModel = getMenuInfo(menuDisplayNumModifyRequest.menuPCode, menuDisplayNumModifyRequest.menuCode);
            if (menuModel != null)
            {
                string Query = "";
                switch (menuDisplayNumModifyRequest.udType)
                {
                    case "U":
                        Query = menuQuery.select_admin_menu_by_menupcode_For_displaynum_Up();
                        break;
                    case "D":
                        Query = menuQuery.select_admin_menu_by_menupcode_For_displaynum_Down();
                        break;
                }

                if (!string.IsNullOrEmpty(Query))
                {
                    MenuModel otherMenuModel = new MenuModel();
                    using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                    {
                        dbcon.Open();

                        using (var cmd = new MySqlCommand(Query, dbcon))
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.Parameters.Add(new MySqlParameter("@menupcode", menuModel.menupcode));
                            cmd.Parameters.Add(new MySqlParameter("@displayNum", menuModel.menudispnum));

                            MySqlDataReader dr = cmd.ExecuteReader();

                            if (dr.Read())
                            {
                                otherMenuModel.menucode = dr["menucode"].ToString();
                                otherMenuModel.menupcode = dr["menupcode"].ToString();
                                otherMenuModel.menudispnum = Convert.ToInt32(dr["menudispnum"].ToString());
                            }

                            dr.Close();
                        }

                        dbcon.Close();
                        dbcon.Dispose();
                    }

                    if (!string.IsNullOrEmpty(otherMenuModel.menucode))
                    {
                        using (TransactionScope ts = new TransactionScope())
                        {
                            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
                            {
                                dbcon.Open();

                                using (var cmd = new MySqlCommand(menuQuery.update_admin_menu_For_displayNum(), dbcon))
                                {
                                    cmd.CommandType = CommandType.Text;
                                    cmd.Parameters.Add(new MySqlParameter("@menucode", menuModel.menucode));
                                    cmd.Parameters.Add(new MySqlParameter("@menupcode", menuModel.menupcode));
                                    cmd.Parameters.Add(new MySqlParameter("@displayNum", otherMenuModel.menudispnum));

                                    cmd.ExecuteNonQuery();
                                }

                                using (var cmd = new MySqlCommand(menuQuery.update_admin_menu_For_displayNum(), dbcon))
                                {
                                    cmd.CommandType = CommandType.Text;
                                    cmd.Parameters.Add(new MySqlParameter("@menucode", otherMenuModel.menucode));
                                    cmd.Parameters.Add(new MySqlParameter("@menupcode", otherMenuModel.menupcode));
                                    cmd.Parameters.Add(new MySqlParameter("@displayNum", menuModel.menudispnum));

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
            else
            {
                return "등록 되지 않은 메뉴 입니다.";
            }

            return "OK";
        }

        public List<MenuAuthModel> getMenuAuthList()
        {
            List<MenuAuthModel> menuAuthList = new List<MenuAuthModel>();

            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_by_list_For_menuAuth(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;

                    MySqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        MenuAuthModel menuAuth = new MenuAuthModel();
                        menuAuth.menucode1 = dr["menucode1"].ToString();
                        menuAuth.menuname1 = dr["menuname1"].ToString();
                        menuAuth.menucode2 = dr["menucode2"].ToString();
                        menuAuth.menuname2 = dr["menuname2"].ToString();
                        menuAuth.readgroupcount = Convert.ToInt32(dr["readgroupcount"].ToString());
                        menuAuth.readusercount = Convert.ToInt32(dr["readusercount"].ToString());
                        menuAuth.writegroupcount = Convert.ToInt32(dr["writegroupcount"].ToString());
                        menuAuth.writeusercount = Convert.ToInt32(dr["writeusercount"].ToString());
                        menuAuthList.Add(menuAuth);
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            return menuAuthList;
        }

        public string MenuUrlCheck(string menuCode, string menuUrl)
        {
            if (!menuCode.Equals("0000") && !Func.Left(menuUrl, 1).Equals("/"))
            {
                return "URL 경로는 `/` 로 시작되어야 합니다.";
            }

            string[] MenuUrl = menuUrl.Split('/');
            if (MenuUrl.Length < 3)
            {
                return "메뉴 URL 경로를 /class/method/action 형식으로 작성하여 주세요.";
            }

            int MenuUrlCount = 0;
            using (MySqlConnection dbcon = new MySqlConnection(SetInfo.m_dbconn))
            {
                dbcon.Open();

                using (var cmd = new MySqlCommand(menuQuery.select_admin_menu_by_menuUrl_Like_Count(), dbcon))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter("@menuCode", menuCode));
                    cmd.Parameters.Add(new MySqlParameter("@menuUrl", "/" + MenuUrl[1] + "/" + MenuUrl[2]));

                    MySqlDataReader dr = cmd.ExecuteReader();

                    if (dr.Read())
                    {
                        MenuUrlCount = Convert.ToInt32(dr[0].ToString());
                    }

                    dr.Close();
                }

                dbcon.Close();
                dbcon.Dispose();
            }

            if (MenuUrlCount > 0)
            {
                return "URL 경로가 이미 사용 중입니다. 확인 해 보시기 바랍니다.";
            }

            return "OK";
        }
    }
}
