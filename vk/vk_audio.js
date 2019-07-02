/*
 * *
 * * *
 * * * * Скрипты для VK Audio
 * * *
 * *
*/

/* 
    * Date: 18.06.2019
    * Version: 1.1
    * Current version API VK: 5.95
*/

//----------------------------------------    1    -----------------------------------------------

/*
    * ОПИСАНИЕ:
    
    * Скрипт для прокрутки станицы аудиозаписей.
    * Аргумент указывает скорость промотки (4 - 1000000 миллисекунд), является опциональным.
    * По умолчанию скорость равно полсекунды (100 миллисекунд).

	* Для остановки скрипта использовать функцию stopScrollAudio (пример использования ниже).
*/

//----------------------------------------  BEGIN  -----------------------------------------------

var interval;
let start, exetuteTime;

function getCellHeight (classOfDiv) {
	return classOfDiv.offsetHeight;
}

function initHeight (classOfDiv) { 
	let init = classOfDiv.offsetTop;
	let height = ((100 - init) * document.documentElement.clientHeight) / 100;
	window.scrollTo(0, height);
	return height;
}

function defineAudioVKPage () {
	let currentHref = location.href;
	let vk_id = (vk.id).toString();

	if (currentHref.indexOf(vk_id) >= 0) return $(
			".audio_page__audio_rows_list._audio_page__audio_rows_list"
			+ "._audio_pl.audio_w_covers.audio_owner_list_canedit"
		);
	else return $(
			".audio_page__audio_rows_list._audio_page__audio_rows_list"
			+ "._audio_pl.audio_w_covers"
		);
}

//---------------------------------------- Другая реализация ---------------------------------------

//	function getCountOfAudio() {
// 	let page = currentAudioPage($(".audio_page_player_ctrl.audio_page_player_play._audio_page_player_play"));
// 	return page._pagePlaylist._list.length;
// }

//---------------------------------------- Другая реализация ---------------------------------------

function scrollAudio (ms) {
	let audios = defineAudioVKPage();

	let height = getCellHeight(audios.firstChild);
	var current = initHeight(audios.firstChild);
	
	if(ms != null && ms != undefined) {
			if (ms < 4) {
				ms = 4;
			} else if (ms > 1000000) {
				ms = 1000000;
			}
	} else {
		ms = 100;
	}

	start = performance.now();

	console.log(`speed: ${ms} milliseconds`);

	interval = setTimeout(function repeat () {
		window.scrollTo(current, current + height);
		current += height;
		interval = setTimeout(repeat, ms);
	}, ms);

	//----------------------------------- Другая реализация ----------------------------------


	//let count = audios.childNodes.length;

	// for(let i = 0; i < count; i++) {

		// setTimeout(() => {
		// 	window.scrollTo(current, current + height);
		// 	current += height;
		// }, ms * i);

	// }

	//----------------------------------- Другая реализация ----------------------------------
}

function stopScrollAudio () {
	clearTimeout(interval);

	exetuteTime = (performance.now() - start) / 1000;
	console.log(`Время выполнения: ${exetuteTime.toString().slice(0,-10)} seconds`);
}

// Пример вызова функции startScrollAudio: startScrollAudio() - без аргументов,
// startScrollAudio(30) - с аргументом "скорость пролистывания".
// Пример вызова функции stopScrollAudio: stopScrollAudio() - без аргументов.

//----------------------------------------   END   -----------------------------------------------

//----------------------------------------    2    -----------------------------------------------

/*
    * ОПИСАНИЕ:

	* Скрипт для добавления аудиозаписей VK.
	** Для начала необходимо зайти на чью-нибудь страницу с открытыми аудиозаписями.
	*** ЕСЛИ не вписать аргумент в функцию, ДОБАВИТ ВСЕ аудиозаписи.
	**** Аргументом является количество аудиозаписей, которое нужно добавить 
	**** (добавляются поочередно, начиная сверху вниз).
    *** Аргументом должно быть ЦЕЛОЕ число, не превосходящее количество аудиозаписей страницы.

	P.S. ВАЖНО!!!

	** ПЕРЕД ТЕМ, как добавить ВСЕ аудиозаписи, НЕОБХОДИМО пролистать страничку ДО КОНЦА
	* (до первой песни), чтобы страничка сгенерировала все div's!!! (В помощь скрипт №1)
*/

//----------------------------------------  BEGIN  -----------------------------------------------

function addAllAudiosFromAnotherVKPage () {
	let audioDivs = $(
			".audio_page__audio_rows_list._audio_page__audio_rows_list"
			+ "._audio_pl.audio_w_covers"
			).childNodes;
	
	let count = audioDivs.length;

	if(arguments[0] != null && arguments[0] != undefined 
		&& ("number" == typeof arguments[0])) {
		if (arguments[0] < count) count = arguments[0];
	}

	for (let i = 0; i < count; i++) {
		AudioUtils.addAudio(audioDivs[i]);
	}

	setTimeout(ToMyAudio(), 1000);
}

function ToMyAudio() {
    let str = `/audios${vk.id}`;
    let param = `[href = "${str}"]`.toString();
    nav.go($(param), event, {noback: true, params: {_ref: 'left_nav'}});
}

// Пример вызова функции: addAllAudiosFromAnotherVKPage() - без аргументов (добавление всех аудиозаписей),
// addAllAudiosFromAnotherVKPage(30) - с аргументом "количество аудиозаписей для добавления".

