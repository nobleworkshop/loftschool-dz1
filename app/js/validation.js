// Модуль валидации

var validation = (function () {

  var init = function (){
    console.log('Инициализация модуля validation ');
    _setUpListeners();
  };

  // Прослушивает все события 
  _setUpListeners = function(){
    // удаляем красную обводку у элементов форм
    $('form').on('keydown', '.has-error', _removeError);
    // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
    $('form').on('reset', _clearForm);
  };

  _removeError = function() {
    console.log('Запуск ф-ии _removeError в validation.js');
    $(this).removeClass('has-error');
  };
  

  _clearForm = function(form){
    console.log('Запуск ф-ии _clearForm в validation.js');
    var form = $(this);
    console.log(form);
    
    form.find('input, textarea').trigger('hideTooltip'); // удаляем тултипы
    form.find('.has-error').removeClass('has-error') // удаляем красную подсветку
    
    // очищаем и прячем сообщения с сервера
    form.find('.error-mes, success-mes').text('').hide(); 
  };


  // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
  validateForm = function(form) {
    console.log('Запуск метода validateForm модуля validation внутри файла validation.js');
    
    var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
      valid = true;

    // console.log(elements);

    $.each(elements, function(index, val) {
      var element = $(val),
        val = element.val(),
        pos = element.attr('qtip-position');

      if(val.length === 0){
        element.addClass('has-error');
        _createQtip(element, pos);
        valid = false;
      };

    });//each 

    // console.log(valid);

    return valid;
    console.log('Проверка прошла');
  };//validateForm

  // Создаёт тултипы
  _createQtip = function (element, position) {
    console.log('Запуск функции _createQtip внутри файла validation.js');
    
    if (position === 'right') {
      position = {
        my: 'left center',
        at: 'right center',

      }
    } else {
      position = {
        my: 'right center',
        at: 'left center',
        adjust: {
          method: 'shift none'
        }
      }
    }//if

    element.qtip({
      content: {
        text: function() {
          return $(this).attr('qtip-content');
        }
      },
      show: {
        event: 'show'
      },
      hide: {
        event: 'keydown hideTooltip'
      },
      position: position,
      style: {
        classes: 'qtip-mystyle qtip-rounded',
        tip: {
          height: 10,
          width: 16
        }
      }
    }).trigger('show');
  };//_createQtip


  return {
    init: init,
    validateForm: validateForm
  };


})();//var validation

validation.init();