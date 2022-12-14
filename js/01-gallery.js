import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryElements = document.querySelector('.gallery');
const gallerySet = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
  ''
);

galleryElements.insertAdjacentHTML('beforeend', gallerySet);
galleryElements.addEventListener('click', onGalleryElementClick);

function onGalleryElementClick(event) {
  event.preventDefault();

  const instance = basicLightbox.create(`
    <img src= ${event.target.dataset.source}>`,
    {
      onShow: instance => {
        document.addEventListener('keydown', onEscapeClick);
      },
      onClose: instance => {
        document.removeEventListener('keydown', onEscapeClick);
      },
    }
  );

  instance.show();

  function onEscapeClick(event) {
    if (event.code !== 'Escape') {
      return;
    }
    instance.close();
  }
}

console.log(galleryItems);
