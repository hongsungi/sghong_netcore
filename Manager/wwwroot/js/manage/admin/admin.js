/* 관리자 입력 폼 체크 */
function ins_Admin() {
    /* 아이디 */
    var adminID = alltrim($("#AdminID").val());
    if (adminID.length === 0) {
        alert("아이디를 입력해 주십시오.");
        $("#AdminID").focus();
        return;
    }
    if (!only_AlphaNum(adminID)) {
        alert("아이디를 영문과 숫자로만 입력해 주십시오.");
        $("#AdminID").focus();
        return;
    }

    /* 아이디 중복 체크 */
    var checkIDAvailable = $("#CheckIDAvailable").val();
    if (checkIDAvailable !== "Y") {
        alert("아이디 중복 체크를 해 주십시오.");
        return;
    }
    var checkID = $("#CheckID").val();
    if (checkID !== adminID) {
        alert("아이디 중복 체크를 다시 해 주십시오.");
        return;
    }

    /* 비밀번호 */
    var pwd = alltrim($("#Pwd").val());
    if (pwd.length === 0) {
        alert("비밀번호를 입력해 주십시오.");
        $("#Pwd").focus();
        return;
    }
    if (!only_AlphaNum(pwd)) {
        alert("비밀번호를 영문 또는 숫자로만 입력해 주십시오.");
        $("#Pwd").focus();
        return;
    }

    /* 비밀번호 확인 */
    var pwd1 = alltrim($("#Pwd1").val());
    if (pwd1.length === 0) {
        alert("비밀번호를 다시 한번 입력해 주십시오.");
        $("#Pwd1").focus();
        return;
    }

    if (pwd !== pwd1) {
        alert("비밀번호가 일치하지 않습니다.");
        $("#Pwd1").focus();
        return;
    }

    var groupCode = alltrim($("select[name='groupcode']").val());
    if (groupCode.length === 0) {
        alert("그룹을 선택해 주십시오.");
        $("select[name='GroupCode']").focus();
        return;
    }

    /* 이름 */
    var name = alltrim($("#Name").val());
    if (name.length === 0) {
        alert("이름을 입력해 주십시오.");
        $("#Name").focus();
        return;
    }

    /* 핸드폰번호 */
    var hp1 = alltrim($("#HP1").val());
    if (hp1.length === 0) {
        alert("핸드폰번호를 선택해 주십시오.");
        $("#HP1").focus();
        return;
    }
    var hp2 = alltrim($("#HP2").val());
    if (hp2.length < 3) {
        alert("핸드폰번호를 숫자 3자리 이상 입력해 주십시오.");
        $("#HP2").focus();
        return;
    }
    if (!only_Num(hp2)) {
        alert("핸드폰번호를 숫자로만 입력해 주십시오.");
        $("#HP2").val("");
        $("#HP2").focus();
        return;
    }
    var hp3 = alltrim($("#HP3").val());
    if (hp3.length < 4) {
        alert("핸드폰번호를 숫자 4자리로 입력해 주십시오.");
        $("#HP3").focus();
        return;
    }
    if (!only_Num(hp3)) {
        alert("핸드폰번호를 숫자로만 입력해 주십시오.");
        $("#HP3").val("");
        $("#HP3").focus();
        return;
    }

    var conf = confirm("입력 하시겠습니까?");
    if (conf === true) {
        openPop('loading');
        document.form.submit();
    }
}

/* 아이디 중복 체크 */
function chk_AdminID() {
    var adminID = alltrim($("#AdminID").val());
    if (adminID.length === 0) {
        alert("아이디를 입력하여 주십시오.");
        $("#AdminID").focus();
        return;
    }
    if (!only_AlphaNum(adminID)) {
        alert("아이디를 영문과 숫자로만 입력해 주십시오.");
        $("#AdminID").focus();
        return;
    }

    $.ajax({
        type		 : "post",
        url			 : "/manage/admin/ajax/adminidduplicatecheck",
        async		 : true,
        data		 : "AdminID=" + adminID,
        dataType	 : "text",
        headers: {
            'RequestVerificationToken': getToken()
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result === "OK") {
                $("#ID_Msg").css({ "color": "blue" })
                $("#ID_Msg").text("등록 가능한 아이디 입니다.");
                $("#CheckID").val(adminID);
                $("#CheckIDAvailable").val("Y");
                return;
            }
            else if (result === "EXISTS") {
                $("#ID_Msg").css({ "color": "red" })
                $("#ID_Msg").text("등록 불가능한 아이디 입니다.");
                $("#CheckID").val("");
                $("#CheckIDAvailable").val("");
                return;
            }
            else if (result === "LOGIN") {
                PageReload();
                return;
            }
            else {
                alert(cont);
                return;
            }
        },
        error		 : function (data) {
            alert(data.responseText);
        }
    });
}

