function ins_ShopInfo() {
    var standardPrice = alltrim($("#StandardPrice").val());
    if (standardPrice.length == 0) {
        alert("배송비 기준 금액을 입력해 주십시오.");
        $("#StandardPrice").focus();
        return;
    }
    if (only_Num(standardPrice) == false) {
        alert("배송비 기준 금액을 숫자로만 입력해 주십시오.");
        $("#StandardPrice").focus();
        return;
    }
    var deliveryPrice = alltrim($("#DeliveryPrice").val());
    if (deliveryPrice.length == 0) {
        alert("배송비를 입력해 주십시오.");
        $("#DeliveryPrice").focus();
        return;
    }
    if (only_Num(deliveryPrice) == false) {
        alert("배송비를 숫자로만 입력해 주십시오.");
        $("#DeliveryPrice").focus();
        return;
    }
    var returnDeliveryPrice = alltrim($("#ReturnDeliveryPrice").val());
    if (returnDeliveryPrice.length == 0) {
        alert("반품배송비를 입력해 주십시오.");
        $("#ReturnDeliveryPrice").focus();
        return;
    }
    if (only_Num(returnDeliveryPrice) == false) {
        alert("반품배송비를 숫자로만 입력해 주십시오.");
        $("#ReturnDeliveryPrice").focus();
        return;
    }
    var changeDeliveryPrice = alltrim($("#ChangeDeliveryPrice").val());
    if (changeDeliveryPrice.length == 0) {
        alert("교환배송비를 입력해 주십시오.");
        $("#ChangeDeliveryPrice").focus();
        return;
    }
    if (only_Num(changeDeliveryPrice) == false) {
        alert("교환배송비를 숫자로만 입력해 주십시오.");
        $("#ChangeDeliveryPrice").focus();
        return;
    }

    var fstandardPrice = alltrim($("#ForeignStandardPrice").val());
    if (fstandardPrice.length == 0) {
        alert("해외 배송비 기준 금액을 입력해 주십시오.");
        $("#ForeignStandardPrice").focus();
        return;
    }
    if (only_Num(fstandardPrice) == false) {
        alert("해외 배송비 기준 금액을 숫자로만 입력해 주십시오.");
        $("#ForeignStandardPrice").focus();
        return;
    }
    var fdeliveryPrice = alltrim($("#ForeignDeliveryPrice").val());
    if (fdeliveryPrice.length == 0) {
        alert("해외 배송비를 입력해 주십시오.");
        $("#ForeignDeliveryPrice").focus();
        return;
    }
    if (only_Num(fdeliveryPrice) == false) {
        alert("해외 배송비를 숫자로만 입력해 주십시오.");
        $("#ForeignDeliveryPrice").focus();
        return;
    }
    var freturnDeliveryPrice = alltrim($("#ForeignReturnDeliveryPrice").val());
    if (freturnDeliveryPrice.length == 0) {
        alert("해외 반품배송비를 입력해 주십시오.");
        $("#ForeignReturnDeliveryPrice").focus();
        return;
    }
    if (only_Num(freturnDeliveryPrice) == false) {
        alert("해외 반품배송비를 숫자로만 입력해 주십시오.");
        $("#ForeignReturnDeliveryPrice").focus();
        return;
    }
    var fchangeDeliveryPrice = alltrim($("#ForeignChangeDeliveryPrice").val());
    if (fchangeDeliveryPrice.length == 0) {
        alert("해외 교환배송비를 입력해 주십시오.");
        $("#ForeignChangeDeliveryPrice").focus();
        return;
    }
    if (only_Num(fchangeDeliveryPrice) == false) {
        alert("해외 교환배송비를 숫자로만 입력해 주십시오.");
        $("#ForeignChangeDeliveryPrice").focus();
        return;
    }

    var rZipCode = alltrim($("#RZipCode").val());
    if (rZipCode.length == 0) {
        alert("반송지 우편번호를 검색하여 입력해 주십시오.");
        $("#RZipCode").focus();
        return;
    }
    var rAddr1 = alltrim($("#RAddr1").val());
    if (rAddr1.length == 0) {
        alert("반송지 기본 주소를 검색하여 입력해 주십시오.");
        $("#RAddr1").focus();
        return;
    }
    var rAddr2 = alltrim($("#RAddr2").val());
    if (rAddr2.length == 0) {
        alert("반송지 상세 주소를 입력해 주십시오.");
        $("#RAddr2").focus();
        return;
    }

    var foreignRZipCode = alltrim($("#ForeignRZipCode").val());
    if (foreignRZipCode.length == 0) {
        alert("해외 반송지 우편번호를 검색하여 입력해 주십시오.");
        $("#ForeignRZipCode").focus();
        return;
    }
    var foreignrAddr1 = alltrim($("#ForeignRAddr1").val());
    if (foreignrAddr1.length == 0) {
        alert("반송지 기본 주소를 검색하여 입력해 주십시오.");
        $("#ForeignRAddr1").focus();
        return;
    }
    var foreignrAddr2 = alltrim($("#ForeignRAddr2").val());
    if (foreignrAddr2.length == 0) {
        alert("반송지 상세 주소를 입력해 주십시오.");
        $("#ForeignRAddr2").focus();
        return;
    }

    var txtReviewPoint = alltrim($("#TxtReviewPoint").val());
    if (txtReviewPoint.length == 0) {
        alert("일반상품평 포인트를 입력해 주십시오.");
        $("#TxtReviewPoint").focus();
        return;
    }
    if (only_Num(txtReviewPoint) == false) {
        alert("일반상품평 포인트를 숫자로만 입력해 주십시오.");
        $("#TxtReviewPoint").focus();
        return;
    }

    var imgReviewPoint = alltrim($("#ImgReviewPoint").val());
    if (imgReviewPoint.length == 0) {
        alert("포토상품평 포인트를 입력해 주십시오.");
        $("#ImgReviewPoint").focus();
        return;
    }
    if (only_Num(imgReviewPoint) == false) {
        alert("포토상품평 포인트를 숫자로만 입력해 주십시오.");
        $("#ImgReviewPoint").focus();
        return;
    }

    var conf = confirm("수정 하시겠습니까?");
    if (conf) {
        openPop('loading');
        document.form.submit();
    }
}