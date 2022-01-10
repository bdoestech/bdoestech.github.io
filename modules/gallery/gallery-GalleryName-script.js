$(function () {

function GalleryName() {
    var slidewidth = document.getElementById("GalleryName").offsetWidth;
    var animationduration =600;
    // Comment the line below out if you do not want the automatic slide changing 
    var currentslide = 1;
    var GalleryName_timer = setInterval(goToSlide, 5000);
    // edit the number above to change how often (in milliseconds) the slides change
    var tempbar = document.createElement("li");
    tempbar.className = "bar";
    $("#GalleryName #bar_island_ul").get(0).appendChild(tempbar);
    var bar_opacity = $("#GalleryName .bar").css("opacity");
    $("#GalleryName .bar").remove()
    // update which bar is the selected bar based on the given slide
    function updateBars(slideNumber) { // must come before currentslide value is updated
    
        //bars[oldslide - 1].classList.remove("selected");
        jQuery(bars[oldslide - 1]).removeClass("selected");
        jQuery(bars[currentslide - 1]).addClass("selected");
        jQuery(bars[oldslide - 1]).animate({
            "opacity": bar_opacity
        }, 150)
        //bars[slideNumber - 1].classList.add("selected")
        jQuery(bars[slideNumber - 1]).animate({
            "opacity": 1
        }, 150)
    }

    // jump to specified slide number (including clones)
    function goToSlide(slideNumber = currentslide + 1) {
     if(slideNumber>numofslides){
			  slideNumber = 1;
		  }
        if (!$(jQuery(slides[oldslide - 1])).is(':animated')) {
            clearInterval(GalleryName_timer);
            GalleryName_timer = setInterval(goToSlide, 5000);
            oldslide = currentslide;
            currentslide = slideNumber;
            jQuery(slides[oldslide - 1]).css("z-index", 3);
            jQuery(slides[currentslide - 1]).css("z-index", 2);

            jQuery(slides[currentslide - 1]).css("width", slidewidth);
            jQuery(slides[currentslide - 1]).css({
                "opacity": 1
            });
            jQuery(slides[oldslide - 1]).animate({
                "opacity": 0
            }, animationduration, "easeOutCubic");

            setTimeout(function() {
                jQuery(slides[oldslide - 1]).css("width", 0);
            }, animationduration, "easeOutCubic")
            updateBars(currentslide)
        }
    }

    var oldslide = 1;
    var slides = document.getElementById("GalleryName").querySelectorAll(".slide");

    var numofslides = $('#GalleryName #carousel').children().length;
    var min = 0;

    var sliderbtnhovered = false;

    //$("#GalleryName .slide").css("width", slidewidth);

    // start slideshow on "second slide" or the first non-clone slide
    $(slides[0]).css({
        width: slidewidth,
        opacity: 1
    })

    // click button to advance to the left
    $("#GalleryName .btn#left").click(function() {
        if (!$(jQuery(slides[oldslide - 1])).is(':animated')) {
            if (currentslide == 1) {
                goToSlide(numofslides)
            } else {
                goToSlide(currentslide - 1)
            }
        }
    });

    // click button to advance to the right
    $("#GalleryName .btn#right").click(function() {
        if (!$(jQuery(slides[oldslide - 1])).is(':animated')) {
            if (currentslide == numofslides) {
                goToSlide(1)
            } else {
                goToSlide(currentslide + 1)
            }
        }
    });

    // create outer bar containers automatically based off of number slides
    for (i = 0; i < numofslides; i++) {
        var newbar = document.createElement("li");
        newbar.className = "bar";
        $("#GalleryName #bar_island_ul").get(0).appendChild(newbar);
    }

    // create inner bars
    var bars = document.getElementById("GalleryName").querySelectorAll(".bar")
    for (i = 0; i < bars.length; i++) {
        var newinnerbar = document.createElement("div")
        newinnerbar.className = "innerbar"
        bars[i].appendChild(newinnerbar)
    }


    // set first bar as selected bar	
    bars[0].classList.add("selected")
    // animate bars when hovered
    $("#GalleryName .bar").hover(function() {
        $(this).stop().animate({
            "opacity": 1
        }, 150)
    }, function() {
        if (!($(this).hasClass("selected"))) {
            
            $(this).stop().animate({
                "opacity": bar_opacity
            }, 100)
        }
    });

    // original opacity of slider button
    var sliderbtn_opacity = $("#GalleryName .btn").css("opacity");

    // animate slider buttons when hovered
    $("#GalleryName .btn").hover(function() {
        sliderbtnhovered = true;

        $(this).stop().animate({
            "opacity": 1
        }, 100)
    }, function() {
        sliderbtnhovered = false;
        $(this).animate({
            "opacity": sliderbtn_opacity
        }, 140)
    });



    // change highlighted bar & move slideshow
    $("#GalleryName .bar").click(function() {
        if (!$(jQuery(slides[oldslide - 1])).is(':animated')) {
            if (!$(this).hasClass("selected")) {
                $(this).toggleClass("selected")
                for (i = 0; i < bars.length; i++) {
                    if ($(this)[0] === bars[i]) {
                        goToSlide(i + 1);
                    }
                }
            }
        }
    });

    // adjust width of slides if browser window resizes
    $(window).resize(function() {
        slidewidth = document.getElementById("GalleryName").offsetWidth;
        farthest = ((slides - 1) * slidewidth);
        clearInterval(GalleryName_timer);
        GalleryName_timer = setInterval(goToSlide, 5000);
        slideduration = slidewidth * .75;
        $("#GalleryName .slide").css("width", slidewidth);
        $("#GalleryName #carousel").css("width", slidewidth * slides);
        for (i = 0; i < slides.length; i++) {
            if (i + 1 != currentslide)
                jQuery(slides[i]).css("width", 0);
        }

    });
}
GalleryName();

});