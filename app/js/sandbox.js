var addProject = (function () {
    var init = function () {
        _setUpListners();
    };
    var _setUpListners = function () {
        $('#addProject').on('submit', _addProject);
        $('#login_page').on('submit', _addProject);
        $('#feedback_form').on('submit', _addProject);
    };
    var _addProject = function (ev) {
        ev.preventDefault();
        var form = $(this),
            url = './actions/add-project.php',
            defObject = _ajaxForm(form, url);
        if (defObject) {
            // ...дальнейшие действия с ответом с сервера
        }
    };
    var _ajaxForm = function (form, url) {
        if (validateForm.valid != true) return false;
        var data = form.serialize();
        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'JSON',
            data: data
        }).fail(function (ans) {
            console.log('Проблемы в PHP');
            form.find('.error-mes').text('На сервере произошла ошибка').show();
        });
    };
    return {
        init: init
    };

})();
addProject.init();
//////


//
// выполняет поиск форм и элементов
var search = (function () {

    /////////////////////////////
    var trigger = true;


    function findElementsForm(element) {
        for (var i in element.childNodes) {
            var n = element.childNodes[i];
            if (n.tagName) {
                if (n.getAttribute("type") == "text", n.getAttribute("name") == "img" || n.getAttribute("name") == "name" || n.getAttribute("name") == "url" || n.getAttribute("name") == "email" || n.getAttribute("name") == "password" || n.tagName == "TEXTAREA") {

                    //n.value = n.getAttribute("placeholder");
                    setPlaceholder(n, true);
                }
                findElementsForm(n);
            }
        }
    }



    /////////////////////////////////
    var arrayForms = new Array();//масив найденых форм на странице
    var arrayElements = new Array(); // массив найденых объектов в форме

    var findForms = function () {
        for (x = 0; x < document.forms.length; x++) {
            arrayForms.push(document.forms[x]);
            console.log("findForms");
            findElementsForm(document.forms[x]);
        }
    };
    var findElements = (function (element, property, trigger) {
        //---------------------------------------------------
        for (var i in element.childNodes) {
            var n = element.childNodes[i];
            if (n.tagName) {
                activeForm.setFormChilds(n);
                findElements(n);
            }
        }
        //---------------------------------------------------
    });
    return {
        findForms: findForms,
        arrayForms: arrayForms,
        findElements: findElements,
        findElementsForm: findElementsForm,
    }
})();
//
//запускает поиск элемента(ов) по массиву найденных элементов на странице
var loopWorker = (function () {
    function result(element, action) {
        //   console.log("erase");
        if (action == "erase") {
            for (i = element.length; i > 0; i--) {
                element.splice(0, 1);
            }
        }
        if (action == "mouseover") {
            var addListener = function addListenerF(element) {
                element.onmouseover = function () {
                    //setActiveForm.setForm(element);
                    activeForm.setForm(element);
                }
            }

            for (i = 0; i < element.length; i++) {
                element[i] = addListener(element[i])
            }
        }
    }
    return {
        result: result
    }
})();
//
//устанавливает активную форму
var setActiveForm = (function () {
    var forms;
    function init() {
        search.findForms();
        forms = search.arrayForms;
        loopWorker.result(forms, "mouseover");
    }
    return {
        init: init
    }
})();
//
//активная форма
var activeForm = (function () {
    var form;
    var formArray = new Array();
    function setForm(element) {
        if (element != form) {
            form = element;
            loopWorker.result(formArray, "erase");//remove old child
            loopWorker.result(validateForm.arrayNotValid, "erase"); // remove old input's
            loopWorker.result(validateForm.arraValid, "erase");// remove old input's
            search.findElements(form);// set childs 
            validateForm.init();// set form to validate
            return activeForm.form = form;// set new form
        }
    }
    function setFormChilds(element) {
        formArray.push(element);
    }

    return {
        setFormChilds: setFormChilds,
        formArray: formArray,
        setForm: setForm,
        form: form
    }
})();
//
//popup's
var popups = (function () {
    function init() {
        popupInit();
        listenersInit();
        qtipHide();
    }

    var popupLogin = {
        trigger: false,
        call: document.getElementById("login_call"),
        state: document.getElementById("wrapper_login"),
        state_popup: document.getElementById("overlay_login"),
        overlay: document.getElementById("overlay_login"),
        wrapper: document.getElementById("wrapper_login")
    }
    var popupProject = {
        call: document.getElementById("project_call"),
        state: document.getElementById("wrapper_addProject"),
        state_popup: document.getElementById("overlay_addProject"),
        overlay: document.getElementById("overlay_addProject"),
        wrapper: document.getElementById("wrapper_addProject"),
        closeButton: document.getElementById("close_addProject")
    }
    var window = {
        trigger: false,
        overflow: document.body.style.overflow,
        footer: document.getElementsByTagName("footer")[0],
        body: document.body,
        content: document.querySelectorAll('.content')[0]
    }
    var uploadHidden = document.getElementById('upload_hidden');
    var uploadVisible = document.getElementById('upload_visible');
    var buttonUpload = document.getElementById('button_upoad');
    var fileName = document.getElementById('upload_visible');

    function popupInit(popup) {
        if (popup == popupLogin && popupLogin.trigger == false) {
            popupLogin.trigger = true;
            popupLogin.overlay.style.display = 'block';
            popupProject.overlay.style.display = "none";
            popupLogin.wrapper.style.display = 'block';
            document.body.style.overflow = 'hidden';
            popupLogin.wrapper.style.position = 'absolute';
            window.footer.style.marginTop = '0';
            window.footer.style.zIndex = '1100';
            window.footer.style.position = 'relative';
            window.body.style.position = 'relative';
            window.body.style.bottom = '80px';
            show(window.content, popupLogin.trigger);
        } else if (popup == popupLogin && popupLogin.trigger == true || popup == popupLogin.overlay) {
            popupLogin.trigger = false;
            document.body.style.overflow = '';
            popupLogin.overlay.style.display = '';
            window.footer.style.marginTop = '';
            window.footer.style.position = '';
            window.body.style.position = '';
            window.body.style.bottom = '';
            popupProject.overlay.style.display = '';
            popupLogin.wrapper.style.display = '';
            show(window.content, popupLogin.trigger);
        } else if (popup == popupProject) {
            popupProject.overlay.style.display = "block";
            popupProject.wrapper.style.display = "block";
            window.footer.style.zIndex = '0';
        } else if (popup == popupProject.closeButton || popup == popupProject.overlay) {
            popupProject.overlay.style.display = "";
            popupProject.wrapper.style.display = "";
        }
    }
    function show(node, hidden) {
        for (var i in node.childNodes) {
            var n = node.childNodes[i];
            if (n.tagName) {
                if (hidden && n != popupLogin.overlay && n != popupProject.overlay && n != popupLogin.wrapper && n != popupProject.wrapper) {
                    n.style.display = "none";
                } else if (!hidden && n != popupLogin.overlay && n != popupProject.overlay && n != popupLogin.wrapper && n != popupProject.wrapper) {
                    n.style.display = '';
                }
                show(n);
            }
        }
    }

    function listenersInit() {
        try {
            popupLogin.call.onclick = function () {
                popupInit(popupLogin);
                qtipHide();
            }
            popupLogin.overlay.onclick = function () {
                popupInit(popupLogin.overlay);
                qtipHide();
            }
            popupProject.call.onclick = function () {
                popupInit(popupProject);
            }
            popupProject.closeButton.onclick = function () {
                popupInit(popupProject.closeButton);
                qtipHide();
            }
            popupProject.overlay.onclick = function () {
                popupInit(popupProject.overlay);
                qtipHide();
            }
            //upload
            uploadHidden.onchange = function () {
                document.getElementById('upload_visible').value = this.value;
                qtipHide(uploadVisible);
            };
            uploadVisible.onclick = function () {
                document.getElementById('upload_hidden').click();
            };
            buttonUpload.onclick = function () {
                uploadHidden.click();
            };
            //JQ!
        }
        catch (e) { }
    }

    function qtipHide(element) {
        $('.qtip-mystyle').hide(element);
        $(element).removeClass('has-error');

    }


    return {
        init: init
    }
})();
//
//regexp validation
var validateForm = (function () {
    var arrayNotValid = new Array();
    var arraValid = new Array();
    var submit, reset = "";
    var valid;

    function init() {
        validator(activeForm.formArray, false);
        submit.onclick = function () {
            console.log("submit");

            loopWorker.result(validateForm.arraValid, "erase");
            loopWorker.result(validateForm.arrayNotValid, "erase");
            validator(activeForm.formArray, true);
            vval();
        }
        reset.onclick = function () {
            console.log("reset");
            clearForm();
            loopWorker.result(arraValid, "erase");
            search.findForms();
        }
    }

    function validator(array, trigger) {

        for (i = 0; i < array.length; i++) {
            var re_url = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            var re_email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
            var re_name = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9-_\.]{1,20}$/;
            var re_image = /\.(gif|jpg|jpeg|tiff|png)$/;
            var re_password = /^[a-z0-9_-]{6,18}$/;
            var re_textarea = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

            if (trigger, array[i].getAttribute("type") == "text", array[i].getAttribute("name") == "img" || array[i].getAttribute("name") == "name" || array[i].getAttribute("name") == "url" || array[i].getAttribute("name") == "email" || array[i].getAttribute("name") == "password" || array[i].tagName == "TEXTAREA") {
                validateForm.arraValid.push(array[i]);
                setTooltip(array[i], array[i].getAttribute("qtip-position"), false);
            }

            if (trigger && array[i].tagName == "TEXTAREA" && array[i].getAttribute("name") == "textarea") {
                if (!re_textarea.exec(array[i].value) || array[i].value == array[i].getAttribute("placeholder") || array[i].value == "минимум 1 символ") {

                    showTip(array[i], "минимум 1 символ");
                    setTooltip(array[i], array[i].getAttribute("qtip-position"), true);
                    arrayNotValid.push(array[i]);
                }

            }
            if (trigger && array[i].getAttribute("type") == "text" && array[i].getAttribute("name") == "password") {
                if (!re_password.exec(array[i].value) || array[i].value == array[i].getAttribute("placeholder") || array[i].value == "минимальная длинна 6 символов") {
                    showTip(array[i], "минимальная длинна 6 символов");
                    setTooltip(array[i], array[i].getAttribute("qtip-position"), true);
                    arrayNotValid.push(array[i]);
                }

            }
            if (trigger && array[i].getAttribute("type") == "text" && array[i].getAttribute("name") == "email") {
                if (!re_email.exec(array[i].value) || array[i].value == array[i].getAttribute("placeholder") || array[i].value == "example@mail.com") {
                    showTip(array[i], "example@mail.com");
                    setTooltip(array[i], array[i].getAttribute("qtip-position"), true);
                    arrayNotValid.push(array[i]);
                }

            }
            if (trigger && array[i].getAttribute("type") == "text" && array[i].getAttribute("name") == "name") {
                if (!re_name.exec(array[i].value) || array[i].value == array[i].getAttribute("placeholder") || array[i].value == "минимальная длинна 2 символа") {
                    showTip(array[i], "минимальная длинна 2 символа");
                    setTooltip(array[i], array[i].getAttribute("qtip-position"), true);
                    arrayNotValid.push(array[i]);
                }

            }
            if (trigger && array[i].getAttribute("type") == "text" && array[i].getAttribute("name") == "url") {
                if (!re_url.exec(array[i].value) || array[i].value == "https://www.example.com" || array[i].value == array[i].getAttribute("placeholder")) {
                    showTip(array[i], "https://www.example.com");
                    setTooltip(array[i], array[i].getAttribute("qtip-position"), true);
                    arrayNotValid.push(array[i]);
                }

            }
            if (trigger && array[i].getAttribute("type") == "text" && array[i].getAttribute("name") == "img") {
                if (!re_image.exec(array[i].value) || array[i].value == "gif|jpg|jpeg|tiff|png" || array[i].value == array[i].getAttribute("placeholder")) {
                    showTip(array[i], "gif|jpg|jpeg|tiff|png");
                    setTooltip(array[i], array[i].getAttribute("qtip-position"), true);
                    arrayNotValid.push(array[i]);
                }

            }
            if (!trigger && array[i].getAttribute("type") == "submit") {
                submit = array[i];
            }
            if (!trigger && array[i].getAttribute("type") == "reset") {
                reset = array[i];
            }

        }
    }

    function vval() { // TODO: elements compare
        if (arrayNotValid.length > 0) {
            console.log("form no valid");
            validateForm.valid = false;
        } else if (arrayNotValid.length == 0) {
            validateForm.valid = true;
        }
    }

    function setTooltip(element, position, state) {
        var view = 'show';
        element.className = "has-error";
        if (!state) {
            element.className = "";
            view = 'hide';
        }


        if (position === 'right') {
            position = {
                my: 'left center',
                at: 'right center'
            }
        } else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                }
            }
        }
        $(element).qtip({
            content: {
                text: function () {
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
        }).trigger(view);
    }

    function showTip(element, tip) {
        element.style.color = "black";
        element.value = tip;


        element.onkeydown = function () {
            setTooltip(element, "left", false);
        }
        element.onmouseover = function () {
            clear()
        }
        var trigger = true;
        function clear() {
            if (trigger) {
                element.value = "";
                element.style.color = "";
                trigger = false;
            }
        }
    }

    function clearForm() {
        for (i = 0; i < validateForm.arrayNotValid.length; i++) {
            setTooltip(arrayNotValid[i], "left", false);
        }
    }

    return {
        valid: valid,
        arraValid: arraValid,
        arrayNotValid: arrayNotValid,
        init: init,
    }
})();




function setPlaceholder(element, trigger) {
    //  var trigger = true;
    element.value = element.getAttribute("placeholder");
    element.style.color = "#48CBE8";
    element.onmouseenter = function () {
        if (trigger && element.value == element.getAttribute("placeholder")) {//         && element.value == element.getAttribute("placeholder")
            element.value = "";
            element.style.color = "";
            trigger = false;
        }
    }
}




setActiveForm.init();
popups.init();