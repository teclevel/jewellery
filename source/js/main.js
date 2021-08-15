/* Swiper */

(function () {
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    slidesPerGroup: 2,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return `<span class="${currentClass}"></span>of
                <span class="${totalClass}"></span>`;
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          renderBullet: function (index, className) {
            return `<span class="${className}">${index + 1}</span>`;
          },
        },
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          renderBullet: function (index, className) {
            return `<span class="${className}">${index + 1}</span>`;
          },
        },
      },
    },
  });
})();


/* Swiper каталог */

(function () {
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper2', {
    spaceBetween: 25,
    slidesPerView: 2,
    slidesPerColumn: 6,
    autoHeight: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}">${index + 1}</span>`;
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerColumn: 4,
      },
    },
  });
})();


/*аккордеон*/

(function () {
  const accordion = document.querySelector('.accordion');
  if (!accordion) { return; }

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

/* Фильтр */

(function () {

  const filter = document.querySelector('.filter');
  if (!filter) { return; }

  const filterToggle = filter.querySelector('.filter__button--tablet');
  const buttonFilterClose = filter.querySelector('.filter__button-close');

  const isOpened = filter.classList.contains('filter--open');

  filterToggle.addEventListener('click', () => {
    if (isOpened) { return; }

    filter.classList.add('filter--open');
    document.querySelector('body').style.overflow = 'hidden';

  });

  buttonFilterClose.addEventListener('click', () => {

    filter.classList.remove('filter--open');
    document.querySelector('body').style.overflow = '';

  });

})();


/* overlay */

function toggleOverlay(state, cb) {
  const html = document.querySelector('html');
  const marginSize = window.innerWidth - html.clientWidth;

  if (state) {
    html.style.marginRight = `${marginSize}px`;

    document.querySelector('body').style.overflow = 'hidden';

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
    document.body.append(overlay);
    overlay.addEventListener('click', cb);
  } else {
    html.style.marginRight = '';

    document.querySelector('body').style.overflow = '';

    const overlay = document.querySelector('.overlay');
    overlay.remove();
  }
}


/* popup card */

(function () {

  const card = document.querySelector('.modal-card');
  if (!card) { return; }

  const cardToggle = document.querySelector('.card__add');
  const buttonCardClose = card.querySelector('.modal-card__button-close');
  const elementsPopup = Array.from(card.querySelectorAll('a, button, input'));

  cardToggle.addEventListener('click', onModalOpen);
  buttonCardClose.addEventListener('click', onModalClose);
  buttonCardClose.addEventListener('keydown', onModalButtonClose);

  function onModalOpen(evt) {
    evt.preventDefault();

    if (card) {
      card.classList.remove('visually-hidden');
    }
    toggleOverlay(open, onModalClose);

    document.addEventListener('keydown', onModalKeydown);
    elementsPopup[0].focus();
  }

  function onModalClose() {
    if (card) {
      card.classList.add('visually-hidden');
    }
    toggleOverlay();
  }

  function onModalButtonClose(evt) {
    if (evt.code === 'Enter' || evt.code === 'Space') {
      onModalClose();
    }
  }

  function onModalKeydown(evt) {
    const focusedItemIndex = elementsPopup.indexOf(document.activeElement);

    if (evt.shiftKey && evt.key === 'Tab' && focusedItemIndex === 0) {
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


/* Popup login */

(function () {

  const popup = document.querySelector('.modal');
  const elementsPopup = Array.from(popup.querySelectorAll('input, button'));

  const buttonClose = popup.querySelector('.modal__button-close');
  const buttonsOpenPopup = document.querySelectorAll('.header__login');

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
    toggleOverlay(open, onModalClose);

    document.addEventListener('keydown', onModalKeydown);

    elementsPopup[0].focus();
  }

  function onModalClose() {

    if (popup) {
      popup.classList.add('visually-hidden');
    }

    document.querySelector('body').style.overflow = '';
    toggleOverlay();
    document.removeEventListener('keydown', onModalKeydown);
  }

  function onModalButtonClose(evt) {
    if (evt.code === 'Enter' || evt.code === 'Space') {
      onModalClose();
    }
  }


  function onModalKeydown(evt) {
    const focusedItemIndex = elementsPopup.indexOf(document.activeElement);

    if (evt.shiftKey && evt.key === 'Tab' && focusedItemIndex === 0) {
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
