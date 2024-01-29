function list_Admin(groupCode) {
    window.open("/manage/group/popup/adminlist/"+groupCode, "GroupAdminList", "width=1060, height=850, top=10, left=1, scrollbars=yes").focus();
}

function checkField() {
    var groupName = alltrim($("input[name='GroupName']").val());
    if (groupName.length == 0) {
        alert("그룹명을 입력해 주십시오.");
        $("input[name='GroupName']").focus();
        return false;
    }
    var groupDesc = alltrim($("input[name='GroupDesc']").val());
    if (groupDesc.length == 0) {
        alert("그룹설명을 입력해 주십시오.");
        $("input[name='GroupDesc']").focus();
        return false;
    }
}

function deleteGroup() {
    var conf = confirm("그룹을 삭제 하시겠습니까?");
    if (conf == true) {
        document.delform.submit();
    }
}
function adminlist() {
    var groupcode = $("#GroupCode option:selected").val();

    location.href="/manage/group/popup/adminlist/"+groupcode;
    document.form.submit();
}