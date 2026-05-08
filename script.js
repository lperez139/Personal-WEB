const images = document.querySelectorAll("img[data-fallback]");

images.forEach((image) => {
  const applyFallback = () => {
    const fallback = image.dataset.fallback;

    if (!fallback || image.dataset.fallbackApplied === "true") {
      return;
    }

    image.dataset.fallbackApplied = "true";
    image.src = fallback;
  };

  image.addEventListener("error", applyFallback, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    applyFallback();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const heroGallery = document.querySelector(".hero-gallery");

if (heroGallery && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroGallery.addEventListener("pointermove", (event) => {
    const rect = heroGallery.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroGallery.style.setProperty("--tilt-x", `${x * 12}px`);
    heroGallery.style.setProperty("--tilt-y", `${y * 12}px`);
  });
}
