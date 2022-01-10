$(function () {

    function SliderName() {
        var slidewidth = document.getElementById("SliderName").offsetWidth;
        var slideduration = 500;
        var oldslide;
        // Comment the line below out if you do not want the automatic slide changing 
        //var SliderName_timer = setInterval(moveRight, 7000);
        // edit the number above to change how often (in milliseconds) the slides change
        var tempbar = document.createElement("li");
        tempbar.className = "bar";
        $("#SliderName #bar_island_ul").get(0).appendChild(tempbar);
        var bar_opacity = $("#SliderName .bar").css("opacity");
        $("#SliderName .bar").remove()
        // update which bar is the selected bar based on the given slide
        function updateBars(slideNumber) { // must come before currentslide value is updated
            bars[oldslide - 2].classList.remove("selected");
            jQuery(bars[oldslide - 2]).animate({
                "opacity": bar_opacity
            }, 150)
            bars[slideNumber - 2].classList.add("selected")
            jQuery(bars[slideNumber - 2]).animate({
                "opacity": 1
            }, 150)
        }
    
        // loop around when the furthest right slide has been reached, resetting to the first slide
        function resetLeft() {
            $("#SliderName #carousel").animate({
                "left": -farthest + slidewidth
            }, 1);
            pos = -farthest + slidewidth;
            currentslide = slides - 1;
            updateBars(currentslide);
        }
    
        // loop around when the furthest right slide has been reached, resetting to the first slide
        function resetRight() {
            $("#SliderName ").animate({
                "left": -slidewidth
            }, 1);
            pos = -slidewidth;
            currentslide = 2;
            updateBars(currentslide);
        }
    
        // advance to the slide to the left
        function moveLeft() {
            if (!$("#SliderName #carousel").is(':animated')) {
                $("#SliderName #carousel").draggable("disable");
                oldslide = currentslide;
                if (currentslide == 2) {
                    currentslide = slides - 1;
                } else {
                    currentslide -= 1;
                }
                updateBars(currentslide);
                $("#SliderName #carousel").stop().animate({
                    'left': pos + slidewidth
                }, slideduration, "easeOutCubic");
                setTimeout(function() {
                    $("#SliderName #carousel").draggable("enable");
                }, slideduration);
                pos += slidewidth;
                setTimeout(function() {
                    if (currentslide == slides - 1) {
                        resetLeft();
                    }
                }, slideduration + 1);
            }
        }
    
        // advance to the slide to the right
        function moveRight() {
            if (!$("#SliderName #carousel").is(':animated')) {
                $("#SliderName #carousel").draggable("disable");
                oldslide = currentslide;
                if (currentslide == slides - 1) {
                    currentslide = 2;
                } else {
                    currentslide += 1;
                }
                updateBars(currentslide);
                $("#SliderName #carousel").stop().animate({
                    'left': pos - slidewidth
                }, slideduration, "easeOutCubic");
                setTimeout(function() {
                    $("#SliderName #carousel").draggable("enable");
                }, slideduration);
                pos -= slidewidth;
                setTimeout(function() {
                    if (currentslide == 2) {
                        resetRight();
                    }
                }, slideduration + 1);
            }
        }
    
    
        // jump to specified slide number (including clones)
        function goToSlide(slideNumber) {
            pos = -(slideNumber - 1) * slidewidth
            $("#SliderName #carousel").draggable("disable");
            $("#SliderName #carousel").animate({
                left: pos
            }, slideduration + slideduration*.5*Math.abs(slideNumber-currentslide), "easeOutCubic");
            setTimeout(function() {
                $("#SliderName #carousel").draggable("enable");
            }, slideduration + slideduration*.5*Math.abs(slideNumber-currentslide));
            currentslide = slideNumber;
        }
    
        //clone last before
        $('#SliderName .slide:first').before($('#SliderName .slide:last').clone());
        //clone first after
        $('#SliderName .slide:last').after($($('#SliderName .slide')[1]).clone());
    
        var slides = $('#SliderName #carousel').children().length;
        var min = 0;
        var farthest = ((slides - 1) * slidewidth);
        var pos = -slidewidth
        var currentslide = 2;
        var sliderbtnhovered = false;
        var minslidedist = 100;
        
        $("#SliderName .slide").css("width", slidewidth);
    
        // start slideshow on "second slide" or the first non-clone slide
        $("#SliderName #carousel").css({
            "left": -slidewidth
        })
    
        $("#SliderName #carousel").width(slides * slidewidth).draggable({
            axis: 'x',
            drag: function(event, ui) {
                if (ui.position.left > 0) ui.position.left = 0;
                if (ui.position.left < -farthest) ui.position.left = -farthest;
            },
            stop: function(event, ui) {
                if (ui.position.left < pos - minslidedist && ui.position.left > -farthest) // moving right
                {
                    moveRight()
                } else if (ui.position.left < pos && ui.position.left > -farthest && !$("#SliderName #carousel").is(':animated')) // return to sart position to the right
                {
                    $("#SliderName #carousel").stop().animate({
                        'left': pos
                    }, slideduration);
                } else if (ui.position.left > pos + minslidedist && ui.position.left < 0) // moving left
                {
                    moveLeft();
                } else if (ui.position.left > pos && ui.position.left < 0 && !$("#SliderName #carousel").is(':animated')) // return to sart position to the left
                {
                    $("#SliderName #carousel").stop().animate({
                        'left': pos
                    }, slideduration);
                }
            }
        });
    
        // click button to advance to the left
        $("#SliderName .btn#left").click(function() {
            if (pos < 0 && $("#SliderName #carousel").is(":not(:animated)")) {
                {
                    moveLeft();
                }
            }
        });
    
        // click button to advance to the right
        $("#SliderName .btn#right").click(function() {
            if (pos > -farthest && $("#SliderName #carousel").is(":not(:animated)")) {
                {
                    moveRight();
                }
            }
        });
    
        // create outer bar containers automatically based off of number slides
        for (i = 0; i < slides - 2; i++) {
            var newbar = document.createElement("li");
            newbar.className = "bar";
            $("#SliderName #bar_island_ul").get(0).appendChild(newbar);
        }
    
        // create inner bars
        var bars = document.getElementById("SliderName").querySelectorAll(".bar")
        for (i = 0; i < bars.length; i++) {
            var newinnerbar = document.createElement("div")
            newinnerbar.className = "innerbar"
            bars[i].appendChild(newinnerbar)
        }
    
    
        // set first bar as selected bar	
        bars[0].classList.add("selected")
        // animate bars when hovered
        $("#SliderName .bar").hover(function() {
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
        var sliderbtn_opacity = $("#SliderName .btn").css("opacity");
    
        // animate slider buttons when hovered
        $("#SliderName .btn").hover(function() {
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
         var newslide;
        // change highlighted bar & move slideshow
        $("#SliderName .bar").click(function() {
                if (!$("#SliderName #carousel").is(':animated')) {
            if (!$(this).hasClass("selected")) {
                $(this).toggleClass("selected")
                for (i = 0; i < bars.length; i++) {
                    if ($(this)[0] === bars[i]) {
    
                        oldslide = currentslide;
                        newslide = i +2;
                        updateBars(newslide)
                        
                    }
                }
                goToSlide(newslide);
            }
            }
        });
    
        // adjust width of slides if browser window resizes
        $(window).resize(function() {
            slidewidth = document.getElementById("SliderName").offsetWidth;
            farthest = ((slides - 1) * slidewidth);
            
            $("#SliderName .slide").css("width", slidewidth);
            $("#SliderName #carousel").css("width", slidewidth * slides);
            $("#SliderName #carousel").css({
                "left": -slidewidth * (currentslide - 1)
            })
            pos = -slidewidth * (currentslide - 1)
        });
    }
    SliderName();

});    