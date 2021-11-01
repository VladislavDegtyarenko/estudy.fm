document.addEventListener("DOMContentLoaded", function () {
   let swiperIsLoaded = false;

   const loadSwiperPlugin = () => {
      let windowHeight = document.documentElement.clientHeight;
      let scrolled = document.documentElement.scrollTop;

      if (!swiperIsLoaded && windowHeight + scrolled > 900) {
         swiperIsLoaded = true;

         /* append swiper.js to the body */
         let script = document.createElement("script");
         script.src = "js/swiper-bundle.min.js";
         document.body.appendChild(script);

         /* setup the nessesarily sliders */

         const testimonialsSlider = new Swiper("#testimonialsSlider", {
            loop: true,
            direction: "horizontal",
            updateOnWindowResize: true,
            navigation: {
               nextEl: ".swiper-button-next",
               prevEl: ".swiper-button-prev",
            },
            pagination: {
               el: ".swiper-pagination",
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
                  slidesPerView: 1,
               },
            },
         });

         const workSlider = new Swiper("#workSlider", {
            loop: false,
            slidesPerView: 3,
            direction: "horizontal",
            //updateOnWindowResize: true,
            pagination: {
               el: ".swiper-pagination",
            },
            breakpoints: {
               1200: {
                  slidesPerView: 3,
               },
               576: {
                  slidesPerView: "auto",
               },
               320: {
                  slidesPerView: "auto",
               },
            },
         });
      }
   };
   loadSwiperPlugin();
   window.onscroll = loadSwiperPlugin;

   AOS.init({
      once: true,
   });

   const collapseFooterMenus = document.querySelectorAll(".collapse");
   collapseFooterMenus.forEach((hiddenContent) => {
      hiddenContent.addEventListener("show.bs.collapse", () => {
         hiddenContent.previousElementSibling.classList.add("footer__links_collapse-active");
      });
      hiddenContent.addEventListener("hide.bs.collapse", () => {
         hiddenContent.previousElementSibling.classList.remove("footer__links_collapse-active");
      });
   });

   const hamburgerMenu = document.querySelector(".header__hamburger");
   const navMenu = document.querySelector(".nav");

   hamburgerMenu.addEventListener("click", function () {
      this.classList.toggle("header__hamburger-active");
      navMenu.classList.toggle("nav-active");
      document.body.classList.toggle("noScroll");
   });

   jsCloseHamburgerMenu = document.querySelectorAll(".jsCloseHamburgerMenu");
   jsCloseHamburgerMenu.forEach((menuLink) => {
      menuLink.addEventListener("click", () => {
         navMenu.classList.remove("nav-active");
         hamburgerMenu.classList.remove("header__hamburger-active");
         document.body.classList.remove("noScroll");
      });
   });

   const loadIframe = (iframe) => {
      const url = iframe.getAttribute("data-src");
      iframe.src = url;
   };

   const unloadIframe = (iframe) => {
      iframe.src = "";
   };

   const howToModal = document.querySelectorAll(".modalVideo");

   howToModal.forEach((modal, index) => {
      const iframe = modal.querySelector("iframe");

      modal.addEventListener("shown.bs.modal", () => {
         loadIframe(iframe);
      });

      modal.addEventListener("hide.bs.modal", () => {
         unloadIframe(iframe);
      });
   });
});
