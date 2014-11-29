
function addHangulSuffix(whenLastSyllableExist, whenLastSyllableNotExist ){
	return function(){
				return (this.charCodeAt(this.length - 1) - 44032) % 28 
						!= 0 ? whenLastSyllableExist : whenLastSyllableNotExist;
	}
}

String.prototype.을를 = addHangulSuffix('를','을');
String.prototype.이가 = addHangulSuffix('이','가');
String.prototype.은는 = addHangulSuffix('은','는');
String.prototype.와과 = addHangulSuffix('와','과');


function Dialog(icon){
	var dialogTemplate = 
	'<div>'+
	'    <div style="z-index:99999; display: none">'+
	'		<div style="font-size: 30px; ">'+
				icon+
	'		</div>'+
	'		<div>'+
	'			<p class="modal_msg"  style="margin-top: 10px; margin-bottom: 10px">'+
	'			</p>'+
	'				<a id="dismiss" href="#;" class="btn btn-lg btn-danger" style="margin-bottom:10px">'+
	'					확인'+
	'				</a>'+
	'		</div>'+
	'	</div>'+
	'</div>';
	var $dialog = $($(dialogTemplate).html());
	var $dismiss = $dialog.find('#dismiss');
	
	$(document.body).append($dialog);

	return {
		dialog: $dialog,
		alert: function(message, callback){
			this.dialog.find('p.modal_msg').html(message);
			
			$dismiss.click(function(){
				$('div#big_block').unblock({
						fadeOut:150, 
						onUnblock: function(){
							$('div#big_block').remove();
							$(this).find('p.modal_msg').empty();
							$(this).find('p.modal_msg_detail').empty();
							if(_.isFunction(callback))
								callback();
						}
				});
			});
			
			$('<div id="big_block" style="position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:99999" />')
				.appendTo(document.body)
			    .block({	
					baseZ: 99999,
					fadeIn: 500,
					opacity: 0.2,
					message : this.dialog ,
					css:{
						width:		'322px',
						
						border: 		  0,
						'border-radius': '20px',
						'-webkit-box-shadow': '0px 2px 10px 0px rgba(50, 50, 50, 0.75)',
						'-moz-box-shadow':    '0px 2px 10px 0px rgba(50, 50, 50, 0.75)',
						'box-shadow':         '0px 2px 10px 0px rgba(50, 50, 50, 0.75)',
						top:		(document.body.clientHeight / 2) - 200 ,
						left:		(document.body.clientWidth / 2) - 161
					}
				}); 
		}
	} 
}

var dialog = new Dialog('<span class="glyphicon glyphicon-warning-sign" style="	color: #B33A3A;"></span>');
var goodDialog = new Dialog('<span class="glyphicon glyphicon-ok" style="color: #5CB85C;"></span>');

/**
 * 커스텀 다이얼로그 박스를 위한 벨리데이션 플러그인
 *
 * usage
 * <pre>
 * $('form#foo').validForm();
 * </pre>
 *
 * @author 장유현
 *
 * @param tests
 *            함수 혹은 에러메세지와 짝을 이루는 함수 혹은 정규식 배열
 * @returns void
 *
 */
$.fn.extend({
	valid : function(tests) {
			_(tests).each(function(test) {
				var $input = $(this);
				var value = $input.val();
				if (_.isFunction(test)) {
					try{
						test.call(this, value);
					} catch (e){
						throw {exceptionMessage : e, input :$input};
					}
				} else if (_.isArray(test)) {
					var testTerm = test[0];
					var exceptionMessage = test[1];
					if( (_.isRegExp(testTerm) && !(testTerm.test(value)))
							||  (_.isFunction(testTerm) && !(testTerm.call(this, value)))
							|| 	(_.isBoolean(testTerm) && !testTerm) )
						throw {exceptionMessage : exceptionMessage, input :$input};
				} else {
					throw {exceptionMessage : "스크립트 오류", input :$input};
				}
			}, this);
	},
	validForm : function(handler){
		var $this = $(this);
		$this.submit(function(submitEvent){
			$this.find(':input:enabled').each(function(idx, el){
				var validData = eval($(el).data("valid"));
				if(!_.isEmpty(validData)){
					try{
						$this.valid.call(el, validData);
					} catch (e) {
						if(submitEvent.preventDefault){
							submitEvent.stopImmediatePropagation();
							submitEvent.preventDefault();
						}

						submitEvent.returnValue = false;

						if(_.isFunction(handler)){
							handler(e);
						} else {
							dialog.alert(e.exceptionMessage, function(){$(el).focus();});
						}
						return false;
					}
				}
			});
		});
	},
	validFormNow : function(handler){
		var result = true;
		var $this = $(this);
		$this.find(':input:enabled').each(function(idx, el){
			var validData = eval($(el).data("valid"));
			if(!_.isEmpty(validData)){
				try{
					$this.valid.call(el, validData);
				} catch (e) {
					if(_.isFunction(handler)){
						handler(e);
					} else {
						dialog.alert(e.exceptionMessage , function(){
							$(el).focus();
						});
					}
					result = false;
					return false;
				}
			}
		});
		return result;
	}
});

function REQUIRED(targetName , comment){
	if(_.isEmpty(targetName))
		targetName = $(this).before().text();
	return function (value){
		if(/^.+$/.test(value) == false)
			throw '<strong>' + targetName + '</strong>' 
				   + targetName.을를() + (_.isEmpty(comment) ?  ' 입력해 주세요.' : comment);
	}
}


function MUST_AGREE(targetName) {
	return function(){
		if(!$(this).is(':checked'))
			throw  '<strong>'+ targetName + '</strong>에 동의하셔야 합니다.';
	}
}

function MUST_CHECK (targetName, comment) {
	return function(){
		if(!$(this).is(":checked"))
		throw '<strong>' + targetName + '</strong>' 
			   + targetName.을를() +  (_.isEmpty(comment) ?  ' 반드시 체크해 주세요' : comment);
	}
}

function CHECK_EXTERNAL(checkValue, targetName){
	return function (){
		if(!checkValue)
			throw '<strong>' + targetName + '</strong>'+ targetName.을를() + " 체크해주세요";
	}
}

function HIDDEN_INPUT(targetName){
	return function(){
		var $this = $(this);
		if($this.is(':visible') && _.isEmpty($this.val()))
			throw '<strong>'+targetName+'</strong>'+ targetName.을를() + ' 입력하여 주세요.';	
	}
}

