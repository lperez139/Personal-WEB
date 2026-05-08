const ACCESS_CODE = "Mavic4";
const accessForm = document.getElementById("access-form");
const accessInput = document.getElementById("access-code");
const accessError = document.getElementById("access-error");
const accessGate = document.getElementById("access-gate");
const ACCESS_STORAGE_KEY = "lukas-site-access";

const hasStoredAccess = () => {
  try {
    return sessionStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
};

const storeAccess = () => {
  try {
    sessionStorage.setItem(ACCESS_STORAGE_KEY, "granted");
  } catch {
    return;
  }
};

const unlockSite = () => {
  document.body.classList.remove("auth-locked");
  accessGate?.setAttribute("aria-hidden", "true");
};

if (hasStoredAccess()) {
  unlockSite();
} else {
  accessInput?.focus();
}

accessForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (accessInput.value === ACCESS_CODE) {
    storeAccess();
    unlockSite();
    return;
  }

  accessError.textContent = "Clave incorrecta. Intentalo nuevamente.";
  accessInput.value = "";
  accessInput.focus();
});

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
