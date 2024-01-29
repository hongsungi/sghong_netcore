/* 브랜드 입력 폼 체크 */
function ins_Brand() {
    var brandCode = alltrim($("#BrandCode").val());
    if (brandCode.length == 0) {
        alert("브랜드코드를 입력해 주십시오.");
        $("#BrandCode").focus();
        return;
    }
    var brandName = alltrim($("#BrandName").val());
    if (brandName.length == 0) {
        alert("브랜드명을 입력해 주십시오.");
        $("#BrandName").focus();
        return;
    }
    var lng, ext;
    var logoImg = alltrim($("#LogoImg").val());
    if (logoImg.length > 0) {
        lng = logoImg.length;
        ext = logoImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#LogoImg").focus();
            return;
        }
    }
    var visualImg = alltrim($("#VisualImg").val());
    if (visualImg.length > 0) {
        lng = visualImg.length;
        ext = visualImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#VisualImg").focus();
            return;
        }
    }
    var mLogoImg = alltrim($("#MLogoImg").val());
    if (mLogoImg.length > 0) {
        lng = mLogoImg.length;
        ext = mLogoImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#MLogoImg").focus();
            return;
        }
    }
    var mVisualImg = alltrim($("#MVisualImg").val());
    if (mVisualImg.length > 0) {
        lng = mVisualImg.length;
        ext = mVisualImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#MVisualImg").focus();
            return;
        }
    }

    var conf = confirm("등록 하시겠습니까?");
    if (conf == true) {
        openPop('loading');
        document.form.submit();
    }
}

/* 브랜드 수정 폼 체크 */
function mod_Brand() {
    var brandName = alltrim($("#BrandName").val());
    if (brandName.length == 0) {
        alert("브랜드명을 입력해 주십시오.");
        $("#BrandName").focus();
        return;
    }
    var lng, ext;
    var logoImg = alltrim($("#LogoImg").val());
    if (logoImg.length > 0) {
        lng = logoImg.length;
        ext = logoImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#LogoImg").focus();
            return;
        }
    }
    var visualImg = alltrim($("#VisualImg").val());
    if (visualImg.length > 0) {
        lng = visualImg.length;
        ext = visualImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#VisualImg").focus();
            return;
        }
    }
    var mLogoImg = alltrim($("#MLogoImg").val());
    if (mLogoImg.length > 0) {
        lng = mLogoImg.length;
        ext = mLogoImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#MLogoImg").focus();
            return;
        }
    }
    var mVisualImg = alltrim($("#MVisualImg").val());
    if (mVisualImg.length > 0) {
        lng = mVisualImg.length;
        ext = mVisualImg.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#MVisualImg").focus();
            return;
        }
    }

    var conf = confirm("수정 하시겠습니까?");
    if (conf == true) {
        openPop('loading');
        document.form.submit();
    }
}

/* 리스트에서 브랜드 수정 체크 */
function mod_ListOneBrand(num) {
    var brandCode	 = $("input:checkbox[name='BrandCode']").eq(num).val();
    var useFlag		 = $("select[name='UseFlag']").eq(num).val();

    var conf = confirm("수정 하시겠습니까?");
    if (conf) {
        mod_ListBrand(brandCode, useFlag);
    }
}


/* 리스트에서 브랜드 일괄 수정 체크 */
function mod_ListAllBrand(num) {
    var brandCodes	 = "";
    var mainFlags	 = "";
    var useFlags	 = "";

    var brandCodeCnt = $("input:checkbox[name='BrandCode']").length;


    if (brandCodeCnt > 0) {
        $("input:checkbox[name='BrandCode']").each(function (idx) {
            if ($(this).is(":checked")) {
                if (brandCodes == "") {
                    brandCodes	 = $("input:checkbox[name='BrandCode']").eq(idx).val();
                    useFlags	 = $("select[name='UseFlag']").eq(idx).val();
                }
                else {
                    brandCodes	 = brandCodes	 + "," + $("input:checkbox[name='BrandCode']").eq(idx).val();
                    useFlags	 = useFlags		 + "," + $("select[name='UseFlag']").eq(idx).val();
                }
            }
        });

        if (brandCodes == "") {
            alert("일괄 수정할 브랜드를 선택해 주십시오.");
            return;
        }
        else {
            var conf = confirm("수정 하시겠습니까?");
            if (conf) {
                mod_ListBrand(brandCodes, useFlags);
            }
        }
    }
}


/* 브랜드 게시순서 팝업 */
function pop_BrandDisplayNum() {
    window.open("/product/brand/popup/displaylist", "BrandDisplayList", "width=860, height=850, top=10, left=1, scrollbars=yes").focus();
}


/* 리스트 브랜드 수정 처리 */
function mod_ListBrand(brandCode, useFlag) {
    $.ajax({
        type		 : "post",
        url			 : "/product/brand/ajax/useflag_modify",
        async		 : false,
        data		 : "brandCode=" + brandCode + "&useFlag=" + useFlag,
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
            alert(data.responseText);
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 브랜드 게시 순서 수정 */
function mod_DisplayNum(brandCode, modType) {
    $.ajax({
        type		 : "post",
        url			 : "/product/brand/ajax/displaynummodify",
        async		 : true,
        data		 : "brandCode=" + brandCode + "&modType=" + modType,
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
                opener.PageReload();
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