$(document).ready(function(){

  $(function() {
    $( "#datepicker" ).datepicker({
      showOtherMonths: true,
      firstDay: 1,  
      minDate: 0
    });
  });

  if ($('.js-rating').length > 0) {
    $('.js-rating').each(function(){
      $(this).raty({
        width: 185,
        hints: ['Отвратительно', 'Плохо', 'Неплохо', 'Очень хорошо', 'Отлично'],
        starOff: '../img/icons/star-off.png',
        starOn : '../img/icons/star-on.png',
        score: function() {
          return $(this).attr('data-score');
        }
      });
    });
      
  }

  $(".js-clone-btn").click(function() {
         var $div = $(this).parent().find('.contact-input');
         $div.find("input")
             .last()
             .clone()
             .appendTo($div)
             .val("")
         return false;
     });

  $(".js-login-switcher").change(function(){
    if($('.js-login-switch-tab1').find('.cfe-radio').hasClass('checked')){
        $('.js-login-switch-tab1').addClass('is-active');
        $('.js-login-tab1').addClass('is-active');
        $('.js-login-switch-tab2').removeClass('is-active');
        $('.js-login-tab2').removeClass('is-active');
    }
    if($('.js-login-switch-tab2').find('.cfe-radio').hasClass('checked')){
        $('.js-login-switch-tab2').addClass('is-active');
        $('.js-login-tab2').addClass('is-active');
        $('.js-login-switch-tab1').removeClass('is-active');
        $('.js-login-tab1').removeClass('is-active');
    }
  });

  $('.proc-date-options-table td').on('click', function() {
    // $(this).find('label').addClass('ololo');
    $(this).siblings().find('.cfe-radio').trigger('click');
    // $(this).find('.cfe-radio').addClass('checked');
    // alert('ok');
  });

  $('.js-hierarchlist-save').on('click', function() {
    $(this).parent().parent().removeClass('is-editable');
    return false;
  });

  $('.js-hierarchlist-edit').on('click', function() {
    $(this).parent().parent().addClass('is-editable');
    return false;
  });


  function select() {
    var el = $('.js-select');
    var el_title = el.children("span");
    var item = el.find('li');
    var input = el.find(".js-select-input");
    var el_text = el.find(".js-select-text");
    var checkbox = el.find(".checkbox");
    var list = el.find('.js-select-drop');
    el_title.click(function(event){
      if ($(this).parent().hasClass('is-open')) {
        $(this).parent().removeClass('is-open');
        $('.select__scroll .jcustom-scroll').mCustomScrollbar("destroy");
        $(this).parent().parent().removeClass('is-active');
      }
      else {
        el.removeClass('is-open');
        $(this).parent().addClass('is-open');
        $('.select__scroll .jcustom-scroll').mCustomScrollbar();
        event.stopPropagation();
        $(this).parent().parent().addClass('is-active');
      };
      event.stopPropagation();
    });
    checkbox.click(function(event){
      event.stopPropagation();
    });
    item.bind("click",function(){
      $(this).addClass('is-selected').siblings().removeClass('is-selected');
      var text = $(this).text();
      var id = $(this).attr("data-id");
      $('.select__scroll .jcustom-scroll').mCustomScrollbar("destroy");
      $(this).parents(".js-select").find(".js-select-text").text(text);
      $(this).parents(".js-select").find(".js-select-input").val(id);
   });
  };
  select();

  $(document).click(function() {
    $('.js-select').removeClass('is-open');
    $('.select__scroll .jcustom-scroll').mCustomScrollbar("destroy");
    $('.search-advanced-in').removeClass('is-active');
  });

  // $('.search-form-level2').slideDown();

  $('.js-open-level2').on('click', function() {
   $('.search-form-level2').slideDown();
   // $('.search-form-in').css('height', 'auto');
   return false;
  });

  $('.js-tooltipster').tooltipster({
    trigger: 'hover',
    position: 'top',
    contentAsHTML: true
  });

  $('.js-input').hide();



  var input = $('.js-checkbox');
  $(input).on('click', function() {
    if ($(this).attr('checked', true)) {
      $(this).parents('.my-row').find('.js-input').fadeToggle();
    }
  });

  // sortable
  function sortable(){
    $("#sortable").draggable({
      handle: 'i'
    });
  }
  sortable();
  // sortable popup
  $('.sortable-send-popup1').on('click', function() {
   if ($("#sortable-popup1").hasClass('is-active')) {
    $("#sortable-popup1").removeClass('is-active');
   }
   else {
    $("#sortable-popup1").addClass('is-active');
   }
  });

});