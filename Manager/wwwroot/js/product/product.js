/***********************************************************************************************/
/* 상품엑셀입력
/***********************************************************************************************/

/* 상품 엑셀업로드 */
function ins_ProductExcel() {
    var fileName = alltrim($("#FileName").val());
    if (fileName.length == 0) {
        alert("엑셀 파일을 입력하여 주십시오.");
        $("#FileName").focus();
        return;
    }
    if (fileName.length != 0) {
        lng = fileName.length;
        ext = fileName.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".xls" || ext == "xlsx")) {
            alert("엑셀파일만 입력 가능합니다.");
            $("#FileName").focus();
            return;
        }
    }

    document.form.submit();
}

/* 상품 리스트 일괄수정 */
function mod_SelSaleState() {
    var cnt = $("input:checkbox[name='ProductCode']").length;
    if (cnt > 0) {
        var chkCnt = $("input:checkbox[name='ProductCode']:checked").length;
        if (chkCnt == 0) {
            alert("일괄 수정할 상품을 선택하여 주십시오.");
            return;
        }

        var productCodes = "";
        var offFlags	 = "";
        var saleStates	 = "";
        $("input:checkbox[name='ProductCode']:checked").each(function () {
            var idx = $("input:checkbox[name='ProductCode']").index(this)

            if (productCodes == "") {
                productCodes	 = $("input[name='ProductCode']").eq(idx).val();
                offFlags		 = $("select[name='OffFlag']").eq(idx).val();
                saleStates		 = $("select[name='SaleState']").eq(idx).val();
            }
            else {
                productCodes	 = productCodes		 + "," + $("input[name='ProductCode']").eq(idx).val();
                offFlags		 = offFlags			 + "," + $("select[name='OffFlag']").eq(idx).val();
                saleStates		 = saleStates		 + "," + $("select[name='SaleState']").eq(idx).val();
            }
        });

        $.ajax({
            url			 : "/product/product/ajax/statemodify",
            method		 : "POST",
            data		 : "productCode=" + productCodes + "&offFlag=" + offFlags + "&saleState=" + saleStates,
            beforeSend: function(xhr){
                xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
            },
            success		 : function (data) {
                var splitData	 = data.split("|||||");
                var result		 = splitData[0];
                var cont		 = splitData[1];

                if (result == "OK") {
                    alert("수정 되었습니다.");
                    PageReload();
                }
                else {
                    alert(cont);
                }
            },
            error		 : function (data) {
                alert("처리 도중 오류가 발생하였습니다.");
            }
        });
    }
}

