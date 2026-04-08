const watchInventory = [
  {
    brand: "Rolex",
    model: "Day-Date 40 Olive Dial",
    family: "Dress",
    material: "Everose Gold",
    size: "40mm",
    year: 2022,
    location: "Bucharest",
    price: 46500,
    tone: "olive",
    status: "Available",
    image: "assets/images/watches/rolex-day-date.jpg",
    imageAlt: "Luxury watch photograph selected to represent the Rolex Day-Date 40 Olive Dial.",
    imagePosition: "center 36%",
  },
  {
    brand: "Patek Philippe",
    model: "Annual Calendar 5205R",
    family: "Complications",
    material: "Rose Gold",
    size: "40mm",
    year: 2021,
    location: "Monaco",
    price: 59800,
    tone: "gold",
    status: "Available",
    image: "assets/images/watches/patek-5205r.jpg",
    imageAlt: "Representative luxury watch photograph for the Patek Philippe Annual Calendar 5205R.",
    imagePosition: "center 44%",
  },
  {
    brand: "Audemars Piguet",
    model: "Royal Oak Selfwinding",
    family: "Sport",
    material: "Stainless Steel",
    size: "41mm",
    year: 2020,
    location: "Geneva",
    price: 39500,
    tone: "blue",
    status: "Reserved",
    image: "assets/images/watches/ap-royal-oak.jpg",
    imageAlt: "Representative luxury watch photograph for the Audemars Piguet Royal Oak Selfwinding.",
    imagePosition: "center 42%",
  },
  {
    brand: "Cartier",
    model: "Santos Dumont XL",
    family: "Dress",
    material: "Yellow Gold",
    size: "43mm",
    year: 2023,
    location: "Bucharest",
    price: 21400,
    tone: "gold",
    status: "Available",
    image: "assets/images/watches/cartier-santos.jpg",
    imageAlt: "Representative luxury watch photograph for the Cartier Santos Dumont XL.",
    imagePosition: "center 40%",
  },
  {
    brand: "Vacheron Constantin",
    model: "Overseas Dual Time",
    family: "Sport",
    material: "Stainless Steel",
    size: "41mm",
    year: 2022,
    location: "Paris",
    price: 33800,
    tone: "slate",
    status: "Available",
    image: "assets/images/watches/vacheron-overseas.jpg",
    imageAlt: "Representative luxury watch photograph for the Vacheron Constantin Overseas Dual Time.",
    imagePosition: "center 46%",
  },
  {
    brand: "F.P. Journe",
    model: "Chronomètre Bleu",
    family: "Independent",
    material: "Tantalum",
    size: "39mm",
    year: 2019,
    location: "Zurich",
    price: 97200,
    tone: "blue",
    status: "Reserved",
    image: "assets/images/watch-dial-blue.jpg",
    imageAlt: "Blue-dial luxury watch photograph selected to represent the F.P. Journe Chronomètre Bleu.",
    imagePosition: "center",
  },
  {
    brand: "A. Lange & Söhne",
    model: "Lange 1 Moon Phase",
    family: "Complications",
    material: "Pink Gold",
    size: "38.5mm",
    year: 2021,
    location: "Vienna",
    price: 51800,
    tone: "burgundy",
    status: "Available",
    image: "assets/images/watches/lange-moon-phase.jpg",
    imageAlt: "Luxury dress watch photograph selected to represent the A. Lange & Söhne Lange 1 Moon Phase.",
    imagePosition: "center 40%",
  },
  {
    brand: "Rolex",
    model: "GMT-Master II Sprite",
    family: "Sport",
    material: "Oystersteel",
    size: "40mm",
    year: 2024,
    location: "Bucharest",
    price: 22800,
    tone: "emerald",
    status: "Available",
    image: "assets/images/watches/rolex-gmt-sprite.jpg",
    imageAlt: "Representative luxury watch photograph for the Rolex GMT-Master II Sprite.",
    imagePosition: "center 42%",
  },
];

