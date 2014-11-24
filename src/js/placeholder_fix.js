// PLACEHOLDER FIX
//
// Aleksei Aniskin
// alexniksin@gmail.com
//

;(function ($, window, document, undefined) {
	$(function(){
		
		var input = document.createElement('input');
		if('placeholder' in input == false){
			$('input, textarea').each(function(){
				var trg = $(this);
				if(!trg.val()){
					trg.val(trg.attr('placeholder'));
					if(trg.attr("type") == "password"){
						trg.data("password", "true").attr("type", "text");
					}
				}
			}).on('focusin',function(e){
				var trg = $(e.target);
				if(trg.val() == trg.attr('placeholder')){ 
					trg.val('');
					if(trg.data("password")){
						trg.attr("type", "password");
					}
				}
			}).on('focusout',function(e) {
				var trg = $(e.target);
				if(!trg.val()){
					trg.val(trg.attr('placeholder'));
					if(trg.data("password")){
						trg.attr("type", "text");
					}
				}
			});
		}
		
	});
})(jQuery, window, document);