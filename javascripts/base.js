$( document ).ready(function(){
  var previewItems = $('.icon-preview').find($('.icon-preview--item'));
  var searchBox = $('.search-box')
  var noIconsInfo = $('.no-icons-found')
  var iconRequestMailLink = noIconsInfo.find('a')

  $(searchBox).on("keyup", function() {
    var query = $(this).val()
    
    if (query.length > 0) {
        previewItems.hide();
        noIconsInfo.hide();
        previewItems.each(function(){
          var iconTags = $(this).data('tags');
          if (iconTags.indexOf(query) > -1) {
            $(this).show();
            noIconsInfo.hide();
          }
          else {
            $(this).hide();
            // Add the current search query to the Mail Subject
            iconRequestMailLink.attr('href', "mailto:icons@pitsch.me?subject=Studicons Icon Request: " + query )
            noIconsInfo.show();
          }
        })
    } else {
      noIconsInfo.hide();
      previewItems.show();
    }   
  });
});