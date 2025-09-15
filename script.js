const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  let currentIndex = 0;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });

  const multiTrack = document.querySelector('.carousel-multi-track');
    const multiSlides = Array.from(multiTrack.children);
    const nextMulti = document.querySelector('.multi-next');
    const prevMulti = document.querySelector('.multi-prev');
    let multiIndex = 0;
    const visibleSlides = 3; // quantos aparecem ao mesmo tempo

    function updateMultiPosition() {
      multiTrack.style.transform = `translateX(-${multiIndex * (100 / visibleSlides)}%)`;
    }

    nextMulti.addEventListener('click', () => {
      if (multiIndex < multiSlides.length - visibleSlides) {
        multiIndex++;
        updateMultiPosition();
      }
    });

    prevMulti.addEventListener('click', () => {
      if (multiIndex > 0) {
        multiIndex--;
        updateMultiPosition();
      }
    });