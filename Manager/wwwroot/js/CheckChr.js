function PageReload() {
	location.href = document.URL;
}


var wrapper_top;
function openPop(id) {
	$('#dimmed').show();

	var pop = $("#" + id);
	var pop_height = pop.height();


	var popMargLeft = ($("#" + id).width() + 2) / 2;
	$("#" + id).css({ 'margin-left': -popMargLeft });

	var top = ($('#dimmed').height() - $("#" + id).height()) / 2;
	$("#" + id).fadeIn().css({ 'top': top });

	$("#" + id + " .popHeader").css("cursor", "move");
	$("#" + id).draggable({'cancel': '.popContainer'});

	lock();
}


function closePop(id) {
	$('#dimmed').hide();
	$("#" + id).hide();
	release();
};


function closePop1(id) {
	$("#" + id).hide();
	release();
};


function lock() {
	$("body").css("overflow","hidden");
	/*
	var wrapper_top = (window.document.documentElement && window.document.documentElement.scrollTop) || window.document.body.scrollTop;
	$(".wrap").css({ position: "fixed", top: -wrapper_top, left: $(".wrap").offsetLeft });
	$('#dimmed').show()
	*/
}
function release() {
	$("body").css("overflow","auto");
	/*
	$(".wrap").css({ position: 'relative', left: 0, top: 0 });
	if (window.document.documentElement && window.document.documentElement.scrollTop) {
		window.document.documentElement.scrollTop = wrapper_top;
	} else {
		window.document.body.scrollTop = wrapper_top;
	}
	*/
};

/* =================================================================
chkFileExt()
허용하는 파일 확장자 체크
--------------------------------------------------------------------
val			From Field Value
all_ext		Allow Extention Value
================================================================= */
function chkFileExt(val, all_ext) {
	var lng, s_chr, ext, all_exts
	if (val.length != 0) {
		s_chr = val.lastIndexOf(".")
		if (s_chr < 0) {
			return false;
		}
		else {
			ext = val.substring(s_chr + 1, val.length);
			ext = ext.toLowerCase();
			all_exts = all_ext.split("/");
			for (var i = 0; i < all_exts.length; i++) {
				if (all_exts[i] == ext) {
					return true;
					break;
				}
			}
			return false;
		}
	}
}


/* =================================================================
	denyFileExt()
	허용되지 않는 파일 확장자 체크
--------------------------------------------------------------------
	val			From Field Value
	all_ext		Deny Extention Value
================================================================= */
function denyFileExt(val, all_ext) {
	var lng, s_chr, ext, all_exts
	if (val.length != 0) {
		s_chr = val.lastIndexOf(".")
		if (s_chr < 0) {
			return false;
		}
		else {
			ext = val.substring(s_chr+1, val.length);
			ext = ext.toLowerCase();
			all_exts = all_ext.split(",");
			for (var i = 0; i<all_exts.length; i++) {
				if (all_exts[i] == ext) {
					return false;
					break;
				}
			}
			return true;
		}
	}
}



function ltrim(str) {
	var i;
	var ch;
	var retStr = '';
	if (str.length == 0)
		return str;
	for (i=0;i<str.length;i++) {
		ch = str.charAt(i);
		if (retStr.length == 0 && (ch == ' ' || ch == '\r' || ch == '\n')) 
			continue;
		retStr += ch;
	}
	return retStr;
}

function rtrim(str) {
	var i;
	var ch;
	var retStr = '';
	if (str.length == 0)
		return str;
	for (i=str.length-1;i>=0;i--) {
		ch = str.charAt(i);
		if (ch != ' ' && ch != '\r' && ch != '\n') {
			break;
		}
	}
	retStr = str.substring(0, i+1);
	return retStr;
}

function trim(str) {
	var retStr;
	retStr = ltrim(str);
	retStr = rtrim(retStr);
	return retStr;
}

