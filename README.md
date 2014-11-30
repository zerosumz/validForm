validForm
=========

이것은 뭐지?
------------

자바스크립트 폼 밸리데이션 라이브러리


맛보기 
------

````html
<form>
    <input type="text" data-valid="[REQUIRED('이메일'), [/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/, '<strong>이메일</strong> 형식이 틀립니다.']]">
  	<input type="password" data-valid="[REQUIRED('비밀번호')]">
</form>
<script>
    $('form').validForm();
</script>
````

어떻게씀?
---------

* 총 세 개의 jqury 확장 함수
    * valid(_tests_) : 한 개의 `:input` 에 대해서 _tests_ 를 차례로 검증
        * _tests_ 
            * 정규식,메세지 쌍
            * `:input`을 this로 갖는 함수. 
        * 검증에 실패하면 해당 메세지를 `throw`
    * validForm(_handler_) : submit handler. 한 `form`에 존재하는 모든 `:input` 마다 valid 호출.
        * 각 `:input` 마다 data-valid 어트리뷰트를 읽어서 평가함.
        * 각 `:input` 의 평가순서는 폼 내 포지션.
        * valid 에서 예외가 던져지면
            * _handler_ 가 호출되거나
            * $.validDialog 가 존재하면 alert 메서드 호출
            * 둘다 존재하지 않을경우 window.alert 호출
        * _handler(e)_ 는 submitEvent를 인자로 가짐.
        * e.exceptionMessage 가 에러메세지
        * e.input 이 말썽을 일으킨 `:input`
    * validFormNow : validForm 의 즉시실행 버전.

* data-valid 작성
    * 여러 정규식,에러메세지 짝의 배열
    * 함수의 배열
        * 함수는 this로 말썽을 부린 해당 input 을 갖는다. 화면에 표시할 에러메세지를 `throw` 한다.
    * 혹은 두 가지를 섞어 쓸 수 있다.


* 예제
````html 정규식,메세지짝 예제
<input type="text" data-valid="[[  /^.+$/  ,    '값을 입력해주세요'          ],
                                [  /\d/    ,    '숫자가 하나정돈 필요합니다.'],
                                [  /^.{6}$/,    '6자리로 입력해주시겠어요?'  ]]">
````

````javascript 함수예제
function PASSWORD_CONFIRM(){
	if($('input[name="user.passwd"]').val() != $(this).val())
	    throw '<strong>비밀번호/비밀번호확인</strong>이 동일하지 않습니다.';
}
````
````html
<input id="passwdConfirm" type="password" data-valid="[PASSWORD_CONFIRM]">

````

* data-valid 용 편의함수
    * REQUIRED(_이름_)
        * 해당 _이름_ 을/를 입력해주세요 ~



REQUIRES
--------

* [jquery](http://jquery.com/)
* [underscore](http://underscorejs.org/)


그리고 번들들...

* [jQuery BlockUI Plugin 살짝 변경한..](https://github.com/zerosumz/blockui)
* 그리고 부트스트랩(테마)
* 이를 이용한 다이얼로그..


데모페이지
----------

http://demo.ehjang.com/valid_form_demo/login.html