/* 한 상품 판매상태/품절 수정 */
function mod_OneSaleState(num) {
    var productCode	 = $("input:checkbox[name='ProductCode']").eq(num).val();
    var offFlag		 = $("select[name='OffFlag']").eq(num).val();
    var saleState	 = $("select[name='SaleState']").eq(num).val();

    $.ajax({
        url			 : "/product/product/ajax/statemodify",
        method		 : "POST",
        data		 : "productCode=" + productCode + "&offFlag=" + offFlag + "&saleState=" + saleState,
        beforeSend: function(xhr){
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
        },
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result == "OK") {
                alert("수정 되었습니다.");
                PageReload();
            }
            else {
                alert(cont);
            }
        },
        error		 : function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 정보고시 정보 뷰 */
function chg_PBType(productCode) {
    var productType = $("#ProductType").val();

    $.ajax({
        url			 : "/product/product/ajax/gosiinfo",
        method		 : "post",
        data		 : "ProductCode=" + productCode + "&ProductType=" + productType,
        beforeSend: function(xhr){
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
        },
        success		 : function (data) {
            $("#ProductBasicInfo").html(data);
        },
        error		 : function (data) {
            alert(data.responseText)
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 상품 등록 */
function ins_Product() {
    var setdup = "N";

    var productClass = $("input:radio[name='productclass']:checked").val();

    if (productClass == "P") {
        var itemNo = alltrim($("#ITEM_NO").val());
        if (itemNo.length == 0) {
            alert("ERP 상품코드를 입력하여 주십시오.");
            $("#ITEM_NO").focus();
            return;
        }
    }
    else if (productClass == "S") {
        var setProductCodes = alltrim($("#SetProductCodes").val());
        if (setProductCodes.length == 0) {
            alert("세트 상품을 추가하여 주십시오.");
            $("#SBTN").focus();
            return;
        }

        var setUnitQtys = alltrim($("#SetUnitQtys").val());

        $.ajax({
            url: "/product/product/ajax/setproductduplicationcheck",
            method: "POST",
            data: "SetProductCodes=" + setProductCodes + "&SetUnitQtys=" + setUnitQtys,
            async: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
            },
            success: function (data) {
                var splitData = data.split("|||||");
                var result = splitData[0];
                var cont = splitData[1];

                if (result == "DUP") {
                    if (!confirm("똑같은 구성의 세트 상품이 존재 합니다. 그래도 등록 하시겠습니까?")) {
                        setdup = "Y";
                    }
                }
                else if (result == "FAIL") {
                    alert(cont);
                    setdup = "Y";
                }
            },
            error: function (data) {
                alert(data.responseText);
                alert("처리 도중 오류가 발생하였습니다.");
                setdup = "Y";
            }
        });

        if (setdup == "Y") {
            return;
        }
    }
    else if (productClass == "G") {
        var groupProductCodes = alltrim($("#GroupProductCodes").val());
        if (groupProductCodes.length == 0) {
            alert("묶음 상품을 추가하여 주십시오.");
            $("#GBTN").focus();
            return;
        }
    }

    var sCode1 = alltrim($("#categorycode1").val());
    if (sCode1.length == 0) {
        alert("대분류를 선택하여 주십시오.");
        $("#categorycode1").focus();
        return;
    }
    var sCode2 = alltrim($("#categorycode2").val());
    if (sCode2.length == 0) {
        alert("소분류를 선택하여 주십시오.");
        $("#categorycode2").focus();
        return;
    }
    var releaseCenterCode = alltrim($("#ReleaseCenterCode").val());
    if (releaseCenterCode.length == 0) {
        alert("출고지를 선택하여 주십시오.");
        $("#ReleaseCenterCode").focus();
        return;
    }
    var productName = alltrim($("#ProductName").val());
    if (productName.length == 0) {
        alert("상품명을 입력하여 주십시오.");
        $("#ProductName").focus();
        return;
    }
    var brandCode = alltrim($("#BrandCode").val());
    if (brandCode.length == 0) {
        alert("브랜드를 선택하여 주십시오.");
        $("#BrandCode").focus();
        return;
    }
    var minSaleCnt = alltrim($("#MinSaleCnt").val());
    if (minSaleCnt.length == 0) {
        alert("최소판매수량을 입력하여 주십시오.");
        $("#MinSaleCnt").focus();
        return;
    }
    if (beNumStr(minSaleCnt) == false) {
        alert("최소판매수량을 숫자로만 입력하여 주십시오.");
        $("#MinSaleCnt").focus();
        return;
    }
    if (parseFloat(minSaleCnt) < 1) {
        alert("최소판매수량은 1 이상이어야 합니다.");
        $("#MinSaleCnt").focus();
        return;
    }
    var maxSaleCnt = alltrim($("#MaxSaleCnt").val());
    if (maxSaleCnt.length == 0) {
        alert("최대판매수량을 입력하여 주십시오.");
        $("#MaxSaleCnt").focus();
        return;
    }
    if (beNumStr(maxSaleCnt) == false) {
        alert("최대판매수량을 숫자로만 입력하여 주십시오.");
        $("#MaxSaleCnt").focus();
        return;
    }
    if (parseFloat(minSaleCnt) > parseFloat(maxSaleCnt)) {
        alert("최대판매수량은 최소판매수량보다 커야 합니다.");
        $("#MaxSaleCnt").focus();
        return;
    }

    var costPrice = alltrim($("#CostPrice").val());
    if (costPrice.length == 0) {
        //alert("사입가를 입력하여 주십시오.");
        //$("#CostPrice").focus();
        //return;
    }
    else if (beNumStr(costPrice) == false) {
        alert("사입가를 숫자로만 입력하여 주십시오.");
        $("#CostPrice").focus();
        return;
    }
    var agencyPrice = alltrim($("#AgencyPrice").val());
    if (agencyPrice.length == 0) {
        //alert("대리점가를 입력하여 주십시오.");
        //$("#AgencyPrice").focus();
        //return;
    }
    else if (beNumStr(agencyPrice) == false) {
        alert("대리점가를 숫자로만 입력하여 주십시오.");
        $("#AgencyPrice").focus();
        return;
    }

    var tagPrice = alltrim($("#TagPrice").val());
    if (tagPrice.length == 0) {
        alert("정상가를 입력하여 주십시오.");
        $("#TagPrice").focus();
        return;
    }
    if (beNumStr(tagPrice) == false) {
        alert("정상가를 숫자로만 입력하여 주십시오.");
        $("#TagPrice").focus();
        return;
    }
    var salePrice = alltrim($("#SalePrice").val());
    if (salePrice.length == 0) {
        alert("판매가를 입력하여 주십시오.");
        $("#SalePrice").focus();
        return;
    }
    if (beNumStr(salePrice) == false) {
        alert("판매가를 숫자로만 입력하여 주십시오.");
        $("#SalePrice").focus();
        return;
    }
    if (parseFloat(tagPrice) < parseFloat(salePrice)) {
        alert("정상가가 판매가보다 작을 수 없습니다.\n\n정상가를 판매가보다 크게 입력하여 주십시오.");
        $("#TagPrice").focus();
        return;
    }
    var empPrice = alltrim($("#EmpPrice").val());
    if (empPrice.length == 0) {
        alert("임직원가를 입력하여 주십시오.");
        $("#EmpPrice").focus();
        return;
    }
    if (beNumStr(empPrice) == false) {
        alert("임직원가를 숫자로만 입력하여 주십시오.");
        $("#EmpPrice").focus();
        return;
    }
    var bizPrice = alltrim($("#BizPrice").val());
    if (bizPrice.length == 0) {
        alert("사업자회원가를 입력하여 주십시오.");
        $("#BizPrice").focus();
        return;
    }
    if (beNumStr(bizPrice) == false) {
        alert("사업자회원가를 숫자로만 입력하여 주십시오.");
        $("#BizPrice").focus();
        return;
    }

    var image1 = alltrim($("#Image1").val());
    if (image1.length == 0) {
        alert("대표 이미지를 입력하여 주십시오.");
        $("#Image1").focus();
        return false;
    }
    if (image1.length != 0) {
        lng = image1.length;
        ext = image1.substring(lng - 4, lng);
        ext = ext.toLowerCase();
        if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
            alert("이미지는 gif, jpg, png만 입력가능합니다.");
            $("#Image1").focus();
            return;
        }
    }
    for (var i = 2; i <= 3; i++) {
        image = $("#Image" + i).val();
        if (image.length != 0) {
            lng = image.length;
            ext = image.substring(lng - 4, lng);
            ext = ext.toLowerCase();
            if (!(ext == ".jpg" || ext == ".gif" || ext == ".png")) {
                alert("이미지는 gif, jpg, png만 입력가능합니다.");
                $("#Image" + i).focus();
                return;
            }
        }
    }

    var productType = $("#ProductType").val();
    if (productType.length == 0) {
        alert("정보고시 제품정보를 선택하여 주십시오.");
        return;
    }

    if (confirm("입력한 사항으로 상품을 입력처리 하시겠습니까?")) {
        $("#IBTN").blur();
        openPop('loading');

        oEditors.getById["description"].exec("UPDATE_IR_FIELD", []);
        document.form.action = "/product/product/add";
        document.form.submit();
    }
}

/* 세트/묶음 상품 추가 팝업 */
function add_SG_Product(pType) {
if (pType == "S") {
        url = "/product/product/popup/setproductadd";
        target = "SetProduct"
    }
    else {
        url = "/product/product/popup/groupproductadd";
        target = "GroupProduct"
    }

    window.open("", target, "width=1660, height=850, top=10, left=10, scrollbars=yes").focus();
    document.popup.target=target;
    document.popup.action=url;
    document.popup.submit();
}

/* 세트상품 추가 */
/* 리스트 */
function set_product_add_list_Product(page) {
    if (page != "") {
        $("input[name='page']").val(page);
    }
    document.form.submit();
}
/* 폼 리셋 */
function set_product_list_Reset() {
    var productCodes	 = $("input[name='productcodes']").val();
    var unitSalePrices	 = $("input[name='unitsaleprices']").val();
    var unitQtys		 = $("input[name='unitqtys']").val();

    document.getElementById('SetForm').reset();

    $("input[name='productcodes']").val(productCodes);
    $("input[name='unitSaleprices']").val(unitSalePrices);
    $("input[name='unitqtys']").val(unitQtys);

    set_product_add_list_Product(1);
}
/* 한 상품 추가 */
function set_add_OneProduct(num) {
    var productCode		 = $("input[name='ProductCode']").eq(num).val();
    var unitCostPrice	 = $("input[name='UnitCostPrice']").eq(num).val();
    var unitAgencyPrice	 = $("input[name='UnitAgencyPrice']").eq(num).val();
    var unitTagPrice	 = $("input[name='UnitTagPrice']").eq(num).val();
    var unitSalePrice	 = $("input[name='UnitSalePrice']").eq(num).val();
    var unitEmpPrice	 = $("input[name='UnitEmpPrice']").eq(num).val();
    var unitBizPrice	 = $("input[name='UnitBizPrice']").eq(num).val();
    var unitQty			 = $("input[name='UnitQty']").eq(num).val();

    var productCodes	 = $("input[name='productcodes']").val();
    var unitCostPrices	 = $("input[name='unitcostprices']").val();
    var unitAgencyPrices = $("input[name='unitagencyprices']").val();
    var unitTagPrices	 = $("input[name='unittagprices']").val();
    var unitSalePrices	 = $("input[name='unitsaleprices']").val();
    var unitEmpPrices	 = $("input[name='unitempprices']").val();
    var unitBizPrices	 = $("input[name='unitbizprices']").val();
    var unitQtys		 = $("input[name='unitqtys']").val();

    if (productCodes == "") {
        $("input[name='productcodes']").val(productCode);
        $("input[name='unitcostprices']").val(unitCostPrice);
        $("input[name='unitagencyprices']").val(unitAgencyPrice);
        $("input[name='unittagprices']").val(unitTagPrice);
        $("input[name='unitsaleprices']").val(unitSalePrice);
        $("input[name='unitempprices']").val(unitEmpPrice);
        $("input[name='unitbizprices']").val(unitBizPrice);
        $("input[name='unitqtys']").val(unitQty);
    }
    else {
        $("input[name='productcodes']").val(productCodes + "," + productCode);
        $("input[name='unitcostprices']").val(unitCostPrices + "," + unitCostPrice);
        $("input[name='unitagencyprices']").val(unitAgencyPrices + "," + unitAgencyPrice);
        $("input[name='unittagprices']").val(unitTagPrices + "," + unitTagPrice);
        $("input[name='unitsaleprices']").val(unitSalePrices + "," + unitSalePrice);
        $("input[name='unitempprices']").val(unitEmpPrices + "," + unitEmpPrice);
        $("input[name='unitbizprices']").val(unitBizPrices + "," + unitBizPrice);
        $("input[name='unitqtys']").val(unitQtys + "," + unitQty);
    }

    set_product_add_list_Product('');
}
/* 선택 상품 추가 */
function set_add_SelProduct() {
    var productCodes	 = $("input[name='productcodes']").val();
    var unitCostPrices	 = $("input[name='unitcostprices']").val();
    var unitAgencyPrices = $("input[name='unitagencyprices']").val();
    var unitTagPrices	 = $("input[name='unittagprices']").val();
    var unitSalePrices	 = $("input[name='unitsaleprices']").val();
    var unitEmpPrices	 = $("input[name='unitempprices']").val();
    var unitBizPrices	 = $("input[name='unitbizprices']").val();
    var unitQtys		 = $("input[name='unitqtys']").val();

    var cnt = $("input:checkbox[name='ProductCode']").length;
    if (cnt > 0) {
        var chkCnt = $("input:checkbox[name='ProductCode']:checked").length;
        if (chkCnt == 0) {
            alert("일괄 추가할 상품을 선택하여 주십시오.");
            return;
        }
        else {
            $("input:checkbox[name='ProductCode']:checked").each(function () {
                var idx = $("input:checkbox[name='ProductCode']").index(this)

                if (productCodes == "") {
                    productCodes	 = $("input[name='ProductCode']").eq(idx).val();
                    unitCostPrices	 = $("input[name='UnitCostPrice']").eq(idx).val();
                    unitAgencyPrices = $("input[name='UnitAgencyPrice']").eq(idx).val();
                    unitTagPrices	 = $("input[name='UnitTagPrice']").eq(idx).val();
                    unitSalePrices	 = $("input[name='UnitSalePrice']").eq(idx).val();
                    unitEmpPrices	 = $("input[name='UnitEmpPrice']").eq(idx).val();
                    unitBizPrices	 = $("input[name='UnitBizPrice']").eq(idx).val();
                    unitQtys		 = $("input[name='UnitQty']").eq(idx).val();
                }
                else {
                    productCodes	 = productCodes		 + "," + $("input[name='ProductCode']").eq(idx).val();
                    unitCostPrices	 = unitCostPrices	 + "," + $("input[name='UnitCostPrice']").eq(idx).val();
                    unitAgencyPrices = unitAgencyPrices	 + "," + $("input[name='UnitAgencyPrice']").eq(idx).val();
                    unitTagPrices	 = unitTagPrices	 + "," + $("input[name='UnitTagPrice']").eq(idx).val();
                    unitSalePrices	 = unitSalePrices	 + "," + $("input[name='UnitSalePrice']").eq(idx).val();
                    unitEmpPrices	 = unitEmpPrices	 + "," + $("input[name='UnitEmpPrice']").eq(idx).val();
                    unitBizPrices	 = unitBizPrices	 + "," + $("input[name='UnitBizPrice']").eq(idx).val();
                    unitQtys		 = unitQtys			 + "," + $("input[name='UnitQty']").eq(idx).val();
                }

            });

            $("input[name='productcodes']").val(productCodes);
            $("input[name='unitcostprices']").val(unitCostPrices);
            $("input[name='unitagencyprices']").val(unitAgencyPrices);
            $("input[name='unittagprices']").val(unitTagPrices);
            $("input[name='unitsaleprices']").val(unitSalePrices);
            $("input[name='unitempprices']").val(unitEmpPrices);
            $("input[name='unitbizprices']").val(unitBizPrices);
            $("input[name='unitqtys']").val(unitQtys);

            set_product_add_list_Product('');
        }
    }
}
/* 판매단가 변경 */
function set_chg_SalePrice(num) {
    var unitSalePrice	 = $("input[name='UnitSalePrice']").eq(num).val();
    var unitQty			 = $("input[name='UnitQty']").eq(num).val();
    var originSalePrice	 = $("input[name='OriginSalePrice']").eq(num).val();

    if (beNumStr(unitSalePrice) == false) {
        alert("판매단가를 숫자로만 입력하여 주십시오.");
        $("input[name='UnitSalePrice']").eq(num).val(originSalePrice);
        $("input[name='UnitSalePrice']").eq(num).focus();
        $("#TotalSalePrice" + num).text(add_Comma(parseFloat(originSalePrice) * parseFloat(unitQty)));
        return;
    }
    else {
        $("#TotalSalePrice" + num).text(add_Comma(parseFloat(unitSalePrice) * parseFloat(unitQty)));
    }
}

/* 임직원단가 변경 */
function set_chg_EmpPrice(num) {
    var unitEmpPrice	 = $("input[name='UnitEmpPrice']").eq(num).val();
    var unitQty			 = $("input[name='UnitQty']").eq(num).val();
    var originEmpPrice	 = $("input[name='OriginEmpPrice']").eq(num).val();

    if (beNumStr(unitEmpPrice) == false) {
        alert("임직원단가를 숫자로만 입력하여 주십시오.");
        $("input[name='UnitEmpPrice']").eq(num).val(originEmpPrice);
        $("input[name='UnitEmpPrice']").eq(num).focus();
        $("#TotalEmpPrice" + num).text(add_Comma(parseFloat(originEmpPrice) * parseFloat(unitQty)));
        return;
    }
    else {
        $("#TotalEmpPrice" + num).text(add_Comma(parseFloat(unitEmpPrice) * parseFloat(unitQty)));
    }
}

/* 사업자단가 변경 */
function set_chg_BizPrice(num) {
    var unitBizPrice	 = $("input[name='UnitBizPrice']").eq(num).val();
    var unitQty			 = $("input[name='UnitQty']").eq(num).val();
    var originBizPrice	 = $("input[name='OriginBizPrice']").eq(num).val();

    if (beNumStr(unitBizPrice) == false) {
        alert("사업자단가를 숫자로만 입력하여 주십시오.");
        $("input[name='UnitBizPrice']").eq(num).val(originBizPrice);
        $("input[name='UnitBizPrice']").eq(num).focus();
        $("#TotalBizPrice" + num).text(add_Comma(parseFloat(originBizPrice) * parseFloat(unitQty)));
        return;
    }
    else {
        $("#TotalBizPrice" + num).text(add_Comma(parseFloat(unitBizPrice) * parseFloat(unitQty)));
    }
}

/* 수량변경 */
function set_chg_Qty(num) {
    var unitSalePrice	 = $("input[name='UnitSalePrice']").eq(num).val();
    var originSalePrice	 = $("input[name='OriginSalePrice']").eq(num).val();
    var unitEmpPrice	 = $("input[name='UnitEmpPrice']").eq(num).val();
    var originEmpPrice	 = $("input[name='OriginEmpPrice']").eq(num).val();
    var unitBizPrice	 = $("input[name='UnitBizPrice']").eq(num).val();
    var originBizPrice	 = $("input[name='OriginBizPrice']").eq(num).val();
    var unitQty			 = $("input[name='UnitQty']").eq(num).val();

    if (beNumStr(unitQty) == false) {
        alert("수량을 숫자로만 입력하여 주십시오.");
        $("input[name='UnitQty']").eq(num).val("1");
        $("input[name='UnitQty']").eq(num).focus();
        $("#TotalSalePrice"	 + num).text(add_Comma(parseFloat(originSalePrice)));
        $("#TotalEmpPrice"	 + num).text(add_Comma(parseFloat(originEmpPrice)));
        $("#TotalBizPrice"	 + num).text(add_Comma(parseFloat(originBizPrice)));
        return;
    }
    else {
        $("#TotalSalePrice"	 + num).text(add_Comma(parseFloat(unitSalePrice) * parseFloat(unitQty)));
        $("#TotalEmpPrice"	 + num).text(add_Comma(parseFloat(unitEmpPrice)	 * parseFloat(unitQty)));
        $("#TotalBizPrice"	 + num).text(add_Comma(parseFloat(unitBizPrice)	 * parseFloat(unitQty)));
    }
}

/* 상품 삭제 */
function set_del_OneProduct(productCode) {
    var productCodes		 = $("input[name='productcodes']").val();
    var unitCostPrices		 = $("input[name='unitcostprices']").val();
    var unitAgencyPrices	 = $("input[name='unitagencyprices']").val();
    var unitTagPrices		 = $("input[name='unittagprices']").val();
    var unitSalePrices		 = $("input[name='unitsaleprices']").val();
    var unitEmpPrices		 = $("input[name='unitempprices']").val();
    var unitBizPrices		 = $("input[name='unitbizprices']").val();
    var unitQtys			 = $("input[name='unitqtys']").val();

    var sProductCodes		 = productCodes.split(",");
    var sUnitCostPrices		 = unitCostPrices.split(",");
    var sUnitAgencyPrices	 = unitAgencyPrices.split(",");
    var sUnitTagPrices		 = unitTagPrices.split(",");
    var sUnitSalePrices		 = unitSalePrices.split(",");
    var sUnitEmpPrices		 = unitEmpPrices.split(",");
    var sUnitBizPrices		 = unitBizPrices.split(",");
    var sUnitQtys			 = unitQtys.split(",");

    var cProductCodes		 = "";
    var cUnitCostPrices		 = "";
    var cUnitAgencyPrices	 = "";
    var cUnitTagPrices		 = "";
    var cUnitSalePrices		 = "";
    var cUnitEmpPrices		 = "";
    var cUnitBizPrices		 = "";
    var cUnitQtys			 = "";

    if (productCodes != "") {
        for (var i = 0; i < sProductCodes.length; i++) {
            pCode = sProductCodes[i];

            if (sProductCodes[i] != productCode) {
                if (cProductCodes == "") {
                    cProductCodes		 = sProductCodes[i];
                    cUnitCostPrices		 = sUnitCostPrices[i];
                    cUnitAgencyPrices	 = sUnitAgencyPrices[i];
                    cUnitTagPrices		 = sUnitTagPrices[i];
                    cUnitSalePrices		 = sUnitSalePrices[i];
                    cUnitEmpPrices		 = sUnitEmpPrices[i];
                    cUnitBizPrices		 = sUnitBizPrices[i];
                    cUnitQtys			 = sUnitQtys[i];
                }
                else {
                    cProductCodes		 = cProductCodes		 + "," + sProductCodes[i];
                    cUnitCostPrices		 = cUnitCostPrices		 + "," + sUnitCostPrices[i];
                    cUnitAgencyPrices	 = cUnitAgencyPrices	 + "," + sUnitAgencyPrices[i];
                    cUnitTagPrices		 = cUnitTagPrices		 + "," + sUnitTagPrices[i];
                    cUnitSalePrices		 = cUnitSalePrices		 + "," + sUnitSalePrices[i];
                    cUnitEmpPrices		 = cUnitEmpPrices		 + "," + sUnitEmpPrices[i];
                    cUnitBizPrices		 = cUnitBizPrices		 + "," + sUnitBizPrices[i];
                    cUnitQtys			 = cUnitQtys			 + "," + sUnitQtys[i];
                }
            }
        }
    }

    $("input[name='productcodes']").val(cProductCodes);
    $("input[name='unitcostprices']").val(cUnitCostPrices);
    $("input[name='unitagencyprices']").val(cUnitAgencyPrices);
    $("input[name='unittagprices']").val(cUnitTagPrices);
    $("input[name='unitsaleprices']").val(cUnitSalePrices);
    $("input[name='unitempprices']").val(cUnitEmpPrices);
    $("input[name='unitbizprices']").val(cUnitBizPrices);
    $("input[name='unitqtys']").val(cUnitQtys);


    set_product_add_list_Product('');
}

/* 상품 적용 */
function set_apply_Product() {
    var productCodes		 = $("input[name='productcodes']").val();
    var unitCostPrices		 = $("input[name='unitcostprices']").val();
    var unitAgencyPrices	 = $("input[name='unitagencyprices']").val();
    var unitTagPrices		 = $("input[name='unittagprices']").val();
    var unitSalePrices		 = $("input[name='unitsaleprices']").val();
    var unitEmpPrices		 = $("input[name='unitempprices']").val();
    var unitBizPrices		 = $("input[name='unitbizprices']").val();
    var unitQtys			 = $("input[name='unitqtys']").val();

    if (productCodes == "") {
        alert("적용할 상품이 없습니다.\n\n상품을 추가하여 주십시오.");
        return;
    }

    var sUnitQtys	 = unitQtys.split(",");
    var sumUnitQtys	 = 0;
    for (var i = 0; i < sUnitQtys.length; i++) {
        sumUnitQtys += parseFloat(sUnitQtys[i]);
    }
    if (sumUnitQtys < 2) {
        alert("세트 상품은 수량이 2개 이상이어야 적용 가능합니다.");
        return;
    }

    $.ajax({
        url			 : "/product/product/ajax/setproductapplyok",
        method		 : "POST",
        data		 : $("#SetForm").serialize(),
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result == "OK") {
                var costPrice	 = splitData[2];
                var agencyPrice	 = splitData[3];
                var tagPrice	 = splitData[4];
                var salePrice	 = splitData[5];
                var empPrice	 = splitData[6];
                var bizPrice	 = splitData[7];
                var taxType		 = splitData[8];
                var rcCode		 = splitData[9];

                $(opener.document).find("#SetProductList").html(cont);
                $(opener.document).find("#CostPrice").val(costPrice);
                $(opener.document).find("#AgencyPrice").val(agencyPrice);
                $(opener.document).find("#TagPrice").val(tagPrice);
                $(opener.document).find("#SalePrice").val(salePrice);
                $(opener.document).find("#EmpPrice").val(empPrice);
                $(opener.document).find("#BizPrice").val(bizPrice);
                $(opener.document).find("#TaxType_" + taxType).prop("checked", true);
                $(opener.document).find("#ReleaseCenterCode").val(rcCode);


                $(opener.document).find("#SetProductCodes").val(productCodes);
                $(opener.document).find("#SetUnitCostPrices").val(unitCostPrices);
                $(opener.document).find("#SetUnitAgencyPrices").val(unitAgencyPrices);
                $(opener.document).find("#SetUnitTagPrices").val(unitTagPrices);
                $(opener.document).find("#SetUnitSalePrices").val(unitSalePrices);
                $(opener.document).find("#SetUnitEmpPrices").val(unitEmpPrices);
                $(opener.document).find("#SetUnitBizPrices").val(unitBizPrices);
                $(opener.document).find("#SetUnitQtys").val(unitQtys);
                self.close();
            }
            else {
                alert(cont);
            }
        },
        error		 : function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}

/* 묶음상품 추가 */
/* 리스트 */
function group_product_add_list_Product(page) {
    if (page != "") {
        $("input[name='page']").val(page);
    }
    document.form.submit();
}

/* 폼 리셋 */
function group_product_list_Reset() {
    var productCodes	 = $("input[name='c']").val();

    document.form.reset();
    $("input[name='productcodes']").val(productCodes);

    group_product_add_list_Product(1);
}

/* 한 상품 추가 */
function group_add_OneProduct(num) {
    var productCode		 = $("input[name='ProductCode']").eq(num).val();
    var productCodes	 = $("input[name='productcodes']").val();

    if (productCodes == "") {
        $("input[name='productcodes']").val(productCode);
    }
    else {
        $("input[name='productcodes']").val(productCodes + "," + productCode);
    }

    group_product_add_list_Product('');
}

/* 선택 상품 추가 */
function group_add_SelProduct() {
    var productCodes	 = $("input[name='productcodes']").val();

    var cnt = $("input:checkbox[name='ProductCode']").length;
    if (cnt > 0) {
        var chkCnt = $("input:checkbox[name='ProductCode']:checked").length;
        if (chkCnt == 0) {
            alert("일괄 추가할 상품을 선택하여 주십시오.");
            return;
        }
        else {
            $("input:checkbox[name='ProductCode']:checked").each(function () {
                var idx = $("input:checkbox[name='ProductCode']").index(this)

                if (productCodes == "") {
                    productCodes	 = $("input[name='ProductCode']").eq(idx).val();
                }
                else {
                    productCodes	 = productCodes		 + "," + $("input[name='ProductCode']").eq(idx).val();
                }

            });

            $("input[name='productcodes']").val(productCodes);

            group_product_add_list_Product('');
        }
    }
}

/* 상품 삭제 */
function group_del_OneProduct(productCode) {
    var productCodes	 = $("input[name='productcodes']").val();
    var sProductCodes	 = productCodes.split(",");
    var cProductCodes	 = "";

    if (productCodes != "") {
        for (var i = 0; i < sProductCodes.length; i++) {
            pCode = sProductCodes[i];

            if (sProductCodes[i] != productCode) {
                if (cProductCodes == "") {
                    cProductCodes	 = sProductCodes[i];
                }
                else {
                    cProductCodes	 = cProductCodes	 + "," + sProductCodes[i];
                }
            }
        }
    }

    $("input[name='productcodes']").val(cProductCodes);


    group_product_add_list_Product('');
}

/* 상품 적용 */
function group_apply_Product() {
    var productCodes	 = $("input[name='productcodes']").val();

    if (productCodes == "") {
        alert("적용할 상품이 없습니다.\n\n상품을 추가하여 주십시오.");
        return;
    }

    var sProductCodes	 = productCodes.split(",");
    if (sProductCodes.length < 2) {
        alert("묶음 상품은 2개 이상의 상품을 선택하셔야 됩니다.");
        return;
    }

    if ($("input:checkbox[name='StandardFlag']:checked").length < 1) {
        alert("기준 상품을 선택하여 주십시오.");
        return;
    }

    var standardFlags = "";
    var prices = "";
    $("input:checkbox[name='StandardFlag']").each(function () {
        var idx = $("input:checkbox[name='StandardFlag']").index(this);
        if ($(this).is(":checked")) {
            prices = $("input[name='Prices']").eq(idx).val();
            if (standardFlags == "") { standardFlags = "Y"; }
            else { standardFlags += ",Y"; }
        }
        else {
            if (standardFlags == "") { standardFlags = "N"; }
            else { standardFlags += ",N"; }
        }
    });

    var sPrices		 = prices.split("|");
    var costPrice	 = sPrices[0];
    var agencyPrice	 = sPrices[1];
    var tagPrice	 = sPrices[2];
    var salePrice	 = sPrices[3];
    var empPrice	 = sPrices[4];
    var bizPrice	 = sPrices[5];

    $("input[name='standardflags']").val(standardFlags);

    $.ajax({
        url			 : "/product/product/ajax/groupproductapplyok",
        method		 : "POST",
        data		 : $("#SetForm").serialize(),
        success		 : function (data) {
            var splitData	 = data.split("|||||");
            var result		 = splitData[0];
            var cont		 = splitData[1];

            if (result == "OK") {
                var taxType = splitData[2];
                var rcCode	= splitData[3];

                $(opener.document).find("#GroupProductList").html(cont);
                $(opener.document).find("#GroupProductCodes").val(productCodes);
                $(opener.document).find("#GroupStandardFlags").val(standardFlags);

                $(opener.document).find("#CostPrice").val(costPrice);
                $(opener.document).find("#AgencyPrice").val(agencyPrice);
                $(opener.document).find("#TagPrice").val(tagPrice);
                $(opener.document).find("#SalePrice").val(salePrice);
                $(opener.document).find("#EmpPrice").val(empPrice);
                $(opener.document).find("#BizPrice").val(bizPrice);
                $(opener.document).find("#TaxType_" + taxType).prop("checked", true);
                $(opener.document).find("#ReleaseCenterCode").val(rcCode);
                self.close();
            }
            else {
                alert(cont);
            }
        },
        error		 : function (data) {
            alert("처리 도중 오류가 발생하였습니다.");
        }
    });
}
