var imagepath = "/upload/editor/";

function pasteHTMLDemo(irid, sHTML) {
    //기존 내용 삭제
    oEditors.getById[irid].exec("SET_IR", ['']);
    oEditors.getById[irid].exec("PASTE_HTML", [sHTML]);
}

function ins_Terms(){
    var title = alltrim($("#title").val());
    if (title.length == 0) {
        alert("제목을 입력해 주십시오.");
        $("#title").focus();
        return;
    }

    var place = alltrim($("#place").val());
    if (place.length == 0) {
        alert("적용위치를 입력해 주십시오.");
        $("#place").focus();
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

function mod_Terms(){
    var title = alltrim($("#title").val());
    if (title.length == 0) {
        alert("제목을 입력해 주십시오.");
        $("#title").focus();
        return;
    }

    var place = alltrim($("#place").val());
    if (place.length == 0) {
        alert("적용위치를 입력해 주십시오.");
        $("#place").focus();
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

function del_Terms() {
    if (confirm('삭제 하시겠습니까?')) {
        document.form.action = "/manage/terms/delete";
        document.form.submit();
    }
}