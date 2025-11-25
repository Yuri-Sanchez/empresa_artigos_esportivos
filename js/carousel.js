const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let currentIndex = 0;
let simpleInterval;

// Atualiza posição
function updateSlidePosition() {
  const slideWidth = track.clientWidth; // largura real do container
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

window.addEventListener("resize", updateSlidePosition);

// Manual
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

// Autoplay
function startSimpleAutoPlay() {
  simpleInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }, 5000);
}

function stopSimpleAutoPlay() {
  clearInterval(simpleInterval);
}

startSimpleAutoPlay();

// Pausa autoplay
track.addEventListener("mouseenter", stopSimpleAutoPlay);
track.addEventListener("mouseleave", startSimpleAutoPlay);
