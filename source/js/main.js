/* Меню на мобильной версии */

(function () {

  const pageHeader = document.querySelector('.header');
  const headerToggle = document.querySelector('.header__menu-button');


  if (pageHeader) {
    pageHeader.classList.add('header--js');
  }

  headerToggle.addEventListener('click', () => {

    const isOpened = pageHeader.classList.contains('header--js-open');
    const isClosed = pageHeader.classList.contains('header--js');

    if (isOpened && !isClosed) {
      pageHeader.classList.add('header--js');
      pageHeader.classList.remove('header--js-open');
    } else {
      pageHeader.classList.remove('header--js');
      pageHeader.classList.add('header--js-open');
    }
  });
})();

/* Слайдер */


(function () {

  const slider = document.querySelector('.slider__list');
  const slides = slider.querySelectorAll('figure');
  const gap = 30;
  let count = 0;
  let widthSliderWindow; //A
  let widthImage;  //C
  // let widthSliderLine; //B
  const quantityImages = 4;
  const quantityGap = quantityImages - 1;


  function init() {
    widthSliderWindow = slider.offsetWidth;
    console.log(widthSliderWindow);
    widthImage = (widthSliderWindow - gap * quantityGap) / quantityImages;
    // slider.style.width = `${width * slides.length}px`;

    slides.forEach((item) => {
      item.style.width = `${widthImage}px`;
      item.style.height = 'auto';
    });

    rollSlider();
  }

  init();

  window.addEventListener('resize', init);

  document.querySelector('.slider__next').addEventListener('click', () => {
    count++;
    if (count >= slides.length - 3) {
      count = 0;
    }

    rollSlider();
  });

  document.querySelector('.slider__prev').addEventListener('click', () => {
    count--;
    rollSlider();
  });

  function rollSlider() {
    // slider.style.transform = `translate(-${count * (widthImage * quantityImages + quantityGap)}px)`;
    slider.style.transform = `translate(-${count * widthSliderWindow}px)`;
  }

})();


// linkItemMenu.forEach((item) => {
//   item.addEventListener('click', () => {
//     pageBody.style.overflowY = 'scroll';
//     pageHeader.classList.remove('header--open-menu');
//   });
// });

// /* маска ввода номера телефона */

// (function () {
//   /* eslint-disable no-undef */
//   const inputTel = document.querySelectorAll('[type="tel"]');
//   inputTel.forEach((element) => {
//     // eslint-disable-next-line no-unused-vars
//     const patternMask = IMask(element, {
//       mask: '{+7(}000)0000000',
//     });

//   });
// })();




// /*аккордеон*/

(function () {
  const accordion = document.querySelector('.accordion');
  const togglerClass = 'accordion__toggler';
  const itemClass = 'accordion__item';
  const itemClosedClass = 'accordion__item--opened';

  function closeAccordionItems() {
    accordion
      .querySelectorAll(`.${itemClass}`)
      .forEach((element) => {
        if (element) {
          element.classList.remove(itemClosedClass);
        }
      });
  }

  closeAccordionItems();

  accordion.addEventListener('click', (event) => {
    const toggler = event.target.closest(`.${togglerClass}`);

    if (!toggler) { return; }

    const item = toggler.closest(`.${itemClass}`);
    const isOpened = item.classList.contains(itemClosedClass);

    closeAccordionItems();

    isOpened
      ? item.classList.remove(itemClosedClass)
      : item.classList.add(itemClosedClass);
  });
})();


// /* Отправка формы */

// (function () {
//   const form = document.querySelectorAll('form');

//   form.forEach((element) => {
//     element.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const checkBox = element.querySelector('[type="checkbox"]');

//       if (checkBox.checked) {
//         element.submit();
//       }
//     });
//   });
// })();


/* Modal */

(function () {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '0';
  overlay.style.backgroundColor = 'black';
  overlay.style.opacity = '.5';

  function showOverlay() {
    document.body.append(overlay);
  }

  function closeOverlay() {
    overlay.remove();
  }

  const popup = document.querySelector('.modal');
  const elementsPopup = Array.from(popup.querySelectorAll('input, button'));

  const buttonClose = popup.querySelector('.modal__button-close');
  const buttonOpenPopup = document.querySelector('.header__login-desktop');

  const html = document.querySelector('html');
  const marginSize = window.innerWidth - html.clientWidth;

  buttonOpenPopup.addEventListener('click', onModalOpen);
  buttonClose.addEventListener('click', onModalClose);
  buttonClose.addEventListener('keydown', onModalButtonClose);


  function onModalOpen(evt) {
    evt.preventDefault();

    if (popup) {
      popup.classList.remove('visually-hidden');
    }

    document.querySelector('body').style.overflow = 'hidden';
    showOverlay();

    if (overlay) {
      overlay.addEventListener('click', onModalClose);
    }

    document.addEventListener('keydown', onModalKeydown);

    if (marginSize) {
      html.style.marginRight = `${marginSize}px`;
    }
    elementsPopup[0].focus();
  }

  function onModalButtonClose(evt) {
    if (evt.code === 'Enter' || evt.code === 'Space') {
      onModalClose();
    }
  }

  function onModalClose() {
    if (popup) {
      popup.classList.add('visually-hidden');
    }

    document.querySelector('body').style.overflow = '';
    closeOverlay();
    document.removeEventListener('keydown', onModalKeydown);
    html.style.marginRight = '';
  }

  function onModalKeydown(evt) {
    const focusedItemIndex = elementsPopup.indexOf(document.activeElement);

    if (evt.shiftKey && (focusedItemIndex === 0 || focusedItemIndex === -1)) {
      elementsPopup[elementsPopup.length - 1].focus();
      evt.preventDefault();
    }

    if (!evt.shiftKey && focusedItemIndex === elementsPopup.length - 1) {
      elementsPopup[0].focus();
      evt.preventDefault();
    }

    if (evt.code === 'Escape' || evt.code === 'Esc') {
      onModalClose();
    }
  }
})();
