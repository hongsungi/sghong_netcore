/* 엑셀 다운 */
function downExcel() {
    document.searchForm.target = "_self";
    document.searchForm.action = "/design/coupon/excel/list";
    document.searchForm.submit();
}

/* 검색 */
function ListSearch() {
    document.searchForm.target = "_self";
    document.searchForm.action = "/design/coupon/list";
    document.searchForm.submit();
}

/* 쿠폰 종류 선택 */
function chg_CouponType(couponType) {
    /* 배송비쿠폰여부 */
    var deliveryCouponFlag = $("input:radio[name='deliveryCouponFlag']:checked").val();

    $("#deliveryCouponFlag1").prop("checked", true);
    chg_DeliveryCouponFlag('N');		// 쿠폰종류 선택시 무조건 일반 쿠폰으로 선택 처리

    $(".groupcode").show();
    $("input:checkbox[name='groupcode']").prop("checked", false);
    //$("#OutShopFlagN").prop("checked", true);										// 입점몰쿠폰 - 일반쿠폰 체크 처리

    //$("#Tr_LoginShowFlag").hide();													// 쿠폰표시 - 쿠폰표시 영역 숨김

    /* 상품배포쿠폰 */
    if (couponType == "01") {

        $("#deliveryCouponFlag1").prop("checked", true);							// 배송비쿠폰 - 일반쿠폰에 체크 처리
        $("#Span_DeliveryCouponFlagY").hide();										// 배송비쿠폰 - 배송비쿠폰 항목 숨김

        $("#Tr_OrderPrice").hide();													// 결제금액 - 결제금액 영역 숨김
        $("#Tr_OrderState").hide();													// 발급시점 - 발급시점 영역 숨김

        $("#Span_LimitDistributeFlagIY").show();									// 발급수량 - 제한수량 항목 보여줌
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType1").prop("checked", true);								// 발급방식 - 다운로드에 체크 처리
        $("#Span_DistributeTypeD").show();											// 발급방식 - 다운로드 항목 보여줌
        $("#Span_DistributeTypeA").hide();											// 발급방식 - 자동발급 항목 숨김

        //$("#Tr_LoginShowFlag").show();												// 쿠폰표시 - 쿠폰표시 영역 보여줌

        $("#Tr_GroupCode").hide();													// 발급대상 - 발급대상 영역 숨김

    }
    /* 일반배포쿠폰 */
    else if (couponType == "02") {

        $("#Span_DeliveryCouponFlagY").show();										// 배송비쿠폰 - 배송비쿠폰 항목 보여줌

        $("#Tr_OrderPrice").hide();													// 결제금액 - 결제금액 영역 숨김
        $("#Tr_OrderState").hide();													// 발급시점 - 발급시점 영역 숨김

        $("#Span_LimitDistributeFlagIY").show();									// 발급수량 - 제한수량 항목 보여줌
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType1").prop("checked", true);								// 발급방식 - 다운로드에 체크 처리
        $("#Span_DistributeTypeD").show();											// 발급방식 - 다운로드 항목 보여줌
        $("#Span_DistributeTypeA").show();											// 발급방식 - 자동발급 항목 보여줌

        $(".GroupCode").prop("checked", false);										// 발급대상 - 전체 해제 처리
        $(".GroupCode").eq(0).prop("checked", true);								// 발급대상 - 특정회원지정 체크 처리
        $(".Span_GroupCode").hide();												// 발급대상 - 전체 항목 숨김
        $(".Span_GroupCode").eq(0).show();											// 발급대상 - 특정회원지정 항목 보여줌
        $("#Tr_GroupCode").show();													// 발급대상 - 발급대상 영역 보여줌

    }
    /* 회원가입축하쿠폰 */
    else if (couponType == "03") {

        $("#deliveryCouponFlag1").prop("checked", true);							// 배송비쿠폰 - 일반쿠폰에 체크 처리
        $("#Span_DeliveryCouponFlagY").hide();										// 배송비쿠폰 - 배송비쿠폰 항목 숨김

        $("#Tr_OrderPrice").hide();													// 결제금액 - 결제금액 영역 숨김
        $("#Tr_OrderState").hide();													// 발급시점 - 발급시점 영역 숨김

        $("#limitDistributeFlag1").prop("checked", true);							// 발급수량 - 제한수량 무제한 체크처리
        $("#Span_LimitDistributeFlagIY").hide();									// 발급수량 - 제한수량 항목 숨김
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType2").prop("checked", true);								// 발급방식 - 자동발급에 체크 처리
        $("#Span_DistributeTypeD").hide();											// 발급방식 - 다운로드 항목 숨김
        $("#Span_DistributeTypeA").show();											// 발급방식 - 자동발급 항목 보여줌

        $("#Tr_GroupCode").hide();													// 발급대상 - 발급대상 영역 숨김

    }
    /* 생일축하쿠폰 */
    else if (couponType == "04") {

        $("#deliveryCouponFlag1").prop("checked", true);							// 배송비쿠폰 - 일반쿠폰에 체크 처리
        $("#Span_DeliveryCouponFlagY").hide();										// 배송비쿠폰 - 배송비쿠폰 항목 숨김

        $("#Tr_OrderPrice").hide();													// 결제금액 - 결제금액 영역 숨김
        $("#Tr_OrderState").hide();													// 발급시점 - 발급시점 영역 숨김

        $("#limitDistributeFlag1").prop("checked", true);							// 발급수량 - 제한수량 무제한 체크처리
        $("#Span_LimitDistributeFlagIY").hide();									// 발급수량 - 제한수량 항목 숨김
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType2").prop("checked", true);								// 발급방식 - 자동발급에 체크 처리
        $("#Span_DistributeTypeD").hide();											// 발급방식 - 다운로드 항목 숨김
        $("#Span_DistributeTypeA").show();											// 발급방식 - 자동발급 항목 보여줌

        $("#Tr_GroupCode").hide();													// 발급대상 - 발급대상 영역 숨김

    }
    /* 회원등급별쿠폰 */
    else if (couponType == "05") {

        $("#Span_DeliveryCouponFlagY").show();										// 배송비쿠폰 - 배송비쿠폰 항목 보여줌

        $("#Tr_OrderPrice").hide();													// 결제금액 - 결제금액 영역 숨김
        $("#Tr_OrderState").hide();													// 발급시점 - 발급시점 영역 숨김

        $("#limitDistributeFlag1").prop("checked", true);							// 발급수량 - 제한수량 무제한 체크처리
        $("#Span_LimitDistributeFlagIY").hide();									// 발급수량 - 제한수량 항목 숨김
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType2").prop("checked", true);								// 발급방식 - 자동발급에 체크 처리
        $("#Span_DistributeTypeD").hide();											// 발급방식 - 다운로드 항목 숨김
        $("#Span_DistributeTypeA").show();											// 발급방식 - 자동발급 항목 보여줌

        $("#Tr_GroupCode").show();													// 발급대상 - 발급대상 영역 보여줌
        $(".Span_GroupCode").show();												// 발급대상 - 전체 항목 보여줌
        $(".Span_GroupCode").eq(0).hide();											// 발급대상 - 특정회원지정 항목 숨김

    }
    /* 첫구매감사쿠폰 */
    else if (couponType == "06") {

        $("#deliveryCouponFlag1").prop("checked", true);							// 배송비쿠폰 - 일반쿠폰에 체크 처리
        $("#Span_DeliveryCouponFlagY").hide();										// 배송비쿠폰 - 배송비쿠폰 항목 숨김

        $("#Tr_OrderPrice").hide();													// 결제금액 - 결제금액 영역 숨김
        $("#Tr_OrderState").show();													// 발급시점 - 발급시점 영역 숨김

        $("#Span_LimitDistributeFlagIY").show();									// 발급수량 - 제한수량 항목 숨김
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType2").prop("checked", true);								// 발급방식 - 자동발급에 체크 처리
        $("#Span_DistributeTypeD").hide();											// 발급방식 - 다운로드 항목 숨김
        $("#Span_DistributeTypeA").show();											// 발급방식 - 자동발급 항목 보여줌

        $("#Tr_GroupCode").hide();													// 발급대상 - 발급대상 영역 숨김

    }
    /* 주문금액별쿠폰 */
    else if (couponType == "07") {

        $("#deliveryCouponFlag1").prop("checked", true);							// 배송비쿠폰 - 일반쿠폰에 체크 처리
        $("#Span_DeliveryCouponFlagY").hide();										// 배송비쿠폰 - 배송비쿠폰 항목 숨김

        $("#Tr_OrderPrice").show();													// 결제금액 - 결제금액 영역 보여줌
        $("#Tr_OrderState").show();													// 발급시점 - 발급시점 영역 숨김

        $("#Span_LimitDistributeFlagIY").show();									// 발급수량 - 제한수량 항목 숨김
        init_LimitDistributeFlag();													// 발급수량 - 현재 선택된 발급수량 방식으로 초기화

        $("#distributeType2").prop("checked", true);								// 발급방식 - 자동발급에 체크 처리
        $("#Span_DistributeTypeD").hide();											// 발급방식 - 다운로드 항목 숨김
        $("#Span_DistributeTypeA").show();											// 발급방식 - 자동발급 항목 보여줌

        $("#Tr_GroupCode").hide();													// 발급대상 - 발급대상 영역 숨김

    }
}