function alltrim(str) {
	var i;
	var ch;
	var retStr = '';
	var retStr1 = '';
	if (str.length == 0)
		return str;
	for (i=0;i<str.length;i++) {
		ch = str.charAt(i);
		if (ch == ' ' || ch == '\r' || ch == '\n') 
			continue;
		retStr += ch;
	}
	return retStr;
}

function beNum(ch) {
	return (ch >= '0' && ch <= '9');
}

function beNumStr(str) {
	var i;
	var ch;
	for (i=0;i<str.length;i++) {
		ch = str.charAt(i);
		if (beNum(ch) == false) {
			return false;
		}
	}
	return true;
}

function beAlphaNum(ch) {
	return ((ch >= 'a' && ch <= 'z') ||  (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9'));
}

function beAlphaNumStr(str) {
	var i;
	var ch;
	for (i=0;i<str.length;i++) {
		ch = str.charAt(i);
		if (beAlphaNum(ch) == false) {
			return false;
		}
	}
	return true;
}

function beAllowStr(str, allowStr) {
	var i;
	var ch;
	for (i=0;i<str.length;i++) {
		ch = str.charAt(i);
		if (allowStr.indexOf(ch) < 0) {
			return false;
		}
	}
	return true;
}

function only_Num(val) {
	var regAlphaNum = /^[0-9]+$/;
	if (!regAlphaNum.test(val)) {
		return false;
	}
	else {
		return true;
	}
}

function only_Num2(val) {
	var regAlphaNum = /^[0-9.]+$/;
	if (!regAlphaNum.test(val)) {
		return false;
	}
	else {
		return true;
	}
}

function only_Num3(val) {
	var regAlphaNum = /^[0-9-]+$/;
	if (!regAlphaNum.test(val)) {
		return false;
	}
	else {
		return true;
	}
}

function only_AlphaNum(val) {
	var regAlphaNum = /^[A-Za-z0-9]+$/;
	if (!regAlphaNum.test(val)) {
		return false;
	}
	else {
		return true;
	}
}

function only_TAlphaNum(val) {
	if (val == "") {
		return false;
	}

	var pattern1 = /[0-9]/;
	var pattern2 = /[a-zA-Z]/;
	var pattern3 = /^[A-Za-z0-9]+$/;

	if (pattern1.test(val) == false || pattern2.test(val) == false || pattern3.test(val) == false || val.length < 8 || val.length > 12) { return false; }

	return true;
}

function chk_SameChr(val, len) {
	var b = "";
	var c = "";
	var j = 0;
	for (var i = 0; i < val.length; i++) {
		var c = val.charAt(i).toLowerCase();
		if (b == "") { b = c; }
		if (b == c) { j = j + 1; }
		else { j = 1; }
		if (j >= len) { break; }
		b = c;
	}
	if (j >= len) {
		return false;
	}
	else {
		return true;
	}
}


function strCharByte(chStr) {
	if (chStr.substring(0, 2) == '%u') {
		 if (chStr.substring(2,4) == '00')
			return 1;
		else
			return 2;
	}
	else if (chStr.substring(0,1) == '%') {
		if (parseInt(chStr.substring(1,3), 16) > 127)
			return 2;
		else
			return 1;
	}
	else
		return 1;
}

function strLengthByte(str)  {
	var totLength = 0;
	for (var i=0;i<str.length;i++)
		totLength += strCharByte(escape(str.charAt(i)));
	return totLength;
}


// byte로 자르기
function chr_byte(chr){
	if(escape(chr).length > 4)      return 2;
	else                            return 1;
}
function cutByte(str, limit){
	var tmpStr = str;
	var byte_count = 0;
	var len = str.length;
	var dot = "";
   
	for(i=0; i<len; i++){
		byte_count += chr_byte(str.charAt(i)); 
		if(byte_count == limit-1){
			if(chr_byte(str.charAt(i+1)) == 2){
				tmpStr = str.substring(0,i+1);
				dot = "...";
			}
			else {
				if(i+2 != len) dot = "...";
				tmpStr = str.substring(0,i+2);
			}
			break;
		}
		else if(byte_count == limit){
			if(i+1 != len) dot = "...";
			tmpStr = str.substring(0,i+1);
			break;
		}
	}        
	//return (tmpStr+dot);
	return (tmpStr);
}

	
function beHangul(chStr) {
	if (strCharByte(chStr) == 2)
		return true;
	else
		return false;
}

function beAllHangulStr(str) {
	var i;
	var ch;
	for (i=0;i<str.length;i++) {
		ch = escape(str.charAt(i));
		if (beHangul(ch) == false) {
			return false;
		}
	}
	return true;
}
function checkDate(v_year,v_month,v_day ){

	var err=0
	if ( v_year.length != 4) err=1
	if ( v_month.length != 1 &&  v_month.length !=  2 ) err=1
	if ( v_day.length != 1  &&  v_day.length !=  2) err=1


	r_year = eval(v_year) ; 
	r_month = eval(v_month); 
	r_day = eval(v_day)  ; 

	if (r_month<1 || r_month>12) err = 1
	if (r_day<1 || r_day>31) err = 1
	if (r_year<0 ) err = 1


	if (r_month==4 || r_month==6 || r_month==9 || r_month==11){
		if (r_day==31) err=1
	}

	// 2,윤년체크
	if (r_month==2){
		var g=parseInt(r_year/4)

		if (isNaN(g)) {
			err=1
		}
		if (r_day>29) err=1
		if (r_day==29 && ((r_year/4)!=parseInt(r_year/4))) err=1
	}

	if (err==1){
		return false
	}else{
	               return true;

	}
}

function BizInfoFindZip(zip, addr) {
	val = "zip=" + zip + "&addr=" + addr;
	window.open("/ASP/ZipCode/BZipCode.asp?"+val, "", "resizable=yes,scrollbars=no,width=500,height=150");
}

function FindZip(zip, addr) {
	val = "zip=" + zip + "&addr=" + addr;
	window.open("/ASP/ZipCode/ZipCode.asp?"+val, "", "resizable=yes,scrollbars=no,width=500,height=150");
}

function FindZipNew(zip, addr) {
	val = "zip=" + zip + "&addr=" + addr;
	window.open("/ASP/ZipCode/ZipCodeNew.asp?"+val, "", "resizable=yes,scrollbars=no,width=500,height=300");
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function setPng241(obj) {
	obj.width = obj.height = 1;
	obj.className = obj.className.replace(/\bpng24\b/i, '');
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + obj.src + "', sizingMethod='image');"
	obj.src = '';
	return '';
}
function setPng24(obj) {  
	obj.width = obj.height = 1; 
    obj.className = obj.className.replace(/\bpng24\b/i,''); 
    obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + obj.src + "', sizingMethod='image');"
    //obj.style.position = " " 
    obj.src= '';  
    return ''; 
} 

function dateSelect(id) {
	$("#" + id).focus();
}

/* =================================================================
 fn_numbersonly()
 숫자만 입력
 ================================================================= */
function fn_GetEvent(e) {
	if (navigator.appName == 'Netscape') {
		keyVal = e.which;
	}
	else {
		keyVal = event.keyCode;
	}
	return keyVal;
}
function fn_numbersonly(evt) {
	var myEvent = window.event ? window.event : evt;
	var isWindowEvent = window.event ? true : false;
	var keyVal = fn_GetEvent(evt);
	var result = false;
	if (myEvent.shiftKey) {
		result = false;
	}
	else {
		if ((keyVal >= 48 && keyVal <= 57) || (keyVal >= 96 && keyVal <= 105) || (keyVal == 8) || (keyVal == 9) || (keyVal == 13) || (keyVal == 46)) {
			result = true;
		}
		else {
			result = false;
		}
	}
	if (!result) {
		if (!isWindowEvent) {
			myEvent.preventDefault();
		}
		else {
			myEvent.returnValue = false;
		}
	}
}


/* =================================================================
 execDaumPostcode(zipCode, address)
 다음 주소 검색 팝업창
 zipCode : 우편번호 input id
 address : 주소 input id
 ================================================================= */
function execDaumPostcode(zipCode, address) {
	new daum.Postcode({
		oncomplete: function (data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
			//alert(data.addressType + "-" + data.userSelectedType + "\n\n1 : " + data.roadAddress + "\n2 : " + data.autoRoadAddress + "\n\n3 : " + data.jibunAddress + "\n4 : " + data.autoJibunAddress);

			// data.addressType : 주소검색방법 R=도로명검색, J=지번검색
			// data.userSelectedType : 주소선택구분 R=도로명주소선택, J=지번주소선택
			var roadAddress = data.roadAddress;
			var jibunAddress = data.jibunAddress;
			if (data.addressType == "R") {
				if (jibunAddress == "" && data.userSelectedType == "R") {
					jibunAddress = data.autoJibunAddress;
				}
			} else {
				if (roadAddress == "" && data.userSelectedType == "J") {
					roadAddress = data.autoRoadAddress;
				}
			}

			// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullRoadAddr = roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ""; // 도로명 조합형 주소 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== "" && data.apartment === "Y") {
				extraRoadAddr += (extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName);
			}
			// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== "") {
				extraRoadAddr = " (" + extraRoadAddr + ")";
			}
			// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
			if (fullRoadAddr !== "") {
				fullRoadAddr += extraRoadAddr;
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById(zipCode).value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById(address).value = fullRoadAddr;
		}
	}).open();
}



function checkPassword(password) {
	var regExp = /^[a-zA-Z0-9`~!@$%^&*|:\/?]{10,15}$/;
	if (!regExp.test(password)) {
		alert('숫자와 영문자 특수문자 조합으로 10~15자리를 사용해야 합니다.');
		return false;
	}

	var checkNumber = password.search(/[0-9]/g);
	var checkEnglish = password.search(/[a-z]/ig);
	var checkSpecail = password.search(/[`~!@$%^&*|:\/?]/ig);

	if (checkNumber < 0 || checkEnglish < 0 || checkSpecail < 0) {
		alert("숫자와 영문자, 특수문자를 혼용하여야 합니다.");
		return false;
	}
	/*
	if (/(\w)\1\1\1/.test(password)) {
		alert('같은 문자를 4번 이상 연속해서 사용하실 수 없습니다.');
		return false;
	}

	if (password.search(id) > -1) {
		alert("비밀번호에 아이디가 포함되었습니다.");
		return false;
	}
	*/
	return true;
}

function checkEmail(val) {

	if (val.length == 0) { return false; }

	if (beAllowStr(val, "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@.-_") == false) { return false; }

	var atCnt = 0;
	var dotCnt = 0;
	for (i = 0; i < val.length; i++) {
		ch = val.charAt(i);
		if (ch == "@") { atCnt++; }
		if (ch == ".") { dotCnt++; }
	}

	if (atCnt != 1 || dotCnt < 1) { return false; }

	var atIndex = 0;
	atIndex = val.indexOf("@");
	if (atIndex <= 0) { return false; }

	return true;
}


function add_Comma(num) {
	num = '' + num;
	if (num.length > 3) {
		var mod = num.length % 3;
		var output = (mod > 0 ? (num.substring(0, mod)) : '');
		for (i = 0; i < Math.floor(num.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += num.substring(mod + 3 * i, mod + 3 * i + 3);
			else
				output += ',' + num.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
	else
		return num;
}
function del_Comma(val) {
	if (val == '')
		return val;

	return parseFloat(val.replace(/[^\d\.-]/g, ''));
}
