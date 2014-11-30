
function addHangulSuffix(whenLastSyllableExist, whenLastSyllableNotExist ){
	return function(){
				return (this.charCodeAt(this.length - 1) - 44032) % 28 
						!= 0 ? whenLastSyllableExist : whenLastSyllableNotExist;
	}
}

String.prototype.을를 = addHangulSuffix('을','를');
String.prototype.이가 = addHangulSuffix('이','가');
String.prototype.은는 = addHangulSuffix('은','는');
String.prototype.와과 = addHangulSuffix('와','과');

/**
 * 폼 검증을 위한 벨리데이션 플러그인
 *
 * usage
 * <pre>
 * $('form#foo').validForm();
 * </pre>
 *
 * @author 장유현
 *
 * @param tests
 *            함수 혹은 정규식,에러메세지 짝의 배열
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
						} else if(!!$.validDialog){
							$.validDialog.alert(e.exceptionMessage, function(){$(el).focus();});
						} else {
							alert(e.exceptionMessage);
							$(el).focus();
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
					} else if(!!$.validDialog){
						$.validDialog.alert(e.exceptionMessage, function(){$(el).focus();});
					} else {
						alert(e.exceptionMessage);
						$(el).focus();
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

