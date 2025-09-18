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

// Funções de autoplay
function startSimpleAutoPlay() {
  simpleInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }, 5000);
}

function stopSimpleAutoPlay() {
  clearInterval(simpleInterval);
}

// Inicia autoplay
startSimpleAutoPlay();

// Hover
track.addEventListener("mouseenter", stopSimpleAutoPlay);
track.addEventListener("mouseleave", startSimpleAutoPlay);
