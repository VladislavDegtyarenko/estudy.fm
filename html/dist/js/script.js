document.addEventListener('DOMContentLoaded', function() {
   const testimonialsSlider = new Swiper('#testimonialsSlider', {
      loop: true,
      direction: 'horizontal',
      updateOnWindowResize: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
         el: '.swiper-pagination',
      },
      slidesPerView: 3,
      breakpoints: {
         1200: {
            slidesPerView: 3,
         },
         576: {
            slidesPerView: 2,
         },
         320: {
            slidesPerView: 1
         }
      }


   });

   const workSlider = new Swiper('#workSlider', {
      loop: false,
      slidesPerView: 3,
      direction: 'horizontal',
      //updateOnWindowResize: true,
      pagination: {
         el: '.swiper-pagination',
      },
      breakpoints: {
         1200: {
            slidesPerView: 3
         },
         576: {
            slidesPerView: 'auto'
         },
         320: {
            slidesPerView: 'auto'
         }
      },
   });

   AOS.init({
      once: true
   });

   const collapseFooterMenus = document.querySelectorAll('.collapse');
   collapseFooterMenus.forEach(hiddenContent => {
      hiddenContent.addEventListener('show.bs.collapse', () => {
         hiddenContent.previousElementSibling.classList.add('footer__links_collapse-active');
      })
      hiddenContent.addEventListener('hide.bs.collapse', () => {
         hiddenContent.previousElementSibling.classList.remove('footer__links_collapse-active');

      })
   })


   const hamburgerMenu = document.querySelector('.header__hamburger');
   const navMenu = document.querySelector('.nav');

   hamburgerMenu.addEventListener('click', function() {
      this.classList.toggle('header__hamburger-active')
      navMenu.classList.toggle('nav-active')
      document.body.classList.toggle('noScroll')
   })

   jsCloseHamburgerMenu = document.querySelectorAll('.jsCloseHamburgerMenu');
   jsCloseHamburgerMenu.forEach(menuLink => {
      menuLink.addEventListener('click', () => {
         navMenu.classList.remove('nav-active');
         hamburgerMenu.classList.remove('header__hamburger-active');
         document.body.classList.remove('noScroll');
      })
   })
   
   const howToModal = document.querySelectorAll('.modalVideo');
   let howToModalVideo = [];
   let howToModalVideoUrl = [];

   howToModal.forEach((modal, index) => {
      howToModalVideo.push(modal.querySelector('.modal-video'))
      howToModalVideoUrl.push(modal.querySelector('.modal-video').getAttribute('src'))

      modal.addEventListener('shown.bs.modal', () => {
         if (howToModalVideo[index].getAttribute('src') !== howToModalVideoUrl[index]) {
            howToModalVideo[index].setAttribute('src', howToModalVideoUrl[index])
         }
      })
   
      modal.addEventListener('hide.bs.modal', () => {
         howToModalVideo[index].setAttribute('src', '')
      })
   })
})