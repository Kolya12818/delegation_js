const galleryContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

const galleryMarkup = galleryItems
  .map(item => {
    return '<li class="gallery__item">' +
      '<a class="gallery__link" href="' + item.original + '">' +
        '<img class="gallery__image" src="' + item.preview + '" data-source="' + item.original + '" alt="' + item.description + '" />' +
      '</a>' +
    '</li>';
  })
  .join('');

galleryContainer.innerHTML = galleryMarkup;

// Слухачі подій
galleryContainer.addEventListener('click', onGalleryClick);
closeBtn.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onCloseModal);

function onGalleryClick(event) {
  event.preventDefault(); 

  const isImageEl = event.target.classList.contains('gallery__image');
  if (!isImageEl) return;

  const largeImageUrl = event.target.dataset.source;
  const imageAlt = event.target.alt;

  openModal(largeImageUrl, imageAlt);
}

function openModal(url, alt) {
  lightbox.classList.add('is-open');
  lightboxImage.src = url;
  lightboxImage.alt = alt;
  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