/* 배송비 쿠폰 여부 */
function chg_DeliveryCouponFlag(dcf) {
    var couponType = $("input:radio[name='couponType']:checked").val();
    /* 배송비쿠폰 */
    if (dcf == "Y") {

        $("#Tr_Discount").hide();													// 할인 - 할인 영역 숨김
        $("#Tr_LimitDiscount").hide();												// 최대할인금액 - 최대할인금액 영역 숨김
        $("#Tr_LimitPrice").hide();													// 최소사용금액 - 최소사용금액 영역 숨김
        //$("#Tr_DuplicateUseFlag").hide();											// 중복사용 - 중복사용 영역 숨김
        $("#Tr_ReturnFlag").hide();													// 쿠폰반환 - 쿠폰반환 영역 숨김
        //$("#Tr_LoginShowFlag").hide();												// 쿠폰표시 - 쿠폰표시 영역 숨김
        $("#Tr_ApplyType").hide();													// 사용범위 - 사용범위 역역 숨김
        $("#Tr_NotApplyType").hide();												// 제외범위 - 제외범위 역역 숨김

        if (couponType == "05") {
            $("#Span_DistributeCount").show();
        }
    }
    /* 일반쿠폰 */
    else {

        $("#Tr_Discount").show();													// 할인 - 할인 영역 보여줌
        $("#Tr_LimitDiscount").show();												// 최대할인금액 - 최대할인금액 영역 보여줌
        $("#Tr_LimitPrice").show();													// 최소사용금액 - 최소사용금액 영역 보여줌
        //$("#Tr_DuplicateUseFlag").show();											// 중복사용 - 중복사용 영역 보여줌
        $("#Tr_ReturnFlag").show();													// 쿠폰반환 - 쿠폰반환 영역 보여줌
        //$("#Tr_LoginShowFlag").show();												// 쿠폰표시 - 쿠폰표시 영역 보여줌
        $("#Tr_ApplyType").show();													// 사용범위 - 사용범위 역역 보여줌
        $("#Tr_NotApplyType").show();												// 제외범위 - 제외범위 역역 보여줌


        if (couponType == "05") {
            $("#Span_DistributeCount").show();
        }
        else {
            $("#Span_DistributeCount").hide();
        }
        //$("#Span_DistributeCount").hide();

    }
}

/* 쿠폰 사용기간 */
function chg_UseDateType(udt) {
    /* 기간설정 */
    if (udt == "P") {
        $("#Div_UseDateTypeP").show();
        $("#Div_UseDateTypeD").hide();
    }
    /* 사용가능일수설정 */
    else if (udt == "D") {
        $("#Div_UseDateTypeP").hide();
        $("#Div_UseDateTypeD").show();
    }
    /* 무제한사용가능 */
    else if (udt == "U") {
        $("#Div_UseDateTypeP").hide();
        $("#Div_UseDateTypeD").hide();
    }
}


/* 쿠폰 사용기간 설정의 배포기간과 동일 적용 */
function chk_SameFlag() {
    if ($("#sameFlag").is(":checked") == true) {
        $("#Div_UseDateTypeP > .div-line").hide();
    }
    else {
        $("#Div_UseDateTypeP > .div-line").show();
    }
}


/* 쿠폰 할인 구분(원, %) */
function chg_MoneyType(mType) {
    if (mType == "W") {
        $("#mType").text("원");
        //var shareMoneyType = $("input:radio[name='ShareMoneyType']:checked").val();
    }
    else {
        $("#mType").text("%");
        /* 할인이 %일때 분담율도 %로 설정 */
        //$("input:radio[name='ShareMoneyType']").eq(1).prop("checked", true);
    }
}


/* 결제금액 무제한 체크 */
function chk_NoLimitOrderPrice() {
    if ($("input:checkbox[name='noLimitOrderPrice']").eq(0).is(":checked")) {
        $("#orderSprice").val("");
        $("#orderSprice").css("background", "#f1f1f1");
        $("#orderSprice").attr("readonly", true);
        $("#orderEprice").val("");
        $("#orderEprice").css("background", "#f1f1f1");
        $("#orderEprice").attr("readonly", true);
    }
    else {
        $("#orderSprice").val("");
        $("#orderSprice").css("background", "#fff");
        $("#orderSprice").attr("readonly", false);
        $("#orderEprice").val("");
        $("#orderEprice").css("background", "#fff");
        $("#orderEprice").attr("readonly", false);
    }
}


/* 최대할인금액 */
function chg_LimitDiscountFlag(ldf) {
    if (ldf == "Y") {
        $("#limitDiscount").css("background", "#fff");
        $("#limitDiscount").attr("readonly", false);
    }
    else {
        $("#limitDiscount").val("");
        $("#limitDiscount").css("background", "#f1f1f1");
        $("#limitDiscount").attr("readonly", true);
    }
}


/* 최소사용금액 */
function chg_LimitPriceType(lpt) {
    if (lpt == "W") {
        $("#limitPrice").css("background", "#fff");
        $("#limitPrice").attr("readonly", false);
    }
    else if (lpt == "P") {
        $("#limitPrice").val("");
        $("#limitPrice").css("background", "#f1f1f1");
        $("#limitPrice").attr("readonly", true);
    }
    else {
        $("#limitPrice").val("");
        $("#limitPrice").css("background", "#f1f1f1");
        $("#limitPrice").attr("readonly", true);
    }
}


