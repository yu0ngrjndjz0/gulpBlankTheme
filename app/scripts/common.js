var DHT = {};

(function($) {
    /************************************************************
    * Predefined variables
    *************************************************************/
    var $window = $(window),
    $document   = $(document),
    $body       = $('body'),
    vn_state,
    $html       = $('html');

    DHT.naviCurent = function () {
      var scrollDistance = $(window).scrollTop();
      var navH = $('.mainNav').innerHeight();

      check($window.width());
      function check(el) {
        if (el > 1024) {
          $('.container > section').each(function(i) {
            var block = $(this).position().top;
            if (block <= (scrollDistance + navH)) {
              $('.mainNav li.current').removeClass('current');
              $('.mainNav li').eq(i).addClass('current');
            }
          });
        }
      } 
    }

    DHT.test = function () {
      $('.header').click(function() {
        console.log('acvss');
        alert('avsss');
      });
    }



    /************************************************************
    * DHT Window load, ready, scroll, resize and functions
    *************************************************************/
    //Window load functions
    $window.on('load',function(){
      // DHT.test();  
    });
    //Document ready functions
    $document.ready(function () {
      DHT.test();      
    });

    //Window scroll functions
    $window.on('scroll',function(){

    });

    //Window resize functions
    $window.on('resize',function(){

    });

})(jQuery)
