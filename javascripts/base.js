$( document ).ready(function(){

  var getIconsFromJson = function(callback) {
    $.getJSON( "../icons/studicons.json", function( data ) {
      var icons = [];
      $.each( data, function( icon, tags ) {
        firstTag = tags.split(' ')[0];
        icons.push( '<div class="icon-preview--item" data-tags="' + tags + '"><img src="../icons/studicons-' + firstTag + '.png" height="40" alt="' + icon + '"><p class="icon--name mt24">' + icon + '</p></div>' );
      });
      $('.icon-preview').html(icons);

      // Change icons count in feature box
      changeIconsCount(icons);
      callback();
    });
  };

  var changeIconsCount = function(icons) {
    if (icons.length > 0) {
      var iconsCount = icons.length;
      $('.icons--count').text(iconsCount);
    }
  };

  var filterIconList = function(){
    var searchBox = $('.search-box')
    var noIconsInfo = $('.no-icons-found')
    var iconRequestMailLink = noIconsInfo.find('a')
    var previewItems = $('.icon-preview').find('.icon-preview--item');


    $(searchBox).on("keyup", function() {
      var query = $(this).val().toLowerCase()
      noIconsInfo.hide();

      if (query.length > 0) {
        previewItems.hide();
        var itemsFound = false;
        previewItems.each(function(){
          var iconTags = $(this).data('tags');
          if (iconTags.indexOf(query) > -1) {
            $(this).show();
            itemsFound = true;
          }
          else {
            $(this).hide();
            // Add the current search query to the Mail Subject
            iconRequestMailLink.attr('href', "mailto:icons@pitsch.me?subject=Studicons Icon Request: " + query )
            
          }
        })
        if (!itemsFound) {
          noIconsInfo.show();
        }

      } else {
        previewItems.show();
      }   
    });
  }

  getIconsFromJson(filterIconList);

  // Smooth Scrolling from https://css-tricks.com/snippets/jquery/smooth-scrolling/
  
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  
});