//----------------------------------------   END   -----------------------------------------------

//----------------------------------------    3    -----------------------------------------------

/*
    * ОПИСАНИЕ:

	* Скрипт УДАЛЕНИЯ аудиозаписей VK. Также, как и при добавлении аудиозаписей, чтобы УДАЛИТЬ ВСЕ
	** аудиозаписи, НЕОБХОДИМО полностью ПРОМАТАТЬ СТРАНИЦУ ДО ПЕРВОЙ аудиозаписи!!! (В помощь скрипт №1)
    *** ЕСЛИ не вписать аргумент в функцию, УДАЛИТ ВСЕ аудиозаписи.
	*** Аргументом является количество аудиозаписей, которое нужно удалить 
	** (удаляются поочередно, начиная сверху вниз).
	* Аргументом должно быть ЦЕЛОЕ число.
*/

/*
	* НЕОБХОДИМО скопировать также вспомогательные функции API VK, чтобы функция deleteAllAudios работала
*/

//----------------------------------------  BEGIN  -----------------------------------------------

function deleteAllAudios () {
	let audioDivs = $(
		".audio_page__audio_rows_list._audio_page__audio_rows_list"
		+ "._audio_pl.audio_w_covers.audio_owner_list_canedit"
	).childNodes;

	let count = audioDivs.length;

	if(arguments[0] != null && arguments[0] != undefined 
		&& ("number" == typeof arguments[0])) {
		if (arguments[0] < count) count = arguments[0];
	}

	for (let i = 0; i < count; i++) {
		masDataAudio = JSON.parse(audioDivs[i].getAttribute("data-audio"));
		e = g(masDataAudio); // вспомогательная функция API VK, см. ниже

		AudioUtils.deleteAudio(audioDivs[i], e); 
	}

	setTimeout(location.reload(), 3000);
}

// Пример вызова функции: deleteAllAudios() - без аргументов (удаление всех аудиозаписей),
// deleteAllAudios(30) - с аргументом "количество аудиозаписей для удаления".

/* 
	* Дополнительные структуры из API VK для удаления аудиозаписей
	* VK version API 5.95
*/

function n(t, e = !0) {
	var i = "";
	if (e = !AudioUtils.isPodcast(t) && e, isArray(t[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS]) && (i = AudioUtils.getAudioArtistsString(t[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS], e)), isArray(t[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS]) && (i += " feat. ", i += AudioUtils.getAudioArtistsString(t[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS], e)), !i) {
		console.log(t[AudioUtils.AUDIO_ITEM_INDEX_HASHES]);
		var a = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(/<\/?em>/g, "");
		if (e) i = `<a class="artist_link" data-performer="${a}" href="${"/audio?performer=1&q="+encodeURIComponent(a)}">${a}</a>`;
		else i = a
	}
	return i
}

function g(t) {
	if (!t) return null;
	if (isObject(t)) return t;
	if ("string" == typeof t) return {
		id: t
	};
	var e = (t[AudioUtils.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
		i = (t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL] || "").split(","),
		a = n(t, !1);
	return {
		id: intval(t[AudioUtils.AUDIO_ITEM_INDEX_ID]),
		owner_id: intval(t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID]),
		ownerId: t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID],
		fullId: t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID],
		title: t[AudioUtils.AUDIO_ITEM_INDEX_TITLE],
		subTitle: t[AudioUtils.AUDIO_ITEM_INDEX_SUBTITLE],
		performer: a,
		duration: intval(t[AudioUtils.AUDIO_ITEM_INDEX_DURATION]),
		lyrics: intval(t[AudioUtils.AUDIO_ITEM_INDEX_LYRICS]),
		url: t[AudioUtils.AUDIO_ITEM_INDEX_URL],
		flags: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS],
		context: t[AudioUtils.AUDIO_ITEM_INDEX_CONTEXT],
		extra: t[AudioUtils.AUDIO_ITEM_INDEX_EXTRA],
		accessKey: t[AudioUtils.AUDIO_ITEM_ACCESS_KEY],
		addHash: e[0] || "",
		editHash: e[1] || "",
		actionHash: e[2] || "",
		deleteHash: e[3] || "",
		replaceHash: e[4] || "",
		urlHash: e[5] || "",
		restoreHash: e[6] || "",
		canEdit: !!e[1],
		canDelete: !!e[3],
		isLongPerformer: t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_LONG_PERFORMER_BIT,
		canAdd: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_CAN_ADD_BIT),
		coverUrl_s: i[0],
		coverUrl_p: i[1],
		isClaimed: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_CLAIMED_BIT),
		isExplicit: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_EXPLICIT_BIT),
		isUMA: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_UMA_BIT),
		isReplaceable: !!(t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_REPLACEABLE),
		ads: t[AudioUtils.AUDIO_ITEM_INDEX_ADS],
		album: t[AudioUtils.AUDIO_ITEM_INDEX_ALBUM],
		albumId: intval(t[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_ID]),
		albumPart: intval(t[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_PART]),
		trackCode: t[AudioUtils.AUDIO_ITEM_INDEX_TRACK_CODE],
		restrictionStatus: t[AudioUtils.AUDIO_ITEM_INDEX_RESTRICTION],
		useNewStats: Boolean(t[AudioUtils.AUDIO_ITEM_INDEX_NEW_STATS])
	}
}

//----------------------------------------   END   -----------------------------------------------