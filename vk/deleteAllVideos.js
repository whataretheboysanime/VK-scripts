function deleteAllVideos(countVideosForDelete) {
    let listVideosElements = document.querySelector("#video_all_list");
    let countOfVideos = listVideosElements.childElementCount;
    let elVideo = listVideosElements.firstElementChild;

    if(countVideosForDelete == undefined 
        || countVideosForDelete == null 
        || countVideosForDelete > countOfVideos
        || countVideosForDelete <= 0) {
        countVideosForDelete = countOfVideos;
    }

    for(let i = 1; i <= countVideosForDelete; i++) {
        let hash = elVideo.dataset["addHash"];

        let idMas = elVideo.dataset["id"].split("_");
        let vkId = Number.parseInt(idMas[0]);
        let videoId = Number.parseInt(idMas[1]);

        elVideoForDelete = elVideo;
        if(elVideo.nextElementSibling) {
            elVideo = elVideo.nextElementSibling;
        }

        let deleteEl = document.querySelector("#video_item_" + elVideoForDelete.dataset["id"] + " > a > div > div.video_item_controls > div.video_thumb_actions > div.video_thumb_action_delete");

        Video.onVideoDelete(event, deleteEl, vkId, videoId, hash);
    }
}