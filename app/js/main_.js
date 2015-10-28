// Semicolon (;) to ensure closing of earlier scripting
// Encapsulation
// $ is assigned to jQuery
;
(function($) {

    // DOM Ready
    $(function() {

        // Binding a click event
        // From jQuery v.1.7.0 use .on() instead of .bind()
        $('#add_new_item').on('click', function(e) {

            // Prevents the default action to be triggered. 
            e.preventDefault();

            // Triggering bPopup when click event is fired
            $('#add_new_project_popup').bPopup({
				    		speed: 650,
				    		transition: 'slideDown',
				    		closeClass: 'close-popup',
				    		onCLose: function () {
				    			this.find('.form')
				    				.trigger("reset");
				    		}
				    		
				    	});

        });

    });

})(jQuery);




(function() {
  
    var app = {
        
        initialize : function () {          
            this.modules();
            this.setUpListeners();
        },
 
        modules: function () {
 
        },
 
        setUpListeners: function () {
            $('form').on('submit', app.submitForm);
        },
 
        submitForm: function (e) {
            e.preventDefault();
            console.log('Sbmit!!!');

            var form =$(this);

            if( app.validateForm(form) === false) return false;

            app.validateForm(form);
        },

        validateForm: function (form){
            var inputs = form.find('input');
                valid = true;

            input.tooltip('destroy');

            $.each(inputs, function (index, val) {
                var input = $(val),
                val = input.val(),
                formGroup = input.parents('.form-group'),
                label = formGroup.find('label').text().toLowerCase(),
                textError = 'Введите' + label;

            if(val.length === 0){
                formGroup.addClass('has-error').removeCLass('has-success');
                input.tooltip({
                    trigger: 'manual',
                    placement: 'right',
                    title: textError
                }).tooltip('show');
                valid = false;
            }else{
                formGroup.addClass('has-success').removeCLass('has-error');
            }

            });

            return valid;
            
        }
        
    }
 
    app.initialize();
 
}());
