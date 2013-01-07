(function( $ ){
  $.fn.IE9PodcastPlayer = function(options) {
  
  var settings = {
      'playerStatusDiv' : '#podcastStatus',
      'currentShowIndex' : 0
    };

    this.each(function() {        
      // If options exist, lets merge them
      // with our default settings
      if ( options ) { 
        $.extend( settings, options );
      }
    });

    function initButtons() {
        try {
            // Developer sample code
            if(window.external.msIsSiteMode()) {
                // Add buttons listener
                document.addEventListener('msthumbnailclick', onButtonClicked, false);
    
                // Add buttons
                btnPrev = window.external.msSiteModeAddThumbBarButton('/images/prev.ico', 'Previous');
                btnPlayPause = window.external.msSiteModeAddThumbBarButton('/images/play.ico', 'Play');
                btnNext = window.external.msSiteModeAddThumbBarButton('/images/next.ico', 'Next');
    
                // Add styles
                stylePlay = window.external.msSiteModeAddButtonStyle(btnPlayPause, '/images/play.ico', "Play");
                stylePause = window.external.msSiteModeAddButtonStyle(btnPlayPause, '/images/pause.ico', "Pause");
                
                // Show thumbar
                window.external.msSiteModeShowThumbBar();
            }
        }
        catch(e) {
            // fail silently
        }
    }
    
    function onButtonClicked(e) {
        var btnText = "",
            lastIndex = 0;
        
        if (e.buttonID !== btnPlayPause) {        

            switch (e.buttonID) {
                case btnPrev:
                    btnText = "Previous";
                    settings.currentShowIndex--;
                    if (settings.currentShowIndex < 0) { settings.currentShowIndex = 0 };
                    break;
                case btnNext:
                    btnText = "Next";     
                    lastIndex = $('audio').length-1;
                    settings.currentShowIndex++;
                    if(settings.currentShowIndex >= lastIndex) { settings.currentShowIndex = lastIndex };
                    break;
            }

            stopAll();        
            $(settings.playerStatusDiv).text(btnText).fadeIn('slow',
                function(){playPause(settings.currentShowIndex)}
            );        
        } else {
        
            playPause(settings.currentShowIndex);            
            
        }
    }

    function stopAll() {
        $('audio').each(function(){
            try {
                    $(this)[0].pause();
            }
            catch(e) {
                // fail silently
            };
        });
        $(settings.playerStatusDiv).hide();
    }

    function playPause(podcastID) {
        var player = $('audio')[podcastID];
        if(player.paused)
        {
            player.play();
            $(settings.playerStatusDiv).text("Playing...").fadeIn('slow');
        }
        else
        {
            player.pause();
            $(settings.playerStatusDiv).text("Paused").fadeIn('slow');
         }
            
        updatePlayPauseButton(podcastID);
    }
    
    function updatePlayPauseButton(podcastID) {
        var player = $('audio')[podcastID];
        try {
            if(window.external.msIsSiteMode()) {
                if (player.paused)
                    window.external.msSiteModeShowButtonStyle(btnPlayPause, stylePlay);
                else 
                    window.external.msSiteModeShowButtonStyle(btnPlayPause, stylePause);
            }
        }
        catch(e) {
            // fail silently
        }
    }
    
    function addSite() {
        try {
            window.external.msAddSiteMode();
        }
        catch (e) {
            alert("This feature is only available in Internet Explorer 9. Bummer.");
        }
    }
        
    initButtons();
    updatePlayPauseButton(0);

    if(location.pathname == "/")
    {
        window.external.msSiteModeClearJumpList()
        window.external.msSiteModeCreateJumplist('Episodes');    
        
        //This is the stuff we selected and passed in!
        this.filter(":lt(10)").each(function() {
            window.external.msSiteModeAddJumpListItem($(this).text().substring(41,60), this.href, '/favicon.ico');
        });
    
        window.external.msSiteModeShowJumplist();
    }

  };
})( jQuery );

    
    