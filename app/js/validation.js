var validation = (function () {

	// Initialize module
	var init = function () {
		_setUpListeners();
	};

	// Listen to doing
	var _setUpListeners = function () {
		$('form').on('keydown', '.has-error', _removeError);
		// $('form').on('reset', _clearForm);
		$('form input[type="reset"]').on('click', _clearForm);

	};


	var _clearForm = function () {
		console.log('We aer inside _clearForm');
		var form = $(this);
		form.find('.input, .textarea').trigger('hideTooltip');
		form.find('.has-error').removeClass('has-error');
	};

	var _removeError = function () {
		console.log('We aer inside _removeError');
		$(this).removeClass('has-error');
	};

	

	// Creates ToolTips
	var _createQtip = function (element, position) {
		
		// tooltip position
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


		//initialize for tooltip
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
	};

	// Universal function to validate forms
	var validateForm = function (form) {
  		console.log('ПРивет!  Я в модуле валидации проверяю форму.');

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
		valid = true;

		// Go throw all form elements
		$.each(elements, function(index, val){
			// console.log(index);
			// console.log(value);

			var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');

			if(val.length === 0){
				element.addClass('has-error');
				_createQtip(element, pos);
				valid = false;
			}
		});
	};

	// Return object - Public methods
	return {
		init: init,
		validateForm: validateForm
	};


})();

validation.init();