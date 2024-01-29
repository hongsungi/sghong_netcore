/* 대분류 변경 */

function chg_MCode1(pageUrl) {
	var mCode1 = document.getElementById("MCode1").value;
	if (pageUrl == "HistoryList") {
		document.getElementById("MCode2").options.length = 1;
	}
	else {
		document.getElementById("MCode2").options.length = 0;
	}

	if (mCode1 != "") {
		$.ajax({
			type		 : "get",
			url			 : "/manage/menu/ajax/getmcode2list",
			async		 : false,
			data		 : "PageUrl=" + pageUrl + "&MCode1=" + mCode1,
			dataType	 : "text",
			headers: {
				'RequestVerificationToken': getToken()
			},
			success: function (data) {
							var splitData	 = data.split("|||||");
							var result		 = splitData[0];
							var rCode2		 = splitData[1];
							var rName2		 = splitData[2];

							if (result == "OK") {
								if (rCode2 != "") {
									var mCode2 = rCode2.split(",");
									var mName2 = rName2.split(",");

									var opt;
									for (var i = 0; i < mCode2.length; i++) {
										opt			 = document.createElement("option");
										opt.value	 = mCode2[i];
										opt.text	 = mName2[i];
										document.getElementById("MCode2").add(opt);
									}
								}
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
}


/* 대분류 변경 */
function chg_CategoryCode1() {
	var sCode1 = document.getElementById("categorycode1").value;
	document.getElementById("categorycode2").options.length = 1;

	if (sCode1 != "") {
		$.ajax({
			type: "get",
			url: "/common/ajax/category2list",
			async: false,
			data: "categorycode1=" + sCode1,
			dataType: "text",
			headers: {
				'RequestVerificationToken': getToken()
			},
			success: function (data) {
				var splitData = data.split("|||||");
				var result = splitData[0];
				var rCode2 = splitData[1];
				var rName2 = splitData[2];

				if (result == "OK") {
					if (rCode2 != "") {
						var sCode2 = rCode2.split(",");
						var sName2 = rName2.split(",");

						//document.getElementById("SCode2").options.length = 1;

						var opt;
						for (var i = 0; i < sCode2.length; i++) {
							opt = document.createElement("option");
							opt.value = sCode2[i];
							opt.text = sName2[i];
							document.getElementById("categorycode2").add(opt);
						}
					}
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
			error: function (data) {
				alert("처리 도중 오류가 발생하였습니다.");
			}
		});
	}
}


// 기간별 일자 셋팅후 재검색
function common_setDate(term, sDateID, eDateID) {
	var sDate, eDate, year, month, day;

	// 시작일자
	sDate = new Date();

	if (term == "-1d") {			// 어제
		sDate.setDate(sDate.getDate() - 1);
	} else if (term == "0m") {		// 이번달
		sDate.setDate(1);
	} else if (term == "-1m") {		// 지난달
		sDate.setMonth(sDate.getMonth() - 1);
		sDate.setDate(1);
	} else if (term == "3d") {		// 3일
		sDate.setDate(sDate.getDate() - 3);
	} else if (term == "7d") {		// 7일
		sDate.setDate(sDate.getDate() - 7);
	} else if (term == "30d") {		// 30일
		sDate.setDate(sDate.getDate() - 30);
	} else if (term == "1m") {		// 1개월
		sDate.setMonth(sDate.getMonth() - 1);
	} else if (term == "3m") {		// 3개월
		sDate.setMonth(sDate.getMonth() - 3);
	} else if (term == "1y") {		// 1년
		sDate.setFullYear(sDate.getFullYear() - 1);
	} else if (term == "-1y") {		// 전년
		sDate = new Date($("#" + sDateID).val());
		sDate.setFullYear(sDate.getFullYear() - 1);
	}

	year = sDate.getFullYear();
	month = sDate.getMonth() + 1;
	day = sDate.getDate();
	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;
	sDate = year + "-" + month + "-" + day;

	// 종료일자
	eDate = new Date();

	if (term == "-1d") {			// 어제
		eDate.setDate(eDate.getDate() - 1);
	} else if (term == "0m") {		// 이번달
        eDate.setDate(1);
        eDate.setMonth(eDate.getMonth() + 1);
		eDate.setDate(eDate.getDate() - 1);
	} else if (term == "-1m") {		// 지난달
		eDate.setDate(1);
		eDate.setDate(eDate.getDate() - 1);
	} else if (term == "0d") {		// 오늘
		eDate.setDate(eDate.getDate());
	}

	year = eDate.getFullYear();
	month = eDate.getMonth() + 1;
	day = eDate.getDate();
	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;
	eDate = year + "-" + month + "-" + day;

	$("#" + sDateID).val(sDate);
	$("#" + eDateID).val(eDate);
}

/* 사이드 메뉴 보이기 */
function SideMenuShow() {
	if ($(".lnbW").css("left") == "-200px") {
		$(".lnbW").animate({ "left": "0px" }, "fast");
		$(".container .contents").animate({ "margin-left": "200px" }, "fast");
	} else {
		$(".lnbW").animate({ "left": "-200px" }, "fast");
		$(".container .contents").animate({ "margin-left": "0px" }, "fast");
	}
}

function add_MyMenu(menucode) {
	$.ajax({
		type		 : "post",
		url			 : "/common/ajax/mymenuadd",
		async		 : false,
		data		 : "menucode=" + menucode,
		dataType	 : "text",
		headers: {
			'RequestVerificationToken': getToken()
		},
		success		 : function (data) {
			var splitData	 = data.split("|||||");
			var result		 = splitData[0];
			var cont		 = splitData[1];

			if (result == "OK") {
				if ($("#CMenuList").css("display") != "none") {
					my_MenuList(1);
				}
				else {
					$("#CMenuList").html("");
				}

				alert("추가 되었습니다.");
				$("#aBtn").hide();
				return;
			}
			else if (result == "LOGIN") {
				PageReload();
			}
			else {
				alert(cont);
				return;
			}
		},
		error: function (data) {
			alert("처리 도중 오류가 발생하였습니다.");
		}
	});
}
function my_MenuList(b) {
	if (b == 1) {
		my_MenuListExec();
	}
	else {
		if ($("#CMenuList").css("display") == "none") {
			if ($("#CMenuList").text() == "") {
				my_MenuListExec();
			}
			$("#CMenuList").show();
		}
		else {
			$("#CMenuList").hide();
		}
	}
}
function my_MenuListExec() {
	$.ajax({
		type		 : "post",
		url			 : "/common/ajax/mymenulist",
		async		 : false,		
		dataType: "text",
		headers: {
			'RequestVerificationToken': getToken()
		},
		success: function (data) {
			var splitData	 = data.split("|||||");
			var result		 = splitData[0];
			var cont		 = splitData[1];

			if (result == "OK") {
				$("#CMenuList").html(cont);
				return;
			}
			else if (result == "LOGIN") {
				PageReload();
			}
			else {
				alert(cont);
				return;
			}
		},
		error: function (data) {
			alert("처리 도중 오류가 발생하였습니다.");
		}
	});
}

function del_MyMenu(menuCode) {
	var conf = confirm("삭제 하시겠습니까?");
	if (conf == true) {
		$.ajax({
			type		 : "post",
			url			 : "/common/ajax/mymenudelete",
			async		 : false,
			data		 : "menucode=" + menuCode,
			dataType: "text",
			headers: {
				'RequestVerificationToken': getToken()
			},
			success: function (data) {
				console.log(data)
				var splitData	 = data.split("|||||");
				var result		 = splitData[0];
				var cont		 = splitData[1];

				if (result == "OK") {
					my_MenuList(1);					
					return;
				}
				else if (result == "LOGIN") {
					PageReload();
				}
				else {
					alert(cont);
					return;
				}
			},
			error: function (data) {
				alert("처리 도중 오류가 발생하였습니다.");
			}
		});
	}
}

function mod_DisNum(udType, menuCode) {
	$.ajax({
		type		 : "post",
		url			 : "/common/ajax/mymenudisplaynummodify",
		async		 : false,
		data		 : "udType=" + udType + "&menucode=" + menuCode,
		dataType: "text",
		headers: {
			'RequestVerificationToken': getToken()
		},
		success: function (data) {
			var splitData = data.split("|||||");
			var result = splitData[0];
			var cont = splitData[1];

			if (result == "OK") {
				my_MenuList(1);
				return;
			}
			else if (result == "LOGIN") {
				PageReload();
			}
			else {
				alert(cont);
				return;
			}
		},
		error: function (data) {
			console.log(data)
			alert("처리 도중 오류가 발생하였습니다.");
		}
	});
}

function getTokenName() {
	return $("meta[name='_csrf_header']").attr('content');
}

function getToken() {
	return $("meta[name='_csrf']").attr('content');
}

/* 30초후 자동로그아웃 */
/*
var AutoLogout = function () {
	var assoc = {
		flag: "N",
		timer: "",
		countdown: "",
		limittime: 1000 * 30,
		func: function () {
			location.href = "/ASP/Login/Logout.asp";
		},
		start: function () {
			assoc.flag = "Y";
			assoc.timer = window.setTimeout(assoc.func, assoc.limittime);
			assoc.countdown = setInterval(function () { $("#logoutCountdown").html(Number($("#logoutCountdown").html()) - 1) }, 1000);
		},
		clear: function () {
			assoc.flag = "N";
			window.clearTimeout(assoc.timer);
			window.clearInterval(assoc.countdown);
		}

	};

	return assoc;
}();
*/
/* 30분동안 움직임 없을 경우 자동로그아웃 안내 */
/*
var LogOutTimer = function () {
	var assoc = {
		flag: "N",
		timer: "",
		limittime: 1000 * 60 * 30,
		func: function () {
			assoc.clear();

			$.ajax({
				type: "post",
				url: "/ASP/Login/Ajax/AutoLogout.asp",
				async: false,
				dataType: "text",
				success: function (data) {
					var splitData = data.split("|||||");
					var result = splitData[0];
					var cont = splitData[1];

					if (result === "OK") {
						$("#popup").html(cont);
						$("#popup").css({ 'top': '50%', 'left': '50%', 'width': 340 });
						openPop('popup');
						$("#popup").draggable({ cancel: ".pContents" });

						AutoLogout.start();
						return;
					}
					else if (result === "LOGIN") {
						PageReload();
						return;
					}
					else {
						alert(cont);
						return;
					}
				},
				error: function (data) {
					//alert("처리 도중 오류가 발생하였습니다.");
				}
			});
		},
		start: function () {
			assoc.flag = "Y";
			assoc.timer = window.setTimeout(assoc.func, assoc.limittime);
		},
		clear: function () {
			assoc.flag = "N";
			window.clearTimeout(assoc.timer);
		},
		reset: function () {
			if (AutoLogout.flag == "Y") {
				AutoLogout.clear();
			}
			assoc.clear();
			assoc.start();
		}

	};

	document.onmousemove = function () {
		if (assoc.flag == "Y" && AutoLogout.flag != "Y") {
			assoc.reset();
		}
	}

	document.onkeypress = function () {
		if (assoc.flag == "Y" && AutoLogout.flag != "Y") {
			assoc.reset();
		}
	}

	return assoc;
}();
$(function() {
	// 30분동안 움직임 없으면 자동로그아웃
	LogOutTimer.start();
});
*/