/* 단일 관리자 부분 변경 */
function mod_ListOneAdmin(num) {
    var adminID		 = $("input:checkbox[name='AdminID']").eq(num).val();
    var groupCode	 = $("select[name='GroupCode']").eq(num).val();

    var conf = confirm("수정 하시겠습니까?");
    if (conf) {
        mod_ListAdmin(adminID, groupCode);
    }
}


/* 일괄 관리자 부분 변경 */
function mod_ListAllAdmin(num) {
    var adminIDs	 = "";
    var groupCodes	 = "";


    var adminIDCnt = $("input:checkbox[name='AdminID']").length;

    if (adminIDCnt > 0) {
        $("input:checkbox[name='AdminID']").each(function (idx) {
            if ($(this).is(":checked")) {
                if (adminIDs === "") {
                    adminIDs	 = $("input:checkbox[name='AdminID']").eq(idx).val();
                    groupCodes	 = $("select[name='GroupCode']").eq(idx).val();
                }
                else {
                    adminIDs	 = adminIDs		 + "," + $("input:checkbox[name='AdminID']").eq(idx).val();
                    groupCodes	 = groupCodes	 + "," + $("select[name='GroupCode']").eq(idx).val();
                }
            }
        });

        if (adminIDs === "") {
            alert("일괄 수정할 관리자를 선택해 주십시오.");
            return;
        }
        else {
            var conf = confirm("수정 하시겠습니까?");
            if (conf) {
                mod_ListAdmin(adminIDs, groupCodes);
            }
        }
    }
}


