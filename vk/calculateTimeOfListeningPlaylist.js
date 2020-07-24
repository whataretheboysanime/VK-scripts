function calculateTimeOfListening() {
    let sumDuration = 0;
    let audioList = document.querySelector("div.audio_pl_snippet__list._audio_pl_snippet__list");
    let count = audioList.childElementCount;
    let audioInfo = null;

    for(let i = 0; i < count; i++) {
        audioInfo = audioList.children[i].dataset["audio"];
        sumDuration += parseInt(audioInfo.match(/"duration":\d{1,4},/)[0].match(/\d{1,4}/)[0]);
    }

    let totalTimeOfListening = new Date(0, 0, 0, 0, 0, sumDuration, 0);
    let outputTotalTime = totalTimeOfListening.getHours() + " ч. " 
                            + totalTimeOfListening.getMinutes() + " мин. "
                            + totalTimeOfListening.getSeconds() + " сек.";
    console.log(outputTotalTime);
}

calculateTimeOfListening();