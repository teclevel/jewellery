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

/* Swiper */

(function () {
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${  className  }">${  index + 1  }</span>`;
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();


/*аккордеон*/

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

    isOpened
      ? item.classList.remove(itemClosedClass)
      : item.classList.add(itemClosedClass);
  });
})();


/* Popup */

(function () {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '20';
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
  const buttonsOpenPopup = document.querySelectorAll('.header__login');
  const html = document.querySelector('html');
  const marginSize = window.innerWidth - html.clientWidth;

  buttonsOpenPopup.forEach((element) => {
    element.addEventListener('click', onModalOpen);
  });


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


(function () {
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${  className  }">${  index + 1  }</span>`;
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();
