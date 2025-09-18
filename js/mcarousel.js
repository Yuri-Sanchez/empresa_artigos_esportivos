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
    multiIndex = 0; // Reinicia
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

// Funções de autoplay
function startMultiAutoPlay() {
  multiInterval = setInterval(() => {
    if (multiIndex < multiSlides.length - visibleSlides) {
      multiIndex++;
    } else {
      multiIndex = 0;
    }
    updateMultiPosition();
  }, 3500);
}

function stopMultiAutoPlay() {
  clearInterval(multiInterval);
}

// Inicia autoplay
startMultiAutoPlay();

// Pausa no hover e retoma ao sair
multiTrack.addEventListener("mouseenter", stopMultiAutoPlay);
multiTrack.addEventListener("mouseleave", startMultiAutoPlay);