/* 관리자 부분 변경 처리 */
function mod_ListAdmin(adminID, groupCode) {
    //location.href = "/ASP/Manage/Admin/Ajax/AdminPartModifyOk.asp?AdminID=" + adminID + "&GroupCode=" + groupCode;
    //return;

    $.ajax({
        type		 : "post",
        url			 : "/manage/admin/ajax/admingroupcodemodify",
        async		 : false,
        data		 : "adminid=" + adminID + "&groupcode=" + groupCode,
        dataType	 : "text",
        headers: {
            'RequestVerificationToken': getToken()
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result === "OK") {
                PageReload();
                return;
            }
            else if (result === "LOGIN") {
                PageReload();
                return;
            }
            else {
                alert(cont);
                return;
            }
        },
        error		 : function (data) {
            alert(data.responseText);
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}


/* 관리자정보 */
function pop_AdminInfo(adminID) {
    window.open("/manage/admin/popup/admininfo/"+adminID, "AdminInfo", "width=1060, height=850, top=10, left=1, scrollbars=yes").focus();
}

/* 관리자 비밀번호 수정 폼 */
function lay_PasswordModifyForm() {
    adminID = $('input[name="adminid"]').val();
    $.ajax({
        type		 : "post",
        url			 : "/manage/admin/ajax/adminpwdmodify/"+adminID,
        async		 : false,
        data		 : "",
        dataType	 : "text",
        headers: {
            'RequestVerificationToken': getToken()
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result === "OK") {
                $("#popup").html(cont);
                $("#popup").css({ 'top': '50%', 'left': '50%', 'width': 640 });
                openPop('popup');
                return;
            }
            else if (result === "LOGIN") {
                PageReload();
                return;
            }
            else {
                alert(data);
                return;
            }
        },
        error		 : function (data) {
            alert(data.responseText);
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}


/* 관리자 비밀번호 수정 체크 */
function lay_PasswordModify() {
    /* 비밀번호 */
    var pwd = alltrim($("#Pwd", "form[name='chgPwdForm']").val());
    if (pwd.length === 0) {
        alert("비밀번호를 입력해 주십시오.");
        $("#Pwd", "form[name='chgPwdForm']").focus();
        return;
    }
    if (!only_AlphaNum(pwd)) {
        alert("비밀번호를 영문 또는 숫자로만 입력해 주십시오.");
        $("#Pwd", "form[name='chgPwdForm']").focus();
        return;
    }

    /* 비밀번호 확인 */
    var pwd1 = alltrim($("#Pwd1").val());
    if (pwd1.length === 0) {
        alert("비밀번호를 다시 한번 입력해 주십시오.");
        $("#Pwd1", "form[name='chgPwdForm']").focus();
        return;
    }

    if (pwd !== pwd1) {
        alert("비밀번호가 일치하지 않습니다.");
        $("#Pwd1", "form[name='chgPwdForm']").focus();
        return;
    }

    var conf = confirm("비밀번호를 수정하시겠습니까?");
    if (conf === true) {
        $.ajax({
            type		 : "post",
            url			 : "/manage/admin/ajax/adminpwdmodify",
            async		 : false,
            data		 : $("#chgPwdForm").serialize(),
            dataType	 : "text",
            headers: {
                'RequestVerificationToken': getToken()
            },
            success: function (data) {
                var splitData	 = data.split("|||||");
                var result		 = splitData[0];
                var cont		 = splitData[1];

                if (result === "OK") {
                    alert("수정 되었습니다.");
                    closePop('popup');
                    return;
                }
                else if (result === "LOGIN") {
                    PageReload();
                    return;
                }
                else {
                    alert(cont);
                    return;
                }
            },
            error		 : function (data) {
                alert(data.responseText);
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}


/* 관리자 핸드폰번호 수정 체크 */
function mod_AdminHP() {
    var o_hp1 = alltrim($("input[name='O_HP1']").val());
    var o_hp2 = alltrim($("input[name='O_HP2']").val());
    var o_hp3 = alltrim($("input[name='O_HP3']").val());


    /* 핸드폰번호 */
    var hp1 = alltrim($("#HP1").val());
    if (hp1.length === 0) {
        alert("핸드폰번호를 선택해 주십시오.");
        $("#HP1").focus();
        return;
    }
    var hp2 = alltrim($("#HP2").val());
    if (hp2.length < 3) {
        alert("핸드폰번호를 숫자 3자리 이상 입력해 주십시오.");
        $("#HP2").focus();
        return;
    }
    if (!only_Num(hp2)) {
        alert("핸드폰번호를 숫자로만 입력해 주십시오.");
        $("#HP2").val("");
        $("#HP2").focus();
        return;
    }
    var hp3 = alltrim($("#HP3").val());
    if (hp3.length < 4) {
        alert("핸드폰번호를 숫자 4자리로 입력해 주십시오.");
        $("#HP3").focus();
        return;
    }
    if (!only_Num(hp3)) {
        alert("핸드폰번호를 숫자로만 입력해 주십시오.");
        $("#HP3").val("");
        $("#HP3").focus();
        return;
    }

    if (o_hp1 === hp1 && o_hp2 === hp2 && o_hp3 === hp3) {
        alert("핸드폰번호를 수정 입력 후 수정 처리해 주십시오.");
        return;
    }

    var conf = confirm("수정 하시겠습니까?");
    if (conf === true) {
        openPop('loading');
        document.form.action = "/manage/admin/adminhpmodify";
        document.form.submit();
    }
}


/* 관리자 수정 폼 체크 */
function mod_Admin() {
    var groupCode = alltrim($("select[name='groupcode']").val());
    if (groupCode.length === 0) {
        alert("그룹을 선택해 주십시오.");
        $("select[name='groupcode']").focus();
        return;
    }

    /* 이름 */
    var adminName = alltrim($("#AdminName").val());
    if (adminName.length === 0) {
        alert("이름을 입력해 주십시오.");
        $("#AdminName").focus();
        return;
    }

    var conf = confirm("수정 하시겠습니까?");
    if (conf === true) {
        openPop('loading');
        document.form.action = "/manage/admin/adminmodify";
        document.form.submit();
    }
}


/* 관리자 삭제 */
function del_Admin(adminID) {
    var conf = confirm("삭제 하시겠습니까?");
    if (conf == true) {
        openPop('loading');
        document.form.action = "/manage/admin/admindelete";
        document.form.submit();
    }
}

function pop_Info(mCode1, mCode2, authType, gaType) {
    var query = "MCode1=" + mCode1 + "&MCode2=" + mCode2 + "&authType=" + authType;
    if (gaType == "G") {
        window.open("/manage/admin/popup/authgrouplist?" + query, "GAAuth", "width=1060, height=850, top=10, left=1, scrollbars=yes").focus();
    }
    else {
        window.open("/manage/admin/popup/authadminlist?" + query, "GAAuth", "width=1060, height=850, top=10, left=1, scrollbars=yes").focus();
    }
}

/* 관리자 핸드폰번호 수정 체크 */
function mod_MyHP() {
    var o_hp1 = alltrim($("input[name='O_HP1']").val());
    var o_hp2 = alltrim($("input[name='O_HP2']").val());
    var o_hp3 = alltrim($("input[name='O_HP3']").val());


    /* 핸드폰번호 */
    var hp1 = alltrim($("#HP1").val());
    if (hp1.length === 0) {
        alert("핸드폰번호를 선택해 주십시오.");
        $("#HP1").focus();
        return;
    }
    var hp2 = alltrim($("#HP2").val());
    if (hp2.length < 3) {
        alert("핸드폰번호를 숫자 3자리 이상 입력해 주십시오.");
        $("#HP2").focus();
        return;
    }
    if (!only_Num(hp2)) {
        alert("핸드폰번호를 숫자로만 입력해 주십시오.");
        $("#HP2").val("");
        $("#HP2").focus();
        return;
    }
    var hp3 = alltrim($("#HP3").val());
    if (hp3.length < 4) {
        alert("핸드폰번호를 숫자 4자리로 입력해 주십시오.");
        $("#HP3").focus();
        return;
    }
    if (!only_Num(hp3)) {
        alert("핸드폰번호를 숫자로만 입력해 주십시오.");
        $("#HP3").val("");
        $("#HP3").focus();
        return;
    }

    if (o_hp1 === hp1 && o_hp2 === hp2 && o_hp3 === hp3) {
        alert("핸드폰번호를 수정 입력 후 수정 처리해 주십시오.");
        return;
    }

    var hp = hp1 + '-' + hp2 + '-' + hp3;

    document.form.action="/manage/myinfo/myinfohpmodify";
    document.form.submit();
    //window.open('/ASP/Login/Auth/NiceID_Main.asp?AuthFor=M&HP=' + hp, 'cert', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no').focus();
}




/* 관리자 비밀번호 수정 폼 */
function lay_MyPasswordModifyForm() {
    $.ajax({
        type		 : "post",
        url			 : "/manage/myinfo/ajax/mypasswordmodify",
        data		 : "",
        async		 : false,
        dataType	 : "text",
        headers: {
            'RequestVerificationToken': getToken()
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];


            if (result === "OK") {
                $("#popup").html(cont);
                $("#popup").css({ 'top': '50%', 'left': '50%', 'width': 640 });
                openPop('popup');
                $("#popup").draggable({ cancel: ".pContents" });
                return;
            }
            else if (result === "LOGIN") {
                PageReload();
                return;
            }
            else {
                alert(cont);
                return;
            }
        },
        error		 : function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}


/* 관리자 비밀번호 수정 체크 */
function lay_MyPasswordModify() {
    /* 기존비밀번호 */
    var prevPwd = alltrim($("#PrevPwd", "form[name='chgPwdForm']").val());
    if (prevPwd.length === 0) {
        alert("기존 비밀번호를 입력해 주십시오.");
        $("#PrevPwd", "form[name='chgPwdForm']").focus();
        return;
    }

    /* 비밀번호 */
    var pwd = alltrim($("#Pwd", "form[name='chgPwdForm']").val());
    if (pwd.length === 0) {
        alert("비밀번호를 입력해 주십시오.");
        $("#Pwd", "form[name='chgPwdForm']").focus();
        return;
    }
    if (!only_AlphaNum(pwd)) {
        alert("비밀번호를 영문 또는 숫자로만 입력해 주십시오.");
        $("#Pwd", "form[name='chgPwdForm']").focus();
        return;
    }

    /* 비밀번호 확인 */
    var pwd1 = alltrim($("#Pwd1").val());
    if (pwd1.length === 0) {
        alert("비밀번호를 다시 한번 입력해 주십시오.");
        $("#Pwd1", "form[name='chgPwdForm']").focus();
        return;
    }

    if (pwd !== pwd1) {
        alert("비밀번호가 일치하지 않습니다.");
        $("#Pwd1", "form[name='chgPwdForm']").focus();
        return;
    }

    var conf = confirm("비밀번호를 수정하시겠습니까?");
    if (conf === true) {
        $.ajax({
            type		 : "post",
            url			 : "/manage/admin/myinfopwdmodifyok",
            async		 : false,
            data		 : $("#chgPwdForm").serialize(),
            dataType: "text",
            headers: {
                'RequestVerificationToken': getToken()
            },
            success		 : function (data) {
                var splitData	 = data.split("|||||");
                var result		 = splitData[0];
                var cont		 = splitData[1];


                if (result === "OK") {
                    alert("수정 되었습니다.");
                    closePop('popup');
                    return;
                }
                else if (result === "LOGIN") {
                    PageReload();
                    return;
                }
                else {
                    alert(cont);
                    return;
                }
            },
            error		 : function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}