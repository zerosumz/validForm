$.fn.extend({
    animationCont: function (cb) {
        this.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', cb);
        return this;
    }
});

/**
 *  formValid를 위한 기본 알림 다이얼로그
 *  부트스트랩 버튼 테마를 사용.
 *
 */
$.validDialog = function () {
    return (function () {
        var $dialog =
            $(
                '<div>' +
                '    <h3 style="display: none"><span class="glyphicon glyphicon-comment">Oops!!</h3>' +
                '    <h4 class="modal-msg" style="display: none"></h4>' +
                '    <button id="dismiss" type="button" class="btn btn-lg btn-info" style="display:none"><span class="ion-beer"> 나한테 술사주기</button>' +
                '</div>'
            );


        $dialog.css({
            'position': 'fixed',
            'z-index': 100000,
            'width': '350px',
            'text-align': 'center',
            'display': 'none',
            'border-radius': '10px',
            'padding': '10px',
            'background-color': '#0072c6',
            'margin': 'auto',
            '-webkit-animation-duration': '0.4s',
            '-moz-animation-duration': '0.4s',
            '-ms-animation-duration': '0.4s',
            '-o-animation-duration': '0.4s',
            'animation-duration': '0.4s'
        });



        $dialog.find('h3 , h4').css({
            'color': 'white',
            '-webkit-animation-duration': '0.6s',
            '-moz-animation-duration': '0.6s',
            '-ms-animation-duration': '0.6s',
            '-o-animation-duration': '0.6s',
            'animation-duration': '0.6s'
        });


        var $dialogContents = $dialog.find('h3, h4, button#dismiss');

        var $blockDiv = $('<div id="big_block" style="display: none; position:absolute;top:0;left:0;right:0;bottom:0;z-index:99999; background-color: black; opacity: .3" />');
        var $dismiss = $dialog.find('#dismiss');
        var afterDismiss = function(){};

        var self = {
            animateInSequence: function ($els, css, cb) {
                $els.each(function (idx, el) {
                    $(el)
                        .removeClass('slideOutUp flipOutX animated')
                        .animationCont(function () {
                            $(el).removeClass(css).css('animation-delay', 0);
                            if(_.isFunction(cb)){
                                cb();
                            }
                        })
                        .css('animation-delay', (idx * 0.1).toString() + 's')
                        .addClass(css)
                        .show();

                });
            },
            animateOutSequence: function ($els, css, cb) {
                $els.each(function (idx, el) {
                    $(el)
                        .removeClass('flipInX slideInDown animated')
                        .animationCont(function () {
                            $(el).hide()
                                .removeClass(css)
                                .css('animation-delay', 0);
                            if(_.isFunction(cb)){
                                cb();
                            }
                        })
                        .css('animation-delay', (idx * 0.1).toString() + 's')
                        .addClass(css);
                });
            },

            positioning: function(){
                var left =  parseInt(window.innerWidth / 2) - parseInt($dialog.width() / 2);
                var top =  parseInt(window.innerHeight / 2) - parseInt($dialog.height() / 2);

                $dialog.css({
                    'left': left,
                    'top' : top
                });
            },

            dialog: $dialog,
            alert: function (message, callback) {

                afterDismiss = callback;
                $blockDiv.fadeIn();
                self.dialog.find('h4.modal-msg').html(message);
                self.positioning();
                self.animateInSequence($dialog, 'flipInX animated');
                self.animateInSequence($dialogContents, 'slideInDown animated', function(){$dismiss.focus()});
            }
        };

        $dismiss.click(function () {
            self.animateOutSequence($dialogContents, 'slideOutUp animated');
            self.animateOutSequence($dialog, 'flipOutX animated');
            $blockDiv.fadeOut();
            afterDismiss();
        });

        $blockDiv.appendTo(document.body);
        $dialog.appendTo(document.body);

        $(window).resize(self.positioning);

        return self;
    })();
};

