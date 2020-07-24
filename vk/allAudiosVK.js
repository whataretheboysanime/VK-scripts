var audioElement = document.querySelector("div.audio_page__audio_rows_list._audio_page__audio_rows_list._audio_pl.audio_w_covers.audio_owner_list_canedit").firstElementChild;
var count = 0;
var text = "";

while(true) {
    audioPropertyStr = audioElement.dataset["audio"].split(",");

    var name = audioPropertyStr[3].replace('"',"").replace('"',"");
    var artist = audioPropertyStr[4].replace('"',"").replace('"',"");

    count++;

    text += artist + " - " + name + "\n";

    if(audioElement.nextElementSibling)
        audioElement = audioElement.nextElementSibling;
    else
        break;
}

console.log(text);
console.log(count);