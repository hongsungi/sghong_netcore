/***********************************************************************************************/
/* 대분류
/***********************************************************************************************/

/* 대분류 수정폼 체크 */
function mod_Category1(num) {
    var categoryCode1 = $("input[name='MCategoryCode1']").eq(num).val();
    var categoryName1 = alltrim($("input[name='MCategoryName1']").eq(num).val());
    var displayFlag = $("select[name='MDisplayFlag']").eq(num).val();

    document.ModCategory.categoryCode1.value = categoryCode1;
    document.ModCategory.categoryName.value = categoryName1;
    document.ModCategory.displayFlag.value = displayFlag;

    lay_CategoryModify();
}


/* 대분류 게시순서 변경 */
function mod_Category1DisplayNum(num, modType) {
    var categoryCode1 = $("input[name='MCategoryCode1']").eq(num).val();

    mod_CategoryDisplayNum(1, modType, categoryCode1, '')
}


/***********************************************************************************************/
/* 중분류
/***********************************************************************************************/

function category1chg(categorycode1) {
    location.href='/product/category/list2?CategoryCode1='+categorycode1.value;
}

/* 중분류 수정폼 체크 */
function mod_Category2(num) {
    var categoryCode1 = $("input[name='MCategoryCode1']").eq(num).val();
    var categoryCode2 = $("input[name='MCategoryCode2']").eq(num).val();
    var categoryName2 = alltrim($("input[name='MCategoryName2']").eq(num).val());
    var displayFlag = $("select[name='MDisplayFlag']").eq(num).val();

    document.ModCategory.categoryCode1.value = categoryCode1;
    document.ModCategory.categoryCode2.value = categoryCode2;
    document.ModCategory.categoryName.value = categoryName2;
    document.ModCategory.displayFlag.value = displayFlag;

    lay_CategoryModify();
}


/* 중분류 게시순서 변경 */
function mod_Category2DisplayNum(num, modType) {
    var categoryCode1 = $("input[name='MCategoryCode1']").eq(num).val();
    var categoryCode2 = $("input[name='MCategoryCode2']").eq(num).val();

    mod_CategoryDisplayNum(2, modType, categoryCode1, categoryCode2);
}



