import data from './data/furnitures.js';

const heroImagesUrl = [
  'assets/images/olympic_slide.webp',
  'assets/images/ace_slide.jpg',
  'assets/images/krisbow_slide.jpg',
  'assets/images/slide_image4.webp',
  'assets/images/slide_image5.avif',
];

const idCurrencyFormat = Intl.NumberFormat('id-ID');

let slideIndex = 1;
let slideTimeOut;

function showSelectedSlide(index) {
  slideIndex = index;
  showSlide(index);
}

function showSlide(index = slideIndex) {
  clearTimeout(slideTimeOut);

  if (index > heroImagesUrl.length) {
    index = 1;
    slideIndex = index;
  }

  const sliderDot = document.getElementsByClassName('dot');
  const hero = document.querySelector('.hero');

  for (let i = 0; i < sliderDot.length; i++) {
    sliderDot[i].className = sliderDot[i].className.replace(' active', '');
  }

  sliderDot[index-1].className += ' active';
  hero.style.backgroundImage = `url('${heroImagesUrl[index-1]}')`;

  slideTimeOut = setTimeout(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 3000);
}

function goToLink(link) {
  window.open(link);
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileNavButton = document.getElementById('mobile-nav-button');
  const profileButton = document.getElementById('profile-button');
  const modalCloseButton = document.getElementById('close-btn');
  const navbarNav = document.getElementById('navbar-nav');
  const productsContainer = document.getElementById('furniture-list');
  const modal = document.getElementById('modal');

  mobileNavButton.addEventListener('click', () => {
    navbarNav.classList.toggle('show');
  });

  profileButton.addEventListener('click', () => {
    modal.className += ' show';
  });

  modalCloseButton.addEventListener('click', () => {
    modal.className = modal.className.replace(' show', '');
  });

  data.forEach((d) => {
    productsContainer.innerHTML += `
      <div class="product">
        <div class="product-image">
          <img src="${d.image}" />
        </div>
        <div class="product-description">
          <div class="discount-tag">Discount</div>
          <h4 class="description">${d.description}</h4>
          <h4>Rp. ${idCurrencyFormat.format(d.price - (d.price * d.discount))}</h4>
          <span class="discount">${d.discount * 100}%</span><p class="old-price"> Rp. ${d.price}</p>
        </div>
      </div>
    `;
  });

  showSlide();

  window.showSelectedSlide = showSelectedSlide;
  window.goToLink = goToLink;
});
