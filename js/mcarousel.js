const multiTrack = document.querySelector(".carousel-multi-track");
const multiSlides = Array.from(multiTrack.children);
const nextMulti = document.querySelector(".multi-next");
const prevMulti = document.querySelector(".multi-prev");

let multiIndex = 0;
let multiInterval;

function getVisibleSlides() {
  const slideWidth = multiSlides[0].getBoundingClientRect().width;
  const trackWidth = multiTrack.parentElement.getBoundingClientRect().width;

  const count = Math.floor(trackWidth / slideWidth);
  return Math.max(count, 1); // sempre ao menos 1
}

function updateMultiPosition() {
  const visible = getVisibleSlides();
  const maxIndex = multiSlides.length - visible;

  if (multiIndex > maxIndex) multiIndex = 0;
  if (multiIndex < 0) multiIndex = maxIndex;

  const movePercent = (100 / visible) * multiIndex;
  multiTrack.style.transform = `translateX(-${movePercent}%)`;
}

/* Manual */
nextMulti.addEventListener("click", () => {
  const visible = getVisibleSlides();
  const maxIndex = multiSlides.length - visible;

  if (multiIndex < maxIndex) multiIndex++;
  else multiIndex = 0;

  updateMultiPosition();
});

prevMulti.addEventListener("click", () => {
  const visible = getVisibleSlides();
  const maxIndex = multiSlides.length - visible;

  if (multiIndex > 0) multiIndex--;
  else multiIndex = maxIndex;

  updateMultiPosition();
});

/* Autoplay */
function startMultiAutoPlay() {
  multiInterval = setInterval(() => {
    const visible = getVisibleSlides();
    const maxIndex = multiSlides.length - visible;

    if (multiIndex < maxIndex) multiIndex++;
    else multiIndex = 0;

    updateMultiPosition();
  }, 3500);
}

function stopMultiAutoPlay() {
  clearInterval(multiInterval);
}

multiTrack.addEventListener("mouseenter", stopMultiAutoPlay);
multiTrack.addEventListener("mouseleave", startMultiAutoPlay);

window.addEventListener("resize", () => {
  updateMultiPosition();
});

updateMultiPosition();
startMultiAutoPlay();

// Pausa no hover ou ao toque no celular

carouselMulti.addEventListener("mouseenter", stopAutoPlay);
carouselMulti.addEventListener("mouseleave", startAutoPlay);

carouselMulti.addEventListener("touchstart", stopAutoPlay);
carouselMulti.addEventListener("touchend", startAutoPlay);