	function showHTML() {
		alert(oEditors.getById["ir1"].getIR());
	}

	function insertIMG(irid, fileame) {
		var sHTML = "<img src='" + fileame + "' border='0'>";
		oEditors.getById[irid].exec("PASTE_HTML", [sHTML]);
	}

	function pasteHTMLDemo(irid, sHTML) {
		//���� ���� ����
		oEditors.getById[irid].exec("SET_IR", ['']);

		oEditors.getById[irid].exec("PASTE_HTML", [sHTML]);
	}
