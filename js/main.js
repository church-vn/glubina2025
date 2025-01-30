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
    $('html, body').animate({scrollTop : 0},300, 'easeInOutExpo');
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
        }, 300, 'easeInOutExpo');

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










// popup форма для отправки заявки

// popup
let popupBg_mission_conference = document.querySelector('.popup__bg_mission_conference');
let popup_mission_conference = document.querySelector('.popup_mission_conference');
let openPopupButtons_mission_conference = document.querySelectorAll('.open-popup_mission_conference'); 
let closePopupButton_mission_conference = document.querySelector('.close-popup_mission_conference'); 
let closePopupButtonSubmit_mission_conference = document.querySelector('.close_through_submit_mission_conference');

// Проверка на заполненность полей
function checkFormValidity() {
    let sendName = document.getElementById('sendName_mission_conference')?.value.trim() || "";
    let sendSecondName = document.getElementById('sendSecondName_mission_conference')?.value.trim() || "";
    let sendTel = document.getElementById('sendTel_mission_conference')?.value.trim() || "";

    return sendName && sendSecondName && sendTel; // Проверяем все поля
}

// Функция для блокировки прокрутки
function lockScroll() {
    document.body.classList.add('lock-scroll');
}

// Функция для разблокировки прокрутки
function unlockScroll() {
    document.body.classList.remove('lock-scroll');
}

// Проверяем, существуют ли элементы, прежде чем вешать обработчики событий
if (openPopupButtons_mission_conference) {
    openPopupButtons_mission_conference.forEach((button) => { 
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (popupBg_mission_conference && popup_mission_conference) {
                popupBg_mission_conference.classList.add('active');
                popup_mission_conference.classList.add('active');
                lockScroll();
            }
        });
    });
}

if (closePopupButton_mission_conference) {
    closePopupButton_mission_conference.addEventListener('click', () => {
        if (popupBg_mission_conference && popup_mission_conference) {
            popupBg_mission_conference.classList.remove('active');
            popup_mission_conference.classList.remove('active');
            unlockScroll();
        }
    });
}

document.addEventListener('click', (e) => {
    if (popupBg_mission_conference && e.target === popupBg_mission_conference) {
        popupBg_mission_conference.classList.remove('active');
        popup_mission_conference.classList.remove('active');
        unlockScroll();
    }
});

if (closePopupButtonSubmit_mission_conference) {
    closePopupButtonSubmit_mission_conference.addEventListener('click', () => {
        if (checkFormValidity() && popupBg_mission_conference && popup_mission_conference) {
            popupBg_mission_conference.classList.remove('active');
            popup_mission_conference.classList.remove('active');
            unlockScroll();
        }
    });
}

// popup для второй формы на service
let popupBg_service = document.querySelector('.popup__bg_service');
let popup_service = document.querySelector('.popup_service');
let openPopupButtons_service = document.querySelectorAll('.open-popup_service');
let closePopupButton_service = document.querySelector('.close-popup_service');
let closePopupButtonSubmit_service = document.querySelector('.close_through_submit_service');

// Проверка на заполненность полей
function checkFormValidity_service() {
    let sendName = document.getElementById('sendName_service')?.value.trim() || "";
    let sendSecondName = document.getElementById('sendSecondName_service')?.value.trim() || "";
    let sendTel = document.getElementById('sendTel_service')?.value.trim() || "";

    return sendName && sendSecondName && sendTel;
}

// Проверяем, существуют ли элементы
if (openPopupButtons_service) {
    openPopupButtons_service.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (popupBg_service && popup_service) {
                popupBg_service.classList.add('active');
                popup_service.classList.add('active');
                lockScroll();
            }
        });
    });
}

if (closePopupButton_service) {
    closePopupButton_service.addEventListener('click', () => {
        if (popupBg_service && popup_service) {
            popupBg_service.classList.remove('active');
            popup_service.classList.remove('active');
            unlockScroll();
        }
    });
}

document.addEventListener('click', (e) => {
    if (popupBg_service && e.target === popupBg_service) {
        popupBg_service.classList.remove('active');
        popup_service.classList.remove('active');
        unlockScroll();
    }
});

if (closePopupButtonSubmit_service) {
    closePopupButtonSubmit_service.addEventListener('click', () => {
        if (checkFormValidity_service() && popupBg_service && popup_service) {
            popupBg_service.classList.remove('active');
            popup_service.classList.remove('active');
            unlockScroll();
        }
    });
}

// popup для формы receipt
let popupBg_receipt = document.querySelector('.popup__bg_receipt');
let popup_receipt = document.querySelector('.popup_receipt');
let openPopupButtons_receipt = document.querySelectorAll('.open-popup_receipt');
let closePopupButton_receipt = document.querySelector('.close-popup_receipt');
let closePopupButtonSubmit_receipt = document.querySelector('.close_through_submit_receipt');

// Проверка на заполненность полей
function checkFormValidity_receipt() {
    let sendName_receipt = document.getElementById('sendName_receipt')?.value.trim() || "";
    let sendSecondName_receipt = document.getElementById('sendSecondName_receipt')?.value.trim() || "";
    let sendTel_receipt = document.getElementById('sendTel_receipt')?.value.trim() || "";

    return sendName_receipt && sendSecondName_receipt && sendTel_receipt;
}

// Проверяем, существуют ли элементы
if (openPopupButtons_receipt) {
    openPopupButtons_receipt.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (popupBg_receipt && popup_receipt) {
                popupBg_receipt.classList.add('active');
                popup_receipt.classList.add('active');
                lockScroll();
            }
        });
    });
}

if (closePopupButton_receipt) {
    closePopupButton_receipt.addEventListener('click', () => {
        if (popupBg_receipt && popup_receipt) {
            popupBg_receipt.classList.remove('active');
            popup_receipt.classList.remove('active');
            unlockScroll();
        }
    });
}

document.addEventListener('click', (e) => {
    if (popupBg_receipt && e.target === popupBg_receipt) {
        popupBg_receipt.classList.remove('active');
        popup_receipt.classList.remove('active');
        unlockScroll();
    }
});

if (closePopupButtonSubmit_receipt) {
    closePopupButtonSubmit_receipt.addEventListener('click', () => {
        if (checkFormValidity_receipt() && popupBg_receipt && popup_receipt) {
            popupBg_receipt.classList.remove('active');
            popup_receipt.classList.remove('active');
            unlockScroll();
        }
    });
}



