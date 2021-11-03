document.addEventListener("DOMContentLoaded", function () {
   let swiperIsLoaded = false;

   const loadScript = (scriptSrc, onLoadFunction) => {
      let script = document.createElement("script");
      script.src = scriptSrc;
      document.body.appendChild(script);
      script.onload = onLoadFunction;
   };

   const sliderSettings = () => {
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
   };

   const initSwiperPlugin = () => {
      let windowHeight = document.documentElement.clientHeight;
      let scrolled = document.documentElement.scrollTop;

      if (!swiperIsLoaded && windowHeight + scrolled > 1500) {
         const swiperScriptSrc = "js/swiper-bundle.min.js";
         loadScript(swiperScriptSrc, sliderSettings);
         swiperIsLoaded = true;
      }
   };
   initSwiperPlugin();
   window.onscroll = initSwiperPlugin;

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

   const hamburgerMenu = document.querySelector(".hamburger");
   const navMenu = document.querySelector(".nav");

   hamburgerMenu.addEventListener("click", function () {
      this.classList.toggle("hamburger-active");
      navMenu.classList.toggle("nav-active");
      document.body.classList.toggle("noScroll");
   });

   jsCloseHamburgerMenu = document.querySelectorAll(".jsCloseHamburgerMenu");
   jsCloseHamburgerMenu.forEach((menuLink) => {
      menuLink.addEventListener("click", () => {
         navMenu.classList.remove("nav-active");
         hamburgerMenu.classList.remove("hamburger-active");
         document.body.classList.remove("noScroll");
      });
   });

   const loadIframe = (iframe) => {
      const url = iframe.getAttribute("data-src");
      iframe.src = url;
   };

   const unloadIframe = (iframe) => (iframe.src = "");

   const howToModals = document.querySelectorAll(".modalVideo");

   howToModals.forEach((modal, index) => {
      const iframe = modal.querySelector("iframe");
      const modalOpenEvent = "shown.bs.modal";
      const modalHideEvent = "hide.bs.modal";

      modal.addEventListener(modalOpenEvent, () => {
         loadIframe(iframe);
      });

      modal.addEventListener(modalHideEvent, () => {
         unloadIframe(iframe);
      });
   });
});
