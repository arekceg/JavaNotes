export function createCarousel(containerId, images) {
  const container = document.getElementById(containerId);
  let currentIndex = 0;
  let interval;

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  images.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-item');
    if (index === 0) slide.classList.add('active');

    const img = document.createElement('img');
    img.src = image;
    img.classList.add('d-block', 'w-100');
    slide.appendChild(img);
    carouselInner.appendChild(slide);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';
  prevButton.onclick = () => navigate(-1);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';
  nextButton.onclick = () => navigate(1);

  container.appendChild(carouselInner);
  container.appendChild(prevButton);
  container.appendChild(nextButton);

  function navigate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateCarousel();
  }

  function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-item');
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === currentIndex) {
        slide.classList.add('active');
      }
    });
  }

  function startAutoplay() {
    interval = setInterval(() => navigate(1), 3000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}