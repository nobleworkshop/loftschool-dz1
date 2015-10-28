var myModule = (function (){

    var init = function() {
            _setUpListeners();
        };

    var _setUpListeners = function () {
            //прослушка событий...
            $('#add_new_item').on('click', _showModal); // открыть модальное окно
            $('#add_new_project').on('submit', _addProject); // действие при отправке формы на добавлении проекта
        };

    var _showModal = function (ev) {
            // Выводим что нибуд в консоль, проверям, что наше действие срабатывает
            console.log('Вызов модального окна');

            // Отменяем стандартное поведение элемента. В данном случае это перемещение вверх окна по ссылке. Может быть отмена отправки формы. И т.д.
            ev.preventDefault();

            //Вешаем событие плагина bPopup на нужное нам модальное окно
            $('#add_new_project_popup').bPopup({
                            speed: 650,
                            transition: 'slideDown',
                            closeClass: 'close-popup',
                            onCLose: function () {
                                this.find('.form')
                                    .trigger("reset");
                            }
                            
                        });
        };

    var _addProject = function (ev) {
            console.log('Добавление проекта');
            ev.preventDefault();

            // Объявляем переменные
            var form = $(this);
                url = '../add_project.php';
                data = form.serialize();

            console.log(data);

            // запрос на сервер
            $.ajax({
                       url: 'add_project.php',
                       type: 'POST',
                       dataType: 'json',
                       data: data,
                    })
                    .done(function(ans) {
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                   });   

        };

    return {
        init: init
    }

})();

myModule.init();