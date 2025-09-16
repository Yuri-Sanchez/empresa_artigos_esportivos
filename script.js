// Carrossel Ofertas

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let currentIndex = 0;
let simpleInterval;

function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Funções de navegação manual
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

// 🔹 Funções de autoplay
function startSimpleAutoPlay() {
  simpleInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }, 3000);
}

function stopSimpleAutoPlay() {
  clearInterval(simpleInterval);
}

// Inicia autoplay
startSimpleAutoPlay();

// Pausa no hover e retoma ao sair
track.addEventListener("mouseenter", stopSimpleAutoPlay);
track.addEventListener("mouseleave", startSimpleAutoPlay);

// Carrossel produtos

const multiTrack = document.querySelector(".carousel-multi-track");
const multiSlides = Array.from(multiTrack.children);
const nextMulti = document.querySelector(".multi-next");
const prevMulti = document.querySelector(".multi-prev");

let multiIndex = 0;
const visibleSlides = 3;
let multiInterval;

function updateMultiPosition() {
  multiTrack.style.transform = `translateX(-${
    multiIndex * (100 / visibleSlides)
  }%)`;
}

// Navegação manual
nextMulti.addEventListener("click", () => {
  if (multiIndex < multiSlides.length - visibleSlides) {
    multiIndex++;
  } else {
    multiIndex = 0; // reinicia
  }
  updateMultiPosition();
});

prevMulti.addEventListener("click", () => {
  if (multiIndex > 0) {
    multiIndex--;
  } else {
    multiIndex = multiSlides.length - visibleSlides;
  }
  updateMultiPosition();
});

// 🔹 Funções de autoplay
function startMultiAutoPlay() {
  multiInterval = setInterval(() => {
    if (multiIndex < multiSlides.length - visibleSlides) {
      multiIndex++;
    } else {
      multiIndex = 0;
    }
    updateMultiPosition();
  }, 4000);
}

function stopMultiAutoPlay() {
  clearInterval(multiInterval);
}

// Inicia autoplay
startMultiAutoPlay();

// Pausa no hover e retoma ao sair
multiTrack.addEventListener("mouseenter", stopMultiAutoPlay);
multiTrack.addEventListener("mouseleave", startMultiAutoPlay);
