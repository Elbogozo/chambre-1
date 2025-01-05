document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById('gallery-grid');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  
  const imagePaths = [
    "photo/carousel-1.webp",
    "photo/carousel-2.webp",
    "photo/carousel-3.webp",
    "photo/carousel-4.webp",
    "photo/carousel-5.webp",
    "photo/carousel-6.webp",
    "photo/carousel-7.webp",
    "photo/carousel-8.webp",
    "photo/carousel-9.webp",
    "photo/carousel-10.webp",
    "photo/carousel-11.webp",
    "photo/carousel-12.webp",
    "photo/carousel-13.webp",
    "photo/carousel-14.webp",
    "photo/carousel-15.webp",
    "photo/carousel-16.webp",
    "photo/carousel-17.webp",
    "photo/carousel-18.webp",
    "photo/carousel-19.webp",
    "photo/carousel-20.webp",
    "photo/carousel-21.webp",
    "photo/carousel-22.webp",
    "photo/carousel-23.webp",
    "photo/carousel-24.webp"
  ];

  let currentImages = [];

  const getRandomImages = (excludeImages, count) => {
    const availableImages = imagePaths.filter(img => !excludeImages.includes(img));
    const shuffled = availableImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const displayImages = (images) => {
    galleryGrid.classList.add('fade-out');
    setTimeout(() => {
      galleryGrid.innerHTML = '';
      images.forEach((imgSrc, index) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Photo ${index + 1}`;
        img.loading = "lazy";
        div.appendChild(img);
        galleryGrid.appendChild(div);
      });
      galleryGrid.classList.remove('fade-out');
      currentImages = images;
    }, 500);
  };

  const initGallery = () => {
    const initialImages = getRandomImages([], 9);
    displayImages(initialImages);
  };

  prevButton.addEventListener('click', () => {
    const newImages = getRandomImages(currentImages, 9);
    if (newImages.length < 9) {
      // If not enough new images, reset the exclude list
      displayImages(getRandomImages([], 9));
    } else {
      displayImages(newImages);
    }
  });

  nextButton.addEventListener('click', () => {
    const newImages = getRandomImages(currentImages, 9);
    if (newImages.length < 9) {
      displayImages(getRandomImages([], 9));
    } else {
      displayImages(newImages);
    }
  });

  initGallery();

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector("nav ul");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    const expanded = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", expanded);
  });

  const navItems = document.querySelectorAll("nav ul li a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  const toggleMentions = document.getElementById("toggle-mentions");
  const toggleMentionsFooter = document.getElementById("toggle-mentions-footer");
  const mentionsLegales = document.getElementById("mentions-legales");

  const toggleMentionsVisibility = () => {
    mentionsLegales.classList.toggle("hidden");
    mentionsLegales.classList.toggle("visible");
  };

  toggleMentions.addEventListener("click", toggleMentionsVisibility);
  toggleMentionsFooter.addEventListener("click", toggleMentionsVisibility);

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (!localStorage.getItem("cookiesAccepted") && !localStorage.getItem("cookiesDeclined")) {
    cookieBanner.style.display = "flex";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesDeclined", "true");
    cookieBanner.style.display = "none";
  });

  const togglePolitique = document.getElementById("toggle-politique");
  const politiqueContent = document.getElementById("politique-confidentialite");

  togglePolitique.addEventListener("click", () => {
    politiqueContent.classList.toggle("hidden");
    politiqueContent.classList.toggle("visible");
    if (politiqueContent.classList.contains("visible")) {
      togglePolitique.textContent = "Fermer la Politique de Confidentialité";
    } else {
      togglePolitique.textContent = "Lire la Politique de Confidentialité";
    }
  });

  hamburger.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      hamburger.click();
    }
  });
});