/* 발행수량 */
function chg_LimitDistributeFlag(ldf) {
    if (ldf == "Y") {
        $("#limitDistributeCount").css("background", "#fff");
        $("#limitDistributeCount").attr("readonly", false);
    }
    else {
        $("#limitDistributeCount").val("0");
        $("#limitDistributeCount").css("background", "#f1f1f1");
        $("#limitDistributeCount").attr("readonly", true);
    }
}
function init_LimitDistributeFlag() {
    var limitDistributeFlag = $("input:radio[name='limitDistributeFlag']:checked").val();
    chg_LimitDistributeFlag(limitDistributeFlag);
}

/* 발급방식 : 입력 */
function chg_DistributeType(dt) {
    var couponType = $("input:radio[name='couponType']:checked").val();
    if (couponType == "02") {
        if (dt == "D") {
            $("#Span_LimitDistributeFlagIY").show();									// 발급수량 - 제한수량 항목 보여줌
            $("#limitDistributeFlag1").prop("checked", true);

            $(".Span_GroupCode").hide();
            $(".Span_GroupCode").eq(0).show();
            $(".GroupCode").prop("checked", false);
            $(".GroupCode").eq(0).prop("checked", true);
        }
        else {
            $("#Span_LimitDistributeFlagIY").hide();									// 발급수량 - 제한수량 항목 보여줌
            $("#limitDistributeFlag1").prop("checked", true);

            $(".Span_GroupCode").show();
            $(".GroupCode").prop("checked", false);
        }

        init_LimitDistributeFlag();														// 발급수량 - 현재 선택된 발급수량 방식으로 초기화
    }
}
/* 발급방식 : 수정 */
function chg_MDistributeType(dt) {
    var couponType = $("input[name='couponType']").val();
    if (couponType == "02") {
        if (dt == "D") {
            $("#Span_LimitDistributeFlagIY").show();									// 발급수량 - 제한수량 항목 보여줌
            $("#limitDistributeFlag1").prop("checked", true);

            $(".Span_GroupCode").hide();
            $(".Span_GroupCode").eq(0).show();
            $(".GroupCode").prop("checked", false);
            $(".GroupCode").eq(0).prop("checked", true);
        }
        else {
            $("#Span_LimitDistributeFlagIY").hide();									// 발급수량 - 제한수량 항목 보여줌
            $("#limitDistributeFlag1").prop("checked", true);

            $(".Span_GroupCode").show();
            $(".GroupCode").prop("checked", false);
        }
        init_LimitDistributeFlag();														// 발급수량 - 현재 선택된 발급수량 방식으로 초기화
    }
}


/* 쿠폰입력폼체크 */
function ins_Coupon() {
    if (!check_CouponInfo("ins")) {
        return;
    }

    var conf = confirm("쿠폰을 등록 하시겠습니까?");
    if (conf) {
        openPop('loading');
        document.form.submit();
    }
}

