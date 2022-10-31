import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
galleryRef.addEventListener('click', openCloseImgOriginal);


function createGallery(galleryItems) {
  return galleryItems
  .map(( {preview, original, description} ) => {
    return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"          
        />
      </a>
    </div>
    `
  })
  .join('');  
};


function openCloseImgOriginal(e) {
  e.preventDefault();

  const isGalleryItem = e.target.classList.contains('gallery__image');
  if (!isGalleryItem) {
    return;
  };  
  
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
  `);
  
  instance.show();  

  if (basicLightbox.visible()) {
    window.addEventListener('keydown', onPressEsc);
  };
  
  function onPressEsc(e) {
    if (e.key === 'Escape') {
      return instance.close();        
    }
  }
}