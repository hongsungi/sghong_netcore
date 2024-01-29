function setQueryStringParams(formid) {
    if (!location.search) {
        return false;
    }

    const form = document.getElementById(formid);

    new URLSearchParams(location.search).forEach((value, key) => {
        if(form[key]) {
            form[key].value = value;
        } else {
            let input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", key);
            input.setAttribute("value", value);
            form.appendChild(input);
        }
    })
}

function getSearch() {
    $("#page").val(1);
    document.searchForm.action = location.pathname;
    document.searchForm.submit();
}

function moveList(url) {
    const queryString = (location.search) ? location.search : "";
    location.href=url+queryString;
}

function movePage(page) {
    $("#page").val(page);
    document.searchForm.action = location.pathname;
    document.searchForm.submit();
}

function moveView(loc, id) {
    let url = loc;
    if (id) url += '/' + id;
    document.searchForm.action = url;
    document.searchForm.submit();
}