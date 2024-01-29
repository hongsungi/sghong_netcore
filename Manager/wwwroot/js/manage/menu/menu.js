function chk_FieldP() {
    var str = alltrim(document.menu1form.menuName.value);
    if (str.length == 0) {
        alert("메뉴명을 입력해 주십시오.");
        document.menu1form.menuName.focus();
        return false;
    }
}
function chk_FieldC() {
    var str = alltrim(document.menu2form.menuName.value);
    if (str.length === 0) {
        alert("메뉴명을 입력해 주십시오.");
        document.menu2form.menuName.focus();
        return false;
    }
    str = alltrim(document.menu2form.menuUrl.value);
    if (str.length === 0) {
        alert("메뉴URL을 입력해 주십시오.");
        document.menu2form.menuUrl.focus();
        return false;
    }
}
//(현재 선택된 부모메뉴코드, 삭제대상 메뉴부모코드, 삭제대상 메뉴코드)
function del_Menu(MenuPCode, MenuCode) {
    var conf = confirm("삭제 하시겠습니까?");
    if (conf === true) {
        document.modifyform.menuPCode.value = MenuPCode;
        document.modifyform.menuCode.value = MenuCode;
        document.modifyform.action="/manage/menu/delete";
        document.modifyform.submit();
    }
}

/* 메뉴 게시 순서 수정 */
function mod_ManageMenuDisNum(udType, menuPCode, menuCode) {
    document.modifyform.udType.value = udType;
    document.modifyform.menuPCode.value = menuPCode;
    document.modifyform.menuCode.value = menuCode;
    document.modifyform.action="/manage/menu/dispnummodify";
    document.modifyform.submit();
}

function chk_Field() {
    var str = alltrim(document.form.menuName.value);
    if (str.length === 0) {
        alert("메뉴명을 입력해 주십시오.");
        document.form.menuName.focus();
        return false;
    }
    str = alltrim(document.form.menuUrl.value);
    if (str.length === 0) {
        alert("URL을 입력해 주십시오.");
        document.form.menuUrl.focus();
        return false;
    }
    document.form.submit();
}
function delete_Menu() {
    var conf = confirm("삭제 하시겠습니까?");
    if (conf === true) {
        document.fform.action="/manage/menu/delete";
        document.fform.submit();
    }
}
