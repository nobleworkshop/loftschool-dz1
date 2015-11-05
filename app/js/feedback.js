// Объявление модуля
var contactMe = (function () {

	// Инициализирует наш модуль
	function init () {
		_setUpListners();
	};

	// Прослушивает события 
	function _setUpListners () {
		$('#contactForm input[type="submit"]').on('click', _submitForm);	
	};

  	var _submitForm = function(e){
  		console.log('_submitForm');
  		e.preventDefault();

  		var form = $(this),
  			url = 'feedback.php',
  			defObj = _ajaxForm(form,url);
  			// something we will do with server answer defObj
  	}

  	var _ajaxForm = function (form, url) {
  		console.log('ajx запрос с проверкой');
  		if (!validation.validateForm(form)) return false;
  		// if false - then programm stop here

  	};

	// Возвращаем объект (публичные методы) 
	return {
		init: init
	};

})();

// Вызов модуля
contactMe.init();