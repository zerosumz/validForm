validForm
=========

이것은 뭐지?
------------

자바스크립트 폼 밸리데이션 라이브러리


어떻게 씀?
----------

````html
  <form>
    <input type="text" data-valid="[REQUIRED('이메일'), [/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/, '<strong>이메일</strong> 형식이 틀립니다.']]">
  	<input type="password" data-valid="[REQUIRED('비밀번호')]">
	</form>
	<script>
	  $('form').validForm();
	</script>
````

데모페이지
----------

http://ehjang.com/~ehjang/valid_form_demo/login.html


REQUIRES
--------

* [jquery](http://jquery.com/)
* [underscore](http://underscorejs.org/)
* [jQuery BlockUI Plugin](http://malsup.com/jquery/block/)
* 그리고 부트스트랩(테마)