/* 쿠폰수정폼체크 */
function mod_Coupon() {
    if (!check_CouponInfo("mod")) {
        return;
    }

    var conf = confirm("쿠폰을 수정 하시겠습니까?");
    if (conf) {
        openPop('loading');
        document.form.submit();
    }
}
/* 쿠폰정보 입력내역 체크 */
function check_CouponInfo(mode) {
    var idx, couponType, deliveryCouponFlag;
    if (mode == "ins") {
        idx = "";
        couponType = $("input:radio[name='couponType']:checked").val();
        deliveryCouponFlag = $("input:radio[name='deliveryCouponFlag']:checked").val();
    } else {
        idx = $("#idx").val();
        couponType = $("#couponType").val();
        deliveryCouponFlag = $("#deliveryCouponFlag").val();
    }

    if ($(".sflag:checked").length == 0) {
        alert("사용처를 하나 이상 선택하여 주십시오.");
        $("input:checkbox[name='pcFlag']").eq(0).focus();
        return false;
    }

    if ($(".mflag:checked").length == 0) {
        alert("발급대상회원을 하나 이상 선택하여 주십시오.");
        $("input:checkbox[name='publicFlag']").eq(0).focus();
        return false;
    }

    var couponName = alltrim($("#couponName").val());
    if (couponName.length == 0) {
        alert("쿠폰명을 입력하여 주십시오.");
        $("#couponName").focus();
        return false;
    }

    var distrubuteSYear = $("#distributeSYear").val();
    var distrubuteSMonth = $("#distributeSMonth").val();
    var distrubuteSDay = $("#distributeSDay").val();
    var distrubuteSHour = $("#distributeSHour").val();
    var distrubuteSMinute = $("#distributeSMinute").val();
    var distrubuteSDate = distrubuteSYear + distrubuteSMonth + distrubuteSDay + distrubuteSHour + distrubuteSMinute;

    var distrubuteEYear = $("#distributeEYear").val();
    var distrubuteEMonth = $("#distributeEMonth").val();
    var distrubuteEDay = $("#distributeEDay").val();
    var distrubuteEHour = $("#distributeEHour").val();
    var distrubuteEMinute = $("#distributeEMinute").val();
    var distrubuteEDate = distrubuteEYear + distrubuteEMonth + distrubuteEDay + distrubuteEHour + distrubuteEMinute;


    if (checkDate(distrubuteSYear, distrubuteSMonth, distrubuteSDay) == false) {
        alert("발급시작일자가 유효하지 않습니다.");
        $("#distributeSDay").focus();
        return false;
    }
    if (distrubuteSHour == "24" && distrubuteSMinute != "00") {
        alert("발급시작일자 시간을 24시로 선택시 00분을 선택해 주십시오.");
        $("#distributeSMinute").focus();
        return false;
    }
    if (checkDate(distrubuteEYear, distrubuteEMonth, distrubuteEDay) == false) {
        alert("발급종료일자가 유효하지 않습니다.");
        $("#distributeSDay").focus();
        return;
    }
    if (distrubuteEHour == "24" && distrubuteEMinute != "00") {
        alert("발급종료일자 시간을 24시로 선택시 00분을 선택해 주십시오.");
        $("#distributeEMinute").focus();
        return false;
    }

    if (parseFloat(distrubuteSDate) > parseFloat(distrubuteEDate)) {
        alert("발급종료일자를 시작일자 이후로 설정하여 주십시오.");
        $("#distributeEDay").focus();
        return false;
    }


    var useDateType = $("input:radio[name='useDateType']:checked").val();
    if (useDateType == "P") {
        var sameFlag = $("#sameFlag").is(":checked");
        if (sameFlag == false) {
            var useSYear = $("#useSYear").val();
            var useSMonth = $("#useSMonth").val();
            var useSDay = $("#useSDay").val();
            var useSHour = $("#useSHour").val();
            var useSMinute = $("#useSMinute").val();
            var useSDate = useSYear + useSMonth + useSDay + useSHour + useSMinute;

            var useEYear = $("#useEYear").val();
            var useEMonth = $("#useEMonth").val();
            var useEDay = $("#useEDay").val();
            var useEHour = $("#useEHour").val();
            var useEMinute = $("#useEMinute").val();
            var useEDate = useEYear + useEMonth + useEDay + useEHour + useEMinute;


            if (checkDate(useSYear, useSMonth, useSDay) == false) {
                alert("사용시작일자가 유효하지 않습니다.");
                $("#useSDay").focus();
                return false;
            }
            if (useSHour == "24" && useSMinute != "00") {
                alert("사용시작일자 시간을 24시로 선택시 00분을 선택해 주십시오.");
                $("#useSMinute").focus();
                return false;
            }
            if (checkDate(useEYear, useEMonth, useEDay) == false) {
                alert("사용종료일자가 유효하지 않습니다.");
                $("#useSDay").focus();
                return false;
            }
            if (useEHour == "24" && useEMinute != "00") {
                alert("사용종료일자 시간을 24시로 선택시 00분을 선택해 주십시오.");
                $("#useEMinute").focus();
                return false;
            }

            if (parseFloat(useSDate) > parseFloat(useEDate)) {
                alert("사용종료일자를 시작일자 이후로 설정하여 주십시오.");
                $("#useEDay").focus();
                return false;
            }
        }
    }
    else if (useDateType == "D") {
        var useDay = alltrim($("#useDay").val());
        if (useDay.length == 0) {
            alert("사용일자를 입력하여 주십시오.");
            $("#useDay").focus();
            return false;
        }
        if (only_Num(useDay) == 0) {
            alert("사용일자를 숫자로만 입력하여 주십시오.");
            $("#useDay").val("");
            $("#useDay").focus();
            return false;
        }
    }


    if (deliveryCouponFlag == "N") {

        var discount = alltrim($("#discount").val());
        var moneyType = $("input:radio[name='moneyType']:checked").val();

        if (moneyType == "W") {
            if (discount.length == 0) {
                alert("할인금액을 입력하여 주십시오.");
                $("#discount").focus();
                return false;
            }
            if (only_Num(discount) == false) {
                alert("할인금액을 숫자로만 입력하여 주십시오.");
                $("#discount").val("");
                $("#discount").focus();
                return false;
            }
            if (parseFloat(discount) > 99000) {
                alert("할인금액은 99,000원을 초과할 수 없습니다.");
                $("#discount").val("");
                $("#discount").focus();
                return false;
            }
        }
        else {
            if (discount.length == 0) {
                alert("할인율을 입력하여 주십시오.");
                $("#discount").focus();
                return false;
            }
            if (only_Num2(discount) == false) {
                alert("할인율을 숫자와 '.'로만 입력하여 주십시오.");
                $("#discount").val("");
                $("#discount").focus();
                return false;
            }
            if (couponName.indexOf('[블프]') == -1) {	//블랙프라이데이 예외
                if (parseFloat(discount) > 50) {
                    alert("할인율은 50%를 초과할 수 없습니다.");
                    $("#discount").val("");
                    $("#discount").focus();
                    return false;
                }
            }
        }

        /* 구매금액별 쿠폰 */
        if (couponType == "07") {
            if ($("input:checkbox[name='noLimitOrderPrice']").eq(0).is(":checked") == false) {
                var orderSPrice = $("#orderSprice").val();
                if (orderSPrice == "") {
                    alert("결제 시작 금액을 입력하여 주십시오.");
                    $("#orderSprice").focus();
                    return false;
                }
                if (only_Num(orderSPrice) == false) {
                    alert("결제 시작 금액을 숫자로만 입력하여 주십시오.");
                    $("#orderSprice").val("");
                    $("#orderSprice").focus();
                    return false;
                }
                var orderEPrice = $("#orderEprice").val();
                if (orderSPrice == "") {
                    alert("결제 종료 금액을 입력하여 주십시오.");
                    $("#orderEprice").focus();
                    return false;
                }
                if (only_Num(orderEPrice) == false) {
                    alert("결제 종료 금액을 숫자로만 입력하여 주십시오.");
                    $("#orderEprice").val("");
                    $("#orderEprice").focus();
                    return false;
                }

                if (parseFloat(orderSPrice) >= parseFloat(orderEPrice)) {
                    alert("결제 시작 금액을 결제 종료 금액보다 작게 입력하여 주십시오.");
                    $("#orderSprice").focus();
                    return false;
                }
            }
        }


        var limitDiscountFlag = $("input:radio[name='limitDiscountFlag']:checked").val();
        if (limitDiscountFlag == "Y") {
            var limitDiscount = alltrim($("#limitDiscount").val());
            if (limitDiscount.length == 0) {
                alert("최대 할인금액을 입력하여 주십시오.");
                $("#limitDiscount").focus();
                return false;
            }
            if (only_Num(limitDiscount) == false) {
                alert("최대 할인금액을 숫자로만 입력하여 주십시오.");
                $("#limitDiscount").val("");
                $("#limitDiscount").focus();
                return false;
            }
        }


        var limitPriceType = $("input:radio[name='limitPriceType']:checked").val();
        if (limitPriceType == "W") {
            var limitPrice = alltrim($("#limitPrice").val());
            if (limitPrice.length == 0) {
                alert("최소 사용금액을 입력하여 주십시오.");
                $("#limitPrice").focus();
                return false;
            }
            if (only_Num(limitPrice) == false) {
                alert("최소 사용금액을 숫자로만 입력하여 주십시오.");
                $("#limitPrice").val("");
                $("#limitPrice").focus();
                return false;
            }
        }
    }


    var limitDistributeFlag = $("input:radio[name='limitDistributeFlag']:checked").val();
    if (limitDistributeFlag == "Y") {
        var limitDistributeCount = alltrim($("#limitDistributeCount").val());
        if (limitDistributeCount.length == 0) {
            alert("발급수량을 입력하여 주십시오.");
            $("#limitDistributeCount").focus();
            return false;
        }
        if (only_Num(limitDistributeCount) == false) {
            alert("발급수량을 숫자로만 입력하여 주십시오.");
            $("#limitDistributeCount").val("");
            $("#limitDistributeCount").focus();
            return false;
        }
    }

    //if (couponType == "06" && deliveryCouponFlag == "Y") {
    /* 회원등급별 쿠폰 */
    if (couponType == "05") {
        var distributeCount = alltrim($("#distributeCount").val());
        if (distributeCount.length == "") {
            alert("발급수량을 입력하여 주십시오.");
            $("#distributeCount").focus();
            return false;
        }
        if (only_Num(distributeCount) == false) {
            alert("발급수량을 숫자로만 입력하여 주십시오.");
            $("#distributeCount").val("");
            $("#distributeCount").focus();
            return false;
        }
    }

    if (deliveryCouponFlag == "N") {
        var applyType = $("input:radio[name='applyType']:checked").val();
        if (applyType == "P") {
            var applyProduct = getCookie("CAPNUM" + idx);
            if (applyProduct == "") {
                alert("사용범위의 상품을 검색하여 선택하여 주십시오.");
                return false;
            }
        }
        else if (applyType == "C") {
            var applyCategory = getCookie("CACNUM" + idx);
            if (applyCategory == "") {
                alert("사용범위의 분류를 검색하여 선택하여 주십시오.");
                return false;
            }
        }
        else if (applyType == "B") {
            var applyBrand = getCookie("CABNUM" + idx);
            if (applyBrand == "") {
                alert("사용범위의 브랜드 검색하여 선택하여 주십시오.");
                return false;
            }
        }
        var notApplyType = $("input:radio[name='notApplyType']:checked").val();
        if (notApplyType == "P") {
            var notApplyProduct = getCookie("CEPNUM" + idx);
            if (notApplyProduct == "") {
                alert("제외범위의 상품을 검색하여 선택하여 주십시오.");
                return false;
            }
        }
        else if (notApplyType == "C") {
            var notApplyCategory = getCookie("CECNUM" + idx);
            if (notApplyCategory == "") {
                alert("제외범위의 분류를 검색하여 선택하여 주십시오.");
                return false;
            }
        }
        else if (notApplyType == "B") {
            var notApplyBrand = getCookie("CEBNUM" + idx);
            if (notApplyBrand == "") {
                alert("제외범위의 브랜드 검색하여 선택하여 주십시오.");
                return false;
            }
        }
    }

    /* 일반배포쿠폰, 회원등급별쿠폰 */
    if (couponType == "02" || couponType == "05") {
        if ($("input:checkbox[name='groupcode']:checked").length == 0) {
            alert("발급 대상을 적어도 하나는 선택하셔야 됩니다.");
            return false;
        }
    }

    return true;
}

