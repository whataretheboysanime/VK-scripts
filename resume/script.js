var processChangingOfColorsOuter, processChangingOfColorsInner;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var labelAnimate = function() {
    var txt = $("#animate-text");

    //Animate welcome screen text
    setTimeout(function() {
        txt.fadeOut(1500);
        txt.slideDown(1500, function() {
            txt.animate({
                color: getRandomColor(),
            }, 1000);
            txt.addClass("scaleThis");
        });
    }, 3000);
}

function changingColor(txt) {
    var txt = $("#animate-text");

    processChangingOfColorsOuter = setTimeout(function run() {           
        txt.animate({
            color: getRandomColor(),
        }, 1500);
        processChangingOfColorsInner = setTimeout(run, 1600);
    }, 1600);
}

var IsActiveHome = function() {
    var txt = $("#animate-text");

    if($("#home-link").hasClass("active")) {
        console.log("home has class active");
        labelAnimate();
        setTimeout(changingColor, 6500);
    } else {
        if(txt.hasClass("scaleThis")) { 
            clearTimeout(processChangingOfColorsInner);    
            clearTimeout(processChangingOfColorsOuter);   
            txt.animate({
                color: "aliceblue" 
            }, 1000)
            txt.removeClass("scaleThis");
        }
    }
}

function linkTransform () {
    let achievements = document.querySelector("#portfolio > div > ul").childNodes;
    let count = achievements.length;

    for(let i = 1; i <= (count - 1) / 2; i++) {
        let href = document.querySelector("#link" + i).parentElement.href;

        let url = new URL(href);

        let path = url.pathname;
        let partOfPaths = path.split("/");
        let title = partOfPaths[partOfPaths.length - 1];

        let inner = `&nbsp;${title}<br><br>&nbsp;${url.hostname}`;

        $("#link" + i).addClass("link-box");
        document.querySelector("#link" + i).innerHTML += inner;
    }
}

$(document).ready(function() {
    linkTransform();
    IsActiveHome();

    // Smooth scrolling
    $(".scroll").click(function(e) {
        e.preventDefault();

        $("body, html").animate({
            scrollTop: $(this.hash).offset().top - 50
        }, 1000);

        setTimeout(IsActiveHome, 1100);
    });

    // Active link switching
    $(window).scroll(function() {
        var scrollbarPosition = $(this).scrollTop();
        var homeOffset = $("#home").offset().top;
        var aboutOffset = $("#about").offset().top;
        var projectsOffset = $("#portfolio").offset().top;
        var contactOffset = $("#contacts").offset().top;

        if(contactOffset - 60 <= scrollbarPosition) {
            $("#contacts-link").addClass("active");
            $("#portfolio-link, #about-link, #home-link").removeClass("active");
        }
        else if(projectsOffset - 60 <= scrollbarPosition) {
            $("#portfolio-link").addClass("active");
            $("#contacts-link, #about-link, #home-link").removeClass("active");
        }
        else if(aboutOffset - 60 <= scrollbarPosition) {
            $("#about-link").addClass("active");
            $("#contacts-link, #portfolio-link, #home-link").removeClass("active");
        }
        else if(homeOffset - 60 <= scrollbarPosition) {
            $("#home-link").addClass("active");
            $("#contacts-link, #portfolio-link, #about-link").removeClass("active");
        }
    });
});