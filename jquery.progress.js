(function($) {

  
    
        $.ProgressBar = function(params) {
            
            var base = this;
            
            base.options = {};
            $.extend(base.options,$.ProgressBar.defaultOptions,params);
            
            base.init = function() {
                
                base.done = false;
                base.loaded = 0;
                base.total = $(base.options.affectedElements).length;
        
                if(base.total==0) return;
        
                $(base.options.template).prependTo(base.options.parent);

        
                $('#progress_bar').css({
                    position: 'fixed',
                    background: base.options.progressBarColor,
                    height: base.options.progressBarHeight,
                    marginTop: -(base.options.progressBarHeight/2)
                });

                $('#progress_bar').fadeTo(0,1);
                $(base.options.affectedElements).load(function(){
                    if(base.done === false) {
                        base.loaded++;  
                        base.updateProgressBar();
                    }
                });
                
                $(window).load(function(){
                    base.done = true;
                    base.loaded = base.total;
                     
                    base.updateProgressBar();
          
                });
                
            }

            
            base.updateProgressBar = function() {
                var perc = parseInt((base.loaded/base.total)*100);
        
                $('#progress_bar').stop().animate({
                    width: perc+'%'
                },100);
                
        
                if(perc === 100) {
            setTimeout(function(){
              $('#progress_bar').fadeOut('slow');
            },base.options.waitAfterEnd);
                }
            }
            
            base.init();
            
        }; 
         
        $.ProgressBar.defaultOptions = {
            backgroundColor: '#000',
            progressBarColor: '#f00',
            progressBarHeight: 3,
            parent: '#info-content',
            affectedElements: 'img',
            template: "<div id='progress_bar'></div>",
            lockOverflow: false,
            waitAfterEnd: 100
        };
        

})(jQuery);