/* 일자 선택 */
function chg_Date(dv, td) {
    var year = $("#" + dv + "Year").val();
    var month = $("#" + dv + "Month").val();
    var oDay = $("#" + dv + "Day");

    var days = get_Days(year, month);

    oDay.empty();

    var val = "";
    for (var i = 1; i <= days; i++) {
        val = "0" + i;
        val = val.substr(val.length - 2, 2);
        oDay.append(new Option(val, val));
    }

    if (td != "") {
        oDay.val(td);
    }
}
function get_Days(y, m) {
    var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var today = new Date();
    var year = parseInt(y);
    var month = parseInt(m);

    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        lastDate[1] = 29;
    }
    else {
        lastDate[1] = 28;
    }

    return lastDate[m - 1];
}


/* 일자 선택 - 리스트 */
function chg_LDate(dv, mn, td) {
    var year = $("#" + dv + "Year" + mn).val();
    var month = $("#" + dv + "Month" + mn).val();
    var oDay = $("#" + dv + "Day" + mn);

    var days = get_Days(year, month);

    oDay.empty();

    var val = "";
    for (var i = 1; i <= days; i++) {
        val = "0" + i;
        val = val.substr(val.length - 2, 2);
        oDay.append(new Option(val, val));
    }

    if (td != "") {
        oDay.val(td);
    }
}

/* 쿠폰 적용 대상 팝업 - 입력 */
function pop_TempApplyCoupon(aType, aCls) {
    if (aCls == "P") {
        window.open("/design/coupon/popup/tempSearchProduct?applyType=" + aType, "CouponProduct", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (aCls == "C") {
        window.open("/design/coupon/popup/tempSearchCategory?applyType=" + aType, "CouponCategory", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (aCls == "B") {
        window.open("/design/coupon/popup/tempSearchBrand?applyType=" + aType, "CouponBrand", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
}
/* 쿠폰 적용 대상 팝업 - 수정 */
function pop_ModifyApplyCoupon(aType, aCls) {
    var idx = $("#idx").val();

    if (aCls == "P") {
        window.open("/design/coupon/popup/modifyRegistedProduct?idx=" + idx + "&applyType=" + aType, "CouponProduct", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (aCls == "C") {
        window.open("/design/coupon/popup/modifySearchCategory?idx=" + idx + "&applyType=" + aType, "CouponCategory", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (aCls == "B") {
        window.open("/design/coupon/popup/modifySearchBrand?idx=" + idx + "&applyType=" + aType, "CouponBrand", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
}

/* 상품검색 */
function sch_Product(page) {
    $("#page").val(page);
    document.form.target = "_self";
    document.form.action = "?";
    document.form.submit();
}

/* 쿠폰적용상품 리스트 */
function sch_Product1(page) {
    $("#page").val(page);
    document.sForm.target = "_self";
    document.sForm.action = "?";
    document.sForm.submit();
}

/* 상품 등록 - 입력/수정/삭제 */
function proc_CouponProduct(mode, tType, apType) {
    var url = "";
    var procNm = "";
    if (mode == "ins") {
        procNm = "등록";
        if (tType == "temp") {
            url = "/design/coupon/ajax/tempCouponProductAddOk";
        } else {
            url = "/design/coupon/ajax/modifyCouponProductAddOk";
        }
    }
    else if (mode == "del") {
        procNm = "삭제";
        if (tType == "temp") {
            url = "/design/coupon/ajax/tempCouponProductDeleteOk";
        } else {
            url = "/design/coupon/ajax/modifyCouponProductDeleteOk";
        }
    }
    else {
        alert("처리구분을 확인하세요.");
        return;
    }
    var aType = $("#applyType").val();
    var productCode = "";
    var tData = "";
    // 선택상품
    if (apType == "P") {
        $("input:checkbox[name='productcode']:checked").each(function () {
            if (productCode == "") {
                productCode = $(this).val();
            }
            else {
                productCode += "//" + $(this).val();
            }
        });

        if (productCode == "") {
            alert(procNm + "할 상품을 선택하여 주십시오.");
            return;
        }

        if (tType == "temp") {
            tData = "aType=" + aType + "&apType=" + apType + "&productcode=" + productCode;
        } else {
            tData = "idx=" + $("#idx").val() + "&aType=" + aType + "&apType=" + apType + "&productcode=" + productCode;
        }
    }
    // 검색상품
    else {
        if (tType == "temp") {
            if ($("input[name='aType']", "form[name='sForm']").val() == undefined) {
                alert("검색 후 실행하여 주시오.");
                return;
            }
        } else {
            if ($("input[name='idx']", "form[name='sForm']").val() == undefined) {
                alert("검색 후 실행하여 주시오.");
                return;
            }
        }

        $("input[name='apType']", "form[name='sForm']").val(apType);
        tData = $("form[name='sForm']").serialize();
    }


    var msg = "";
    if (apType == "A") { msg = "검색된 상품을 " + procNm + " 하시겠습니까?"; }
    else { msg = "선택하신 상품을 " + procNm + " 하시겠습니까?"; }

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "post",
            url: url,
            async: false,
            data: tData,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];


                if (result == "OK") {
                    alert(procNm + " 되었습니다.");
                    document.form.submit();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}


/* 분류 등록 - 입력, 수정, 삭제 */
function proc_CouponCategory(tType, apType) {
    var procNm = "";
    if (apType == "S") {
        procNm = "등록";
    }
    else if (apType == "D") {
        procNm = "초기화";
    }
    else {
        alert("처리구분을 확인하세요.");
        return;
    }
    var aType = $("#aType").val();
    var categoryCode = "";
    if (apType == "S") {
        $("input:checkbox[name='categoryCode2']:checked").each(function () {
            if (categoryCode == "") {
                categoryCode = $(this).val();
            }
            else {
                categoryCode += "//" + $(this).val();
            }
        });

        if (categoryCode == "") {
            alert("등록할 분류를 선택하여 주십시오.");
            return;
        }

    }

    var url = "";
    var tData = "";
    if (tType == "temp") {
        url = "/design/coupon/ajax/tempCouponCategoryAddOk";
        tData = "aType=" + aType + "&apType=" + apType + "&categorycode=" + categoryCode;
    } else {
        url = "/design/coupon/ajax/modifyCouponCategoryAddOk";
        tData = "idx=" + $("#idx").val() + "&aType=" + aType + "&apType=" + apType + "&categorycode=" + categoryCode;
    }

    var msg = procNm + " 하시겠습니까?";

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "post",
            url: url,
            async: false,
            data: tData,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];


                if (result == "OK") {
                    alert(procNm + " 되었습니다.");
                    document.form.submit();
                    return;
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}


/* 브랜드 등록 - 입력 */
function proc_CouponBrand(tType, apType) {
    var procNm = "";
    if (apType == "S") {
        procNm = "등록";
    }
    else if (apType == "D") {
        procNm = "초기화";
    }
    else {
        alert("처리구분을 확인하세요.");
        return;
    }
    var aType = $("#aType").val();
    var brandCode = "";
    if (apType == 'S') {
        $("input:checkbox[name='BrandCode']:checked").each(function () {
            if (brandCode == "") {
                brandCode = $(this).val();
            }
            else {
                brandCode += "//" + $(this).val();
            }
        });

        if (brandCode == "") {
            alert("등록할 브랜드를 선택하여 주십시오.");
            return;
        }
    }

    var url = "";
    var tData = "";
    if (tType == "temp") {
        url = "/design/coupon/ajax/tempCouponBrandAddOk";
        tData = "aType=" + aType + "&apType=" + apType + "&brandcode=" + brandCode;
    } else {
        url = "/design/coupon/ajax/modifyCouponBrandAddOk";
        tData = "idx=" + $("#idx").val() + "&aType=" + aType + "&apType=" + apType + "&brandcode=" + brandCode;
    }

    var msg = procNm + " 하시겠습니까?";

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "post",
            url: url,
            async: false,
            data: tData,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];


                if (result == "OK") {
                    alert(procNm + " 되었습니다.");
                    document.form.submit();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}

/* 쿠폰 관련 팝업 */
function pop_Coupon(couponIdx, pType) {
    if (pType == "MM") {
        window.open("/design/coupon/popup/couponMemberList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (pType == "AP") {
        window.open("/design/coupon/popup/couponProductList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (pType == "AC") {
        window.open("/design/coupon/popup/couponCategoryList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (pType == "AB") {
        window.open("/design/coupon/popup/couponBrandList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (pType == "NP") {
        window.open("/design/coupon/popup/couponExceptProductList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (pType == "NC") {
        window.open("/design/coupon/popup/couponExceptCategoryList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
    else if (pType == "NB") {
        window.open("/design/coupon/popup/couponExceptBrandList?couponIdx=" + couponIdx, "CInfo", "width=1260, height=900, top=10, left=10, scrollbars=yes").focus();
    }
}

/* 쿠폰적용상품 엑셀 다운 */
function couponProductList_downExcel() {
    document.form.target = "_self";
    document.form.action = "/design/coupon/cxcel/couponProductListExcel";
    document.form.submit();
}

/* 쿠폰 발급 회원 엑셀 다운 */
function couponMemberList_downExcel() {
    document.form1.target = "_self";
    document.form1.action = "/design/coupon/excel/couponMemberListExcel";
    document.form1.submit();
}

/* 쿠폰 회원 엑셀업로드 창 */
function pop_CouponMemberExcelUpload(couponidx) {
    window.open("/design/coupon/popup/couponMemberExcelAdd?couponIDX=" + couponidx, "CouponMemberExcel", "width=1024, height=830, top=10, left=10, scrollbars=yes").focus();
}

/* 쿠폰 회원 발급 엑셀 업로드 */
function CouponMemberExcelUpload() {
    var fileName = alltrim($("#fileName").val());
    if (fileName.length == 0) {
        alert("엑셀 파일이 입력되지 않았습니다.");
        form.fileName.focus();
        return false;
    }
    if (fileName.length != 0) {
        lng = fileName.length;
        ext = fileName.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".xls" || ext == "xlsx")) {
            alert("엑셀파일만 입력가능합니다.");
            form.fileName.focus();
            return false;
        }
    }

    document.form.submit();
}

/* 쿠폰 회원 엑셀업로드 오류 엑셀 다운 */
function couponMemberExcelErrorDown() {
    location.href = '/design/coupon/excel/couponMemberExcelAddErrorDown';
}

/* 쿠폰 회원 추가 팝업 */
function pop_AddCouponMember(couponIdx) {
    window.open("/design/coupon/popup/couponMemberAdd?couponIdx=" + couponIdx, "CouponMember", "width=1260, height=900, top=10, left=100, scrollbars=yes").focus();
}


/* 회원 쿠폰 추가 발급 처리 */
function add_CouponMember(num) {
    var couponIdx = $("input[name='couponIdx']").val();
    var useDateType = $("input[name='useDateType']").val();
    var memberNum = $("input[name='memberNum']").eq(num - 1).val();

    var distributeCnt = $("input[name='distributeCnt']").eq(num - 1).val();

    var useSYear = $("#useSYear" + memberNum).val();
    var useSMonth = $("#useSMonth" + memberNum).val();
    var useSDay = $("#useSDay" + memberNum).val();
    var useSHour = $("#useSHour" + memberNum).val();
    var useSMinute = $("#useSMinute" + memberNum).val();
    var useSDate = useSYear + useSMonth + useSDay + useSHour + useSMinute;

    var useEYear = "";
    var useEMonth = "";
    var useEDay = "";
    var useEHour = "";
    var useEMinute = "";
    var useEDate = "";

    if (useDateType == "U") {
        useEYear = "9999";
        useEMonth = "99";
        useEDay = "99";
        useEHour = "99";
        useEMinute = "99";
        useEDate = useEYear + useEMonth + useEDay + useEHour + useEMinute;
    }
    else {
        useEYear = $("#useEYear" + memberNum).val();
        useEMonth = $("#useEMonth" + memberNum).val();
        useEDay = $("#useEDay" + memberNum).val();
        useEHour = $("#useEHour" + memberNum).val();
        useEMinute = $("#useEMinute" + memberNum).val();
        useEDate = useEYear + useEMonth + useEDay + useEHour + useEMinute;
    }


    if (checkDate(useSYear, useSMonth, useSDay) == false) {
        alert("사용시작일자가 유효하지 않습니다.");
        $("#useSDay").focus();
        return;
    }
    if (useSHour == "24" && useSMinute != "00") {
        alert("사용시작일자 시간을 24시로 선택시 00분을 선택해 주십시오.");
        $("#useSMinute").focus();
        return;
    }
    if (checkDate(useEYear, useEMonth, useEDay) == false) {
        alert("사용종료일자가 유효하지 않습니다.");
        $("#useSDay").focus();
        return;
    }
    if (useEHour == "24" && useEMinute != "00") {
        alert("사용종료일자 시간을 24시로 선택시 00분을 선택해 주십시오.");
        $("#useEMinute").focus();
        return;
    }

    if (parseFloat(useSDate) > parseFloat(useEDate)) {
        alert("사용종료일자를 시작일자 이후로 설정하여 주십시오.");
        $("#useEDay").focus();
        return;
    }

    $.ajax({
        type: "POST",
        url: "/design/coupon/ajax/couponMemberAddOk",
        async: false,
        data: "couponIdx=" + couponIdx + "&memberNum=" + memberNum + "&useSdate=" + useSDate + "&useEdate=" + useEDate + "&distributeCnt=" + distributeCnt,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];


            if (result == "OK") {
                alert("추가 되었습니다.");
                PageReload();
                opener.PageReload();
                opener.opener.PageReload();
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 회원 쿠폰 삭제 */
function del_OneCouponMember(couponIdx, idx) {
    var conf = confirm("삭제 하시겠습니까?");
    if (conf) {
        del_CouponMember(couponIdx, idx);
    }
}
function del_AllCouponMember(couponIdx) {
    var idx = "";
    var idxCnt = $("input:checkbox[name='idx']").length;

    if (idxCnt > 0) {
        $("input:checkbox[name='idx']").each(function (num) {
            if ($(this).is(":checked")) {
                if (idx == "") {
                    idx = $("input:checkbox[name='idx']").eq(num).val();
                }
                else {
                    idx = idx + "," + $("input:checkbox[name='idx']").eq(num).val();
                }
            }
        });

        if (idx == "") {
            alert("일괄 삭제할 항목을 선택해 주십시오.");
        }
        else {
            var conf = confirm("삭제 하시겠습니까?");
            if (conf) {
                del_CouponMember(couponIdx, idx);
            }
        }
    }
}
function del_CouponMember(couponIdx, idx) {
    $.ajax({
        type: "POST",
        url: "/design/coupon/ajax/couponMemberDeleteOk",
        async: false,
        data: "couponIdx=" + couponIdx + "&idx=" + idx,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];


            if (result == "OK") {
                alert("삭제 되었습니다.");
                PageReload();
                opener.PageReload();
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

function getCookie(name) {
    var search = name + "=";

    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        offset = document.cookie.indexOf(search); //일단 찾아봅니다.

        if (offset != -1) { // 쿠키가 존재하면 (Name이름으로된 쿠키가 있으면
            //(정확히는 Name의 이름이 시작되는 위치가 반환되는데 -1이면 없다는 뜻입니다.
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1)
                end = document.cookie.length;

            return unescape(document.cookie.substring(offset, end));
            //UrlEncode된 값을 다시 변환해서 반환.
        }
    }
    return ""; //여기까기 흘러오면 해당 쿠키가 없는걸로 간주함.
}

function pop_AddCouponProduct(couponIdx) {
    window.open("/design/coupon/popup/couponProductAdd?couponIdx=" + couponIdx, "CouponProduct", "width=1260, height=900, top=10, left=100, scrollbars=yes").focus();
}


function add_OneCouponProduct(couponIdx, productCode) {
    var conf = confirm("등록 하시겠습니까?");
    if (conf) {
        add_CouponProduct(couponIdx, productCode);
    }
}

function add_SelCouponProduct(couponIdx) {
    var productCode = "";
    var productCnt = $("input:checkbox[name='productcode']").length;

    if (productCnt > 0) {
        $("input:checkbox[name='productcode']").each(function (num) {
            if ($(this).is(":checked")) {
                if (productCode == "") {
                    productCode = $("input:checkbox[name='productcode']").eq(num).val();
                }
                else {
                    productCode = productCode + "," + $("input:checkbox[name='productcode']").eq(num).val();
                }
            }
        });

        if (productCode == "") {
            alert("일괄 등록할 상품을 선택해 주십시오.");
        }
        else {
            var conf = confirm("등록 하시겠습니까?");
            if (conf) {
                add_CouponProduct(couponIdx, productCode);
            }
        }
    }
}

function add_AllCouponProduct(couponIdx) {
    var conf = confirm("검색된 상품 전체를 등록 하시겠습니까?");
    if (conf) {
        add_CouponProduct(couponIdx, "ALL");
    }
}

function add_CouponProduct(couponIdx, productCode) {
    var tData = "";
    if (productCode == "ALL") {
        tData = $("form[name='sForm']").serialize();
    }
    else {
        tData = "couponIdx=" + couponIdx + "&productcode=" + productCode;
    }

    $.ajax({
        type: "POST",
        url: "/design/coupon/ajax/couponProductAddOk",
        async: false,
        data: tData,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];

            if (result == "OK") {
                alert("등록 되었습니다.");
                PageReload();
                opener.PageReload();
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 적용상품 삭제 */
function del_OneCouponProduct(couponIdx, productCode) {
    var conf = confirm("삭제 하시겠습니까?");
    if (conf) {
        del_CouponProduct(couponIdx, productCode);
    }
}

/* 선택 적용상품 삭제 */
function del_SelCouponProduct(couponIdx) {
    var productCode = "";
    var productCnt = $("input:checkbox[name='productcode']").length;

    if (productCnt > 0) {
        $("input:checkbox[name='productcode']").each(function (num) {
            if ($(this).is(":checked")) {
                if (productCode == "") {
                    productCode = $("input:checkbox[name='productcode']").eq(num).val();
                }
                else {
                    productCode = productCode + "," + $("input:checkbox[name='productcode']").eq(num).val();
                }
            }
        });

        if (productCode == "") {
            alert("일괄 삭제할 상품을 선택해 주십시오.");
            return;
        }
        else {
            var conf = confirm("삭제 하시겠습니까?");
            if (conf) {
                del_CouponProduct(couponIdx, productCode);
            }
        }
    }
}

/* 적용상품 전체 삭제 */
function del_AllCouponProduct(couponIdx) {
    var conf = confirm("상품 전체를 삭제 하시겠습니까?");
    if (conf) {
        del_CouponProduct(couponIdx, "ALL");
    }
}

/* 검색상품 전체 삭제 */
function del_SearchCouponProduct(couponIdx) {
    var conf = confirm("검색상품 전체를 삭제 하시겠습니까?");
    if (conf) {
        del_CouponProduct(couponIdx, "SEARCH");
    }
}


function del_CouponProduct(couponIdx, productCode) {
    var tData = "";
    if (productCode == "SEARCH") {
        tData = $("form[name='sForm']").serialize();
    }
    else {
        tData = "couponIdx=" + couponIdx + "&productcode=" + productCode;
    }

    $.ajax({
        type: "POST",
        url: "/design/coupon/ajax/couponProductDeleteOk",
        async: false,
        data: tData,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];

            if (result == "OK") {
                alert("삭제 되었습니다.");
                PageReload();
                opener.PageReload();
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

function pop_AddCouponExceptProduct(couponIdx) {
    window.open("/design/coupon/popup/couponExceptProductAdd?couponIdx=" + couponIdx, "CouponProduct", "width=1260, height=900, top=10, left=100, scrollbars=yes").focus();
}


function add_OneCouponExceptProduct(couponIdx, productCode) {
    var conf = confirm("제외 상품으로 등록 하시겠습니까?");
    if (conf) {
        add_CouponExceptProduct(couponIdx, productCode);
    }
}

function add_SelCouponExceptProduct(couponIdx) {
    var productCode = "";
    var productCnt = $("input:checkbox[name='productcode']").length;

    if (productCnt > 0) {
        $("input:checkbox[name='productcode']").each(function (num) {
            if ($(this).is(":checked")) {
                if (productCode == "") {
                    productCode = $("input:checkbox[name='productcode']").eq(num).val();
                }
                else {
                    productCode = productCode + "," + $("input:checkbox[name='productcode']").eq(num).val();
                }
            }
        });

        if (productCode == "") {
            alert("일괄 제외 등록할 상품을 선택해 주십시오.");
            return;
        }
        else {
            var conf = confirm("제외 상품으로 등록 하시겠습니까?");
            if (conf) {
                add_CouponExceptProduct(couponIdx, productCode);
            }
        }
    }
}

function add_AllCouponExceptProduct(couponIdx) {
    var conf = confirm("검색된 상품 전체를 제외 등록 하시겠습니까?");
    if (conf) {
        add_CouponExceptProduct(couponIdx, "ALL");
    }
}

function add_CouponExceptProduct(couponIdx, productCode) {
    var tData = "";
    if (productCode == "ALL") {
        tData = $("form[name='sForm']").serialize();
    }
    else {
        tData = "couponIdx=" + couponIdx + "&productCode=" + productCode;
    }

    $.ajax({
        type: "post",
        url: "/design/coupon/Ajax/couponExceptProductAddOk",
        async: false,
        data: tData,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];


            if (result == "OK") {
                alert("제외 상품으로 등록 되었습니다.");
                PageReload();
                opener.PageReload();
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert(data.responseText)
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 제외상품 삭제 */
function del_OneCouponExceptProduct(couponIdx, productCode) {
    var conf = confirm("삭제 하시겠습니까?");
    if (conf) {
        del_CouponExceptProduct(couponIdx, productCode);
    }
}

/* 선택 제외상품 삭제 */
function del_SelCouponExceptProduct(couponIdx) {
    var productCode = "";
    var productCnt = $("input:checkbox[name='productcode']").length;

    if (productCnt > 0) {
        $("input:checkbox[name='productcode']").each(function (num) {
            if ($(this).is(":checked")) {
                if (productCode == "") {
                    productCode = $("input:checkbox[name='productcode']").eq(num).val();
                }
                else {
                    productCode = productCode + "," + $("input:checkbox[name='productcode']").eq(num).val();
                }
            }
        });

        if (productCode == "") {
            alert("일괄 삭제할 상품을 선택해 주십시오.");
            return;
        }
        else {
            var conf = confirm("삭제 하시겠습니까?");
            if (conf) {
                del_CouponExceptProduct(couponIdx, productCode);
            }
        }
    }
}

/* 제외상품 전체 삭제 */
function del_AllCouponExceptProduct(couponIdx) {
    var conf = confirm("상품 전체를 삭제 하시겠습니까?");
    if (conf) {
        del_CouponExceptProduct(couponIdx, "ALL");
    }
}

function del_CouponExceptProduct(couponIdx, productCode) {
    $.ajax({
        type: "POST",
        url: "/design/coupon/ajax/couponExceptProductDeleteOk",
        async: false,
        data: "couponIdx=" + couponIdx + "&productcode=" + productCode,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];

            if (result == "OK") {
                alert("삭제 되었습니다.");
                PageReload();
                opener.PageReload();
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 분류 등록 - 수정 */
function add_CouponCategory(apType) {
    var couponIdx = $("#couponIdx").val();
    var categoryCode = "";
    if (apType == "S") {
        $("input:checkbox[name='categoryCode2']:checked").each(function () {
            if (categoryCode == "") {
                categoryCode = $(this).val();
            }
            else {
                categoryCode += "//" + $(this).val();
            }
        });

        if (categoryCode == "") {
            alert("등록할 분류를 선택하여 주십시오.");
            return;
        }
    }


    var msg = "";
    if (apType == "D") { msg = "초기화 하시겠습니까?"; }
    else { msg = "등록 하시겠습니까?"; }

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "POST",
            url: "/design/coupon/ajax/couponCategoryAddOk",
            async: false,
            data: "couponIdx=" + couponIdx + "&categorycode=" + categoryCode,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "OK") {
                    if (apType == "D") {
                        alert("초기화 되었습니다.");
                    }
                    else {
                        alert("등록 되었습니다.");
                    }

                    document.form.submit();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}

/* 분류 등록 - 수정 */
function add_CouponExceptCategory(apType) {
    var couponIdx = $("#couponIdx").val();
    var categoryCode = "";
    if (apType == "S") {
        $("input:checkbox[name='categorycode2']:checked").each(function () {
            if (categoryCode == "") {
                categoryCode = $(this).val();
            }
            else {
                categoryCode += "//" + $(this).val();
            }
        });

        if (categoryCode == "") {
            alert("제외 등록할 분류를 선택하여 주십시오.");
            return;
        }
    }


    var msg = "";
    if (apType == "D") { msg = "초기화 하시겠습니까?"; }
    else { msg = "제외 분류로 등록 하시겠습니까?"; }

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "POST",
            url: "/design/coupon/ajax/couponExceptCategoryAddOk",
            async: false,
            data: "couponIdx=" + couponIdx + "&categorycode=" + categoryCode,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "OK") {
                    if (apType == "D") {
                        alert("초기화 되었습니다.");
                    }
                    else {
                        alert("등록 되었습니다.");
                    }

                    document.form.submit();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}

/* 브랜드 등록 - 수정 */
function add_CouponBrand(apType) {
    var couponIdx = $("#couponIdx").val();
    var brandCode = "";
    if (apType == 'S') {
        $("input:checkbox[name='brandcode']:checked").each(function () {
            if (brandCode == "") {
                brandCode = $(this).val();
            }
            else {
                brandCode += "//" + $(this).val();
            }
        });

        if (brandCode == "") {
            alert("등록할 브랜드를 선택하여 주십시오.");
            return;
        }
    }


    var msg = "";
    if (apType == "D") { msg = "초기화 하시겠습니까?"; }
    else { msg = "등록 하시겠습니까?"; }

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "POST",
            url: "/design/coupon/ajax/couponBrandAddOk",
            async: false,
            data: "couponIdx=" + couponIdx + "&brandcode=" + brandCode,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "OK") {
                    if (apType == "D") {
                        alert("초기화 되었습니다.");
                    }
                    else {
                        alert("등록 되었습니다.");
                    }

                    document.form.submit();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}

/* 브랜드 등록 - 수정 */
function add_CouponExceptBrand(apType) {
    var couponIdx = $("#couponIdx").val();
    var brandCode = "";
    if (apType == 'S') {
        $("input:checkbox[name='brandcode']:checked").each(function () {
            if (brandCode == "") {
                brandCode = $(this).val();
            }
            else {
                brandCode += "//" + $(this).val();
            }
        });

        if (brandCode == "") {
            alert("제외 등록할 브랜드를 선택하여 주십시오.");
        }
    }


    var msg = "";
    if (apType == "D") { msg = "초기화 하시겠습니까?"; }
    else { msg = "제외 브랜드로 등록 하시겠습니까?"; }

    var conf = confirm(msg);
    if (conf) {
        $.ajax({
            type: "POST",
            url: "/design/coupon/ajax/couponExceptBrandAddOk",
            async: false,
            data: "couponIdx=" + couponIdx + "&brandcode=" + brandCode,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "OK") {
                    if (apType == "D") {
                        alert("초기화 되었습니다.");
                    }
                    else {
                        alert("등록 되었습니다.");
                    }

                    document.form.submit();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}

/* 쿠폰 복사 */
function copy_Coupon(couponIdx, couponName) {
    var conf = confirm("쿠폰을 복사 하시겠습니까?\n\n" + couponName);
    if (conf) {
        $.ajax({
            type: "POST",
            url: "/design/coupon/ajax/couponCopyOk",
            async: false,
            data: "couponIdx=" + couponIdx,
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "OK") {
                    alert("복사 되었습니다.");
                    PageReload();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}
/* 쿠폰 삭제확인 팝업 */
function del_CouponForm(couponIdx) {
    $.ajax({
        type: "POST",
        url: "/design/coupon/ajax/couponDeleteForm",
        async: false,
        data: "couponIdx=" + couponIdx,
        dataType: "text",
        success: function (data) {
            var splitData = data.split("|||||");
            var result = splitData[0];
            var cont = splitData[1];

            if (result == "OK") {
                $("#popup").html(cont);
                $("#popup").css({ 'top': '50%', 'left': '50%', 'width': 640 });
                openPop('popup');
            }
            else if (result == "LOGIN") {
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error: function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}
/* 쿠폰 삭제 */
function del_Coupon() {
    var conf = confirm("쿠폰을 삭제 하시겠습니까?");
    if (conf) {
        $.ajax({
            type: "POST",
            url: "/design/coupon/ajax/couponDeleteOk",
            async: false,
            data: $("#delCouponForm").serialize(),
            dataType: "text",
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "OK") {
                    alert("삭제 되었습니다.");
                    PageReload();
                }
                else if (result == "LOGIN") {
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error: function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}