/***********************************************************************************************/
/* 전체분류
/***********************************************************************************************/
/* 전체분류 수정 폼 */
function lay_CategoryModifyForm(depth, categoryCode1, categoryCode2) {
    $.ajax({
        type		 : "post",
        url			 : "/product/category/ajax/modifyform",
        async		 : false,
        data		 : "Depth=" + depth + "&CategoryCode1=" + categoryCode1 + "&CategoryCode2=" + categoryCode2,
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

/* 전체분류 수정폼 체크 */
function lay_CategoryModify() {
    var depth			 = $("input[name='Depth']",			 "form[name='ModCategory']").val();
    var categoryCode1	 = $("input[name='categoryCode1']",	 "form[name='ModCategory']").val();
    var categoryCode2	 = $("input[name='categoryCode2']",	 "form[name='ModCategory']").val();
    var categoryName	 = $("input[name='categoryName']",	 "form[name='ModCategory']").val();
    //var displayFlag		 = $("select[name='DisplayFlag']",	 "form[name='ModCategory']").val();

    var url = "modify1";

    if (categoryCode1.length == 0) {
        alert("대분류 코드 정보가 없습니다.");
        return;
    }

    if (depth === "2") {
        url = "modify2";
        if (categoryCode2.length == 0) {
            alert("소분류 코드 정보가 없습니다.");
            return;
        }
    }

    if (categoryName.length == 0) {
        alert("분류명을 입력하여 주십시오.");
        $("input[name='categoryName']", "form[name='ModCategory']").focus();
        return;
    }

    var conf = confirm("수정 하시겠습니까?");
    if (conf) {
        $.ajax({
            type		 : "post",
            url			 : "/product/category/ajax/"+url,
            async		 : true,
            data		 : $("#ModCategory").serialize(),
            dataType	 : "text",
            headers: {
                'RequestVerificationToken': getToken()
            },
            success		 : function (data) {
                var splitData	 = data.split("|||||");
                var result		 = splitData[0];
                var cont		 = splitData[1];

                if (result == "OK") {
                    alert("수정 되었습니다.");
                    closePop('popup');
                    PageReload();
                    return;
                }
                else if (result == "LOGIN") {
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

/* 전체분류 게시순서 변경 */
function mod_CategoryDisplayNum(depth, modType, categoryCode1, categoryCode2) {
    var url = "displaynum_modify1";
    if (depth == "2") {
        url = "displaynum_modify2";
    }
    $.ajax({
        type		 : "post",
        url			 : "/product/category/ajax/"+url,
        async		 : true,
        data		 : "Depth=" + depth + "&modType=" + modType + "&categoryCode1=" + categoryCode1 + "&categoryCode2=" + categoryCode2,
        dataType	 : "text",
        headers: {
            'RequestVerificationToken': getToken()
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result == "OK") {
                PageReload();
                return;
            }
            else if (result == "LOGIN") {
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


/* 전체분류 입력 폼 */
function lay_CategoryAddForm(num) {
    var depth			 = "";
    var categoryCode1	 = "";
    var categoryCode2	 = "";
    var categoryCode3	 = "";
    var categoryName	 = "";
    var displayFlag		 = "";

    if (num == "0") {
        depth = $("#AddDepth").val();
        $("input[name='Depth']",		 "form[name='FormCategory']").val(depth);
        $("input[name='CategoryCode1']", "form[name='FormCategory']").val("");
        $("input[name='CategoryName']",	 "form[name='FormCategory']").val("");
        $("input[name='DisplayFlag']",	 "form[name='FormCategory']").val("");
    }
    else if (num == "1") {
        depth			 = $("input[name='Depth']",			 "form[id='InsCategory']").val();
        categoryCode1	 = $("select[name='CategoryCode1']", "form[id='InsCategory']").val();
        categoryName	 = $("input[name='CategoryName']",	 "form[id='InsCategory']").val();
        displayFlag		 = $("select[name='DisplayFlag']",	 "form[id='InsCategory']").val();
        $("input[name='Depth']",		 "form[name='FormCategory']").val(depth);
        $("input[name='CategoryCode1']", "form[name='FormCategory']").val(categoryCode1);
        $("input[name='CategoryName']",	 "form[name='FormCategory']").val(categoryName);
        $("input[name='DisplayFlag']",	 "form[name='FormCategory']").val(displayFlag);
    }

    $.ajax({
        type		 : "post",
        url			 : "/product/category/ajax/addform",
        async		 : false,
        data		 : $("#FormCategory").serialize(),
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


/* 전체분류 입력폼 체크 */
function lay_CategoryAdd() {
    var depth	 = alltrim($("#Depth", "form[name='InsCategory']").val());
    var cateName = "";
    var url = "add1";

    if (depth === "2") {
        url = "add2";
        var categoryCode1 = alltrim($("#CategoryCode1", "form[name='InsCategory']").val());
        if (categoryCode1.length == 0) {
            alert("대분류를 선택해 주십시오.");
            $("#CategoryCode1", "form[name='InsCategory']").focus();
            return;
        }
    }

    var categoryName = alltrim($("#CategoryName", "form[name='InsCategory']").val());
    if (categoryName.length == 0) {
        alert("분류명을 입력해 주십시오.");
        $("#CategoryName", "form[name='InsCategory']").focus();
        return;
    }

    var conf = confirm("입력 하시겠습니까?");
    if (conf) {
        $.ajax({
            type		 : "post",
            url			 : "/product/category/ajax/" + url,
            async		 : true,
            data		 : $("#InsCategory").serialize(),
            dataType	 : "text",
            headers: {
                'RequestVerificationToken': getToken()
            },
            success		 : function (data) {
                var splitData	 = data.split("|||||");
                var result		 = splitData[0];
                var cont		 = splitData[1];

                if (result == "OK") {
                    alert("입력 되었습니다.");
                    closePop('popup');
                    PageReload();
                    return;
                }
                else if (result == "LOGIN") {
                    PageReload();
                    return;
                }
                else {
                    alert(cont);
                    return;
                }
            },
            error		 : function (data) {
                alert(data.responseText)//alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}