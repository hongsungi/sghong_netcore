var imagepath = "/upload/editor/";

function pasteHTMLDemo(irid, sHTML) {
    //기존 내용 삭제
    oEditors.getById[irid].exec("SET_IR", ['']);
    oEditors.getById[irid].exec("PASTE_HTML", [sHTML]);
}

function ins_Notice() {
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

function mod_Notice() {
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
        document.form.submit();
    }
}


function modifyForm_Notice() {
    var idx = form.idx.value;
    document.form.action = "/community/notice/modify/" + idx;
    document.form.submit();
}

function del_Notice() {
    if (confirm('삭제 하시겠습니까?')) {
        document.form.action = "/community/notice/deleteok";
        document.form.submit();
    }
}

function FileDeleteChk(idx) {
    if (confirm('파일을 삭제 하시겠습니까?')) {
        $.ajax({
            type: "post",
            url: "/community/notice/ajax/filedelete",
            async: false,
            data: "idx=" + idx,
            dataType: "text",
            beforeSend: function (xhr) {
                xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
            },
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];


                if (result == "OK") {
                    alert("삭제 되었습니다.");
                    PageReload();
                    return;
                } else if (result == "LOGIN") {
                    PageReload();
                    return;
                } else {
                    alert(cont);
                    return;
                }
            },
            error: function (data) {
                alert(data.responseText);
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}
