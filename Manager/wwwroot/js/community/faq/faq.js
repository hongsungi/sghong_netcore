var imagepath = "/upload/editor/";

function pasteHTMLDemo(irid, sHTML) {
    //기존 내용 삭제
    oEditors.getById[irid].exec("SET_IR", ['']);
    oEditors.getById[irid].exec("PASTE_HTML", [sHTML]);
}

function ins_Faq() {
    var title = alltrim($("#title").val());
    if (title.length == 0) {
        alert("제목을 입력해 주십시오.");
        $("#title").focus();
        return;
    }

    var contents = oEditors.getById["contents"].getIR();
    if (contents.length == 0) {
        alert("내용을 입력해 주십시오.");
        $("#contents").focus();
        return;
    }

    oEditors.getById["contents"].exec("UPDATE_IR_FIELD", []);

    var conf = confirm("입력 하시겠습니까?");
    if (conf == true) {
        document.form.submit();
    }
}

function mod_Faq() {
    var title = alltrim($("#title").val());
    if (title.length == 0) {
        alert("제목을 입력해 주십시오.");
        $("#title").focus();
        return;
    }

    var contents = oEditors.getById["contents"].getIR();
    if (contents.length == 0) {
        alert("내용을 입력해 주십시오.");
        $("#contents").focus();
        return;
    }

    oEditors.getById["contents"].exec("UPDATE_IR_FIELD", []);

    var conf = confirm("수정 하시겠습니까?");
    if (conf == true) {
        document.form.action = "/community/faq/modifyok";
        document.form.submit();
    }
}

function del_Faq() {
    if (confirm('삭제 하시겠습니까?')) {
        document.form.action = "/community/faq/deleteok";
        document.form.submit();
    }
}

function pop_DisplayNum() {
    window.open("/community/faq/popup/mainlist", "Main", "width=860, height=850, top=10, left=10, scrollbars=yes").focus();
}

/* 메인 게시 순서 수정 */
function mod_DisNum(udtype, idx, dispnum) {
    $.ajax({
        type		 : "post",
        url			 : "/community/faq/ajax/displaymodifyok",
        async		 : false,
        data		 : "udtype=" + udtype + "&idx=" + idx + "&displaynum=" + dispnum,
        dataType	 : "text",
        beforeSend: function (xhr) {
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result == "OK") {
                PageReload();
                return;
            }
            else if (result == "ENDCHG") {
                if(udtype == 'U'){
                    alert("더이상 순서를 올릴 수 없습니다.");
                }
                else if(udtype == 'D'){
                    alert("더이상 순서를 내릴 수 없습니다.");
                }
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

function pop_SearchWrod() {
    window.open("/community/faq/popup/searchword", "SW", "width=860, height=850, top=10, left=10, scrollbars=yes").focus();
}

/* FAQ 검색어 수정 */
function mod_SearchWord() {
    var sWord1 = alltrim($("input[name='sword1']").val());
    if (sWord1.length == 0) {
        alert("검색어1을 입력해 주세요.");
        $("input[name='sword1']").focus();
        return;
    }

    var sWord2 = alltrim($("input[name='sword2']").val());
    if (sWord2.length == 0) {
        alert("검색어2를 입력해 주세요.");
        $("input[name='sword2']").focus();
        return;
    }

    var sWord3 = alltrim($("input[name='sword3']").val());
    if (sWord3.length == 0) {
        alert("검색어3을 입력해 주세요.");
        $("input[name='sword3']").focus();
        return;
    }

    var sWord4 = alltrim($("input[name='sword4']").val());
    if (sWord4.length == 0) {
        alert("검색어4를 입력해 주세요.");
        $("input[name='sword4']").focus();
        return;
    }

    var sWord5 = alltrim($("input[name='sword5']").val());
    if (sWord5.length == 0) {
        alert("검색어5를 입력해 주세요.");
        $("input[name='sword5']").focus();
        return;
    }

    if(confirm("수정 하시겠습니까?")){
        document.form.submit();
    }
}