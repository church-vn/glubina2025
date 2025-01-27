jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

});







// popup форма для отрпавки заявки

// popup
let popupBg_mission_conference = document.querySelector('.popup__bg_mission_conference');
let popup_mission_conference = document.querySelector('.popup_mission_conference');
let openPopupButtons_mission_conference = document.querySelectorAll('.open-popup_mission_conference'); 
let closePopupButton_mission_conference = document.querySelector('.close-popup_mission_conference'); 
let closePopupButtonSubmit_mission_conference = document.querySelector('.close_through_submit_mission_conference');

// Проверка на заполненность полей
function checkFormValidity() {
    let sendName = document.getElementById('sendName_mission_conference').value.trim();
    let sendSecondName = document.getElementById('sendSecondName_mission_conference').value.trim();
    let sendTel = document.getElementById('sendTel_mission_conference').value.trim();
    
    return sendName && sendSecondName && sendTel; // Проверяем все поля
}

openPopupButtons_mission_conference.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg_mission_conference.classList.add('active'); // Добавляем класс 'active' для фона
        popup_mission_conference.classList.add('active'); // И для самого окна
    })
});

closePopupButton_mission_conference.addEventListener('click',() => { // Вешаем обработчик на крестик
    popupBg_mission_conference.classList.remove('active'); // Убираем активный класс с фона
    popup_mission_conference.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg_mission_conference) { // Если цель клика - фот, то:
        popupBg_mission_conference.classList.remove('active'); // Убираем активный класс с фона
        popup_mission_conference.classList.remove('active'); // И с окна
    }
});

// Обработчик кнопки отправки
closePopupButtonSubmit_mission_conference.addEventListener('click', () => { 
    if (checkFormValidity()) { // Если все поля заполнены
        popupBg_mission_conference.classList.remove('active'); // Убираем активный класс с фона
        popup_mission_conference.classList.remove('active'); // И с окна
    }
    // Если поля не заполнены, форма не закрывается и уведомление не показывается
});






// popup для второй формы на service
let popupBg_service = document.querySelector('.popup__bg_service');
let popup_service = document.querySelector('.popup_service');
let openPopupButtons_service = document.querySelectorAll('.open-popup_service');
let closePopupButton_service = document.querySelector('.close-popup_service');
let closePopupButtonSubmit_service = document.querySelector('.close_through_submit_service');

// Проверка на заполненность полей
function checkFormValidity_service() {
    let sendName = document.getElementById('sendName_service').value.trim();
    let sendSecondName = document.getElementById('sendSecondName_service').value.trim();
    let sendTel = document.getElementById('sendTel_service').value.trim();
    
    // Проверяем все поля: если они не пустые, возвращаем true
    return sendName && sendSecondName && sendTel;
}

// Открытие попапа при клике на кнопку
openPopupButtons_service.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg_service.classList.add('active'); // Добавляем класс 'active' для фона
        popup_service.classList.add('active'); // И для самого окна
    });
});

// Закрытие попапа при клике на крестик
closePopupButton_service.addEventListener('click', () => { 
    popupBg_service.classList.remove('active'); // Убираем активный класс с фона
    popup_service.classList.remove('active'); // И с окна
});

// Закрытие попапа при клике за пределами попапа
document.addEventListener('click', (e) => { 
    if (e.target === popupBg_service) { // Если цель клика - это фон попапа
        popupBg_service.classList.remove('active'); // Убираем активный класс с фона
        popup_service.classList.remove('active'); // И с окна
    }
});

// Обработчик кнопки отправки
closePopupButtonSubmit_service.addEventListener('click', () => { 
    // Проверяем, заполнены ли все поля
    if (checkFormValidity_service()) { // Если все поля заполнены
        popupBg_service.classList.remove('active'); // Убираем активный класс с фона
        popup_service.classList.remove('active'); // И с окна
    }
    // Если поля не заполнены, форма не закрывается и уведомление не показывается
});












