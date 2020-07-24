function getReposers() {
    let fans = document.querySelector("#wk_likes_rows").children;
    let fansCount = document.querySelector("#wk_likes_rows").childElementCount - 1;

    let id = '';
    let name = '';
    let href = '';
    let httpResult = '';
    for(let i = fansCount; i >= 0; i--) {
        id = fans[i].dataset['id'];
        name = fans[i].children[1].firstElementChild.innerHTML;

        let xmlhttp = new XMLHttpRequest();

        href = "/id" + id;
        xmlhttp.open("GET", href, false);

        try {
            xmlhttp.send();

            httpResult = '. Не найдена запись';

            if (xmlhttp.status == 200) {
                if(!!xmlhttp.responseText && xmlhttp.responseText != "") {
                    let result = xmlhttp.responseText.match("121798467_56387");
                    if(result != null) httpResult = '. ' + name;
                }  
            }

            sleep(2000);
            console.log(i + httpResult);
        } catch(err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
            sleep(2000);
            console.log(i + ". Ошибка");
        }
    }

    console.log("Конец");
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}