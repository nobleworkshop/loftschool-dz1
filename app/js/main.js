

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
