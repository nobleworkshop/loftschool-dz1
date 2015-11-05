// Модуль страница обратной связи
var contactMe = (function (){

  var init = function(){
    console.log('Инициализация модуля contactMe');
    _setUpListners();
  };


  _setUpListners = function (){
    $('#contactForm').on('submit', _submitForm); // отправка формы связаться со мной
  };


  _ajaxForm = function (form, url) {
    console.log('Выполняется ф-я _ajaxForm');

    // Возвращает false, если не проходит валидацию 
    // Тут мы через проверку делаем запуск модуля validation из файла
    // validation.js - его метода validateForm
    // если валидация средствами js не прошла, и validation.validateForm
    // не сработала, то есть вернула false
    // то и мы сразу возвращаем false и не запускаем проверку на сервере
    // Проверка на сервере запускается только после успешной проверки через
    // js на стороне клиента
    if (!validation.validateForm(form)) return false;

    // собираем данные из формы в объект data
    var data = form.serialize();

    // Возвращает Deferred Object
    // Непонятна эта конструкция 
    return $.ajax({
      type: 'POST',
      url: url,
      dataType: 'JSON',
      data: data
    }).fail( function(ans) {
      console.log('Проблемы в PHP');
      form.find('.error-mes').text('На сервере произошла ошибка').show();
    });
  };//_ajaxForm


  _submitForm = function (e) {
    console.log('запустилась функция _submitForm');

    e.preventDefault(); // отменили стандартное поведение сабмита формы

    var form = $(this),
        url = '/feedback.php',
        defObject = _ajaxForm(form, url);

    // запускаем ф-ю _ajaxForm которая лежит внутри переменной defObject
    // таким образом проверяя существует ли переменная defObject
    // мы запускаем ф-ю _ajaxForm на выполнение
    if (defObject) { 

      defObject.done(function(ans) {
        
        var mes = ans.mes, // ??? откуда эта переменная ans.mes, кажется это из php но как тогда она появилась в JS
            status = ans.status; // ??? откуда эта переменная ans.status

        if ( status === 'OK' ){
          form.trigger('reset');
          form.find('.success-mes').text(mes).show();
        } else {
          form.find('error-mes').text(mes).show();
        }// if

      });//defObject.done

    }; //if (defObject)

  };//_submitForm

  return {
    init: init
  };

})();

contactMe.init();