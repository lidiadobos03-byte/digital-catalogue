const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const topbar = document.querySelector(".topbar");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

if (topbar) {
  const syncTopbarState = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncTopbarState();
  window.addEventListener("scroll", syncTopbarState, { passive: true });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    },
  );

  document.querySelectorAll("[data-reveal]").forEach((section, index) => {
    if (!prefersReducedMotion.matches) {
      section.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
    }
    revealObserver.observe(section);
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((section) => {
    section.classList.add("is-visible");
  });
}

function setupTilt(element) {
  if (prefersReducedMotion.matches || element.dataset.tiltReady === "true") {
    return;
  }

  element.dataset.tiltReady = "true";

  const onMove = (event) => {
    const bounds = element.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    const rotateY = offsetX * 5;
    const rotateX = offsetY * -5;

    element.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
  };

  const reset = () => {
    element.style.transform = "";
  };

  element.addEventListener("pointermove", onMove);
  element.addEventListener("pointerleave", reset);
  element.addEventListener("pointercancel", reset);
}

window.setupTilt = setupTilt;

document
  .querySelectorAll(".photo-frame, .watch-art, .showcase-card, .cta-card, .membership-card.featured, .footer-invite")
  .forEach((element) => {
    setupTilt(element);
  });

function renderUploadPreview(input) {
  const targetId = input.getAttribute("data-upload-target");
  const preview = targetId ? document.querySelector(targetId) : null;

  if (!preview) {
    return;
  }

  preview.innerHTML = "";

  if (!input.files || input.files.length === 0) {
    const emptyItem = document.createElement("span");
    emptyItem.textContent = "You can upload up to 6 photos";
    preview.appendChild(emptyItem);
    return;
  }

  Array.from(input.files).forEach((file) => {
    const item = document.createElement("span");
    item.textContent = file.name;
    preview.appendChild(item);
  });
}

document.querySelectorAll("[data-upload-input]").forEach((input) => {
  renderUploadPreview(input);
  input.addEventListener("change", () => renderUploadPreview(input));
});

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector("[data-form-status]");
    const uploadInput = form.querySelector("[data-upload-input]");

    if (status) {
      status.textContent =
        "Your message has been prepared successfully. For a live setup, this form can be connected to email, a CRM, or the WhatsApp Business API.";
    }

    form.reset();

    if (uploadInput) {
      renderUploadPreview(uploadInput);
    }
  });
});