const catalogRoot = document.querySelector("[data-catalog-grid]");

if (catalogRoot) {
  const searchInput = document.querySelector("[data-filter-search]");
  const familyInput = document.querySelector("[data-filter-family]");
  const priceInput = document.querySelector("[data-filter-price]");
  const availableInput = document.querySelector("[data-filter-available]");
  const sortInput = document.querySelector("[data-filter-sort]");
  const countOutput = document.querySelector("[data-catalog-count]");
  const emptyState = document.querySelector("[data-empty-state]");

  const priceRanges = {
    all: () => true,
    under25000: (watch) => watch.price < 25000,
    between25000and50000: (watch) => watch.price >= 25000 && watch.price <= 50000,
    over50000: (watch) => watch.price > 50000,
  };

  function formatPrice(value) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function renderCards(items) {
    catalogRoot.innerHTML = items
      .map((watch) => {
        const badgeClass = watch.status === "Reserved" ? "status-badge reserved" : "status-badge";
        const sigil = `${watch.brand.slice(0, 2).toUpperCase()} / ${watch.family}`;

        return `
          <article class="catalog-card" data-reveal>
            <div class="watch-art ${watch.tone}" style="--watch-position: ${watch.imagePosition || "center"};">
              <img src="${watch.image}" alt="${watch.imageAlt}" loading="lazy" decoding="async" />
              <span class="watch-sigil">${sigil}</span>
              <span class="watch-year">${watch.year}</span>
            </div>
            <div class="catalog-meta">
              <div>
                <h3>${watch.brand} ${watch.model}</h3>
                <p>${watch.material} • ${watch.location}</p>
              </div>
              <span class="${badgeClass}">${watch.status}</span>
            </div>
            <div class="spec-line">
              <span>${watch.size}</span>
              <span>${watch.family}</span>
              <span>${watch.year}</span>
            </div>
            <div class="card-footer">
              <strong>${formatPrice(watch.price)}</strong>
              <a class="button secondary" href="contact.html">Request details</a>
            </div>
          </article>
        `;
      })
      .join("");

    document.querySelectorAll(".catalog-card[data-reveal]").forEach((card) => {
      card.classList.add("is-visible");
    });

    if (typeof window.setupTilt === "function") {
      document.querySelectorAll(".watch-art").forEach((art) => {
        window.setupTilt(art);
      });
    }
  }

  function applyFilters() {
    const searchTerm = (searchInput?.value || "").trim().toLowerCase();
    const selectedFamily = familyInput?.value || "all";
    const selectedPrice = priceInput?.value || "all";
    const availableOnly = Boolean(availableInput?.checked);
    const sortValue = sortInput?.value || "featured";

    let filtered = watchInventory.filter((watch) => {
      const matchesSearch =
        !searchTerm ||
        `${watch.brand} ${watch.model} ${watch.location}`.toLowerCase().includes(searchTerm);
      const matchesFamily = selectedFamily === "all" || watch.family === selectedFamily;
      const matchesPrice = priceRanges[selectedPrice](watch);
      const matchesAvailability = !availableOnly || watch.status === "Available";

      return matchesSearch && matchesFamily && matchesPrice && matchesAvailability;
    });

    if (sortValue === "priceAsc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceDesc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortValue === "latest") {
      filtered = [...filtered].sort((a, b) => b.year - a.year);
    }

    renderCards(filtered);

    if (countOutput) {
      countOutput.textContent = `${filtered.length} watches shown`;
    }

    if (emptyState) {
      emptyState.classList.toggle("visible", filtered.length === 0);
    }
  }

  [searchInput, familyInput, priceInput, availableInput, sortInput].forEach((control) => {
    if (control) {
      control.addEventListener("input", applyFilters);
      control.addEventListener("change", applyFilters);
    }
  });

  applyFilters();
}
