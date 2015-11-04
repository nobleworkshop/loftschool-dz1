var myModule = (function (){

    // Инициализирует наш модуль
    var init = function() {
            _setUpListeners();
        };

    // Прслушивает события
    var _setUpListeners = function () {
            //прослушка событий...
            $('#add_new_item').on('click', _showModal); // открыть модальное окно
            $('#add_new_project').on('submit', _addProject); // действие при отправке формы на добавлении проекта
        };

    // Работает с модальным окном
    var _showModal = function (ev) {
            // Выводим что нибуд в консоль, проверям, что наше действие срабатывает
            console.log('Вызов модального окна');

            // Отменяем стандартное поведение элемента. В данном случае это перемещение вверх окна по ссылке. Может быть отмена отправки формы. И т.д.
            ev.preventDefault();

            var divPopup = $('#add_new_project_popup'),
                form = divPopup.find('.form');

            //Вешаем событие плагина bPopup на нужное нам модальное окно
            divPopup.bPopup({
                            speed: 650,
                            transition: 'slideDown',
                            closeClass: 'close-popup',
                            onClose: function () {
                                form.find('.server-mes').text('').hide();
                                form.trigger("reset");
                            }
                            
                        });
        };

    // Добавляет проект
    var _addProject = function (ev) {
            console.log('Добавление проекта');
            ev.preventDefault();

                // Объявляем переменные
                var form = $(this),
                    url = 'add_project.php',
                    defObj = _ajaxForm(form, url);

                    if (defObj){
                            defObj.done(function(ans) {

                                var successBox = form.find('.success-mes'),
                                    errorBox = form.find('.error-mes');

                                if(ans.status === 'OK'){
                                        errorBox.hide();
                                        form.find('.success-mes').text(ans.text).show();
                                } else {
                                        successBox.hide();
                                        form.find('.error-mes').text(ans.text).show();
                                }

                            });
                    };

                
        };

    // Универсальная функция
    // Для её работы используются
    // @form - форма
    // @url - адрес php файла к которому мы обращаемся
    // 1. Собирает данные из формы
    // 2. Проверяет форму
    // 3. Делает запрос на сервер и возвращает ответ с сервера
    var _ajaxForm = function ( form, url) {
        
        if (!validation.validateForm(form)) return false;

        // if (!valid) return false;
        data = form.serialize();

        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        }).fail( function(ans) {
            console.log('Проблемы в PHP');
            form.find('.error-mes').text('На сервере произошла ошибка').show();
        });

        return result;

    };

    // Возвращаем объект (публичные методы)
    return {
        init: init
    };

})();

myModule.init();