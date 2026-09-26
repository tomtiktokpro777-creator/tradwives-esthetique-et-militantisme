const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.main-nav');

if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('is-open', !open);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
}

const lightboxLinks = document.querySelectorAll('[data-lightbox]');

if (lightboxLinks.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Agrandissement du document');
  dialog.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fermer">Fermer ×</button><img alt="">';
  document.body.append(dialog);

  const dialogImage = dialog.querySelector('img');
  const closeButton = dialog.querySelector('.lightbox-close');

  lightboxLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sourceImage = link.querySelector('img');
      dialogImage.src = link.href;
      dialogImage.alt = sourceImage?.alt || 'Document agrandi';
      dialog.showModal();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
