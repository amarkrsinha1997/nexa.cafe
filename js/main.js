// ============================================
// NEXA.CAFE - Main JavaScript
// Future of payments meets cozy cafe
// ============================================

// ============================================
// CAFE DATA
// ============================================

const cafesData = [
  {
    id: 1,
    name: "Crypto Coffee House",
    city: "San Francisco",
    country: "USA",
    cuisines: ["Coffee", "Pastries", "Breakfast"],
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    isComingSoon: false,
    tags: ["Wi-Fi", "Pet-Friendly"],
  },
  {
    id: 2,
    name: "Blockchain Bistro",
    city: "Austin",
    country: "USA",
    cuisines: ["American", "Brunch", "Coffee"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    isComingSoon: false,
    tags: ["Outdoor Seating", "Vegan Options"],
  },
  {
    id: 3,
    name: "Nexa Nook Cafe",
    city: "Mumbai",
    country: "India",
    cuisines: ["Indian", "Tea", "Snacks"],
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop",
    isComingSoon: false,
    tags: ["AC", "Quick Service"],
  },
  {
    id: 4,
    name: "Digital Diner",
    city: "London",
    country: "UK",
    cuisines: ["British", "Coffee", "Lunch"],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    isComingSoon: true,
    tags: ["Historic Building"],
  },
  {
    id: 5,
    name: "Satoshi's Espresso Bar",
    city: "Tokyo",
    country: "Japan",
    cuisines: ["Japanese", "Coffee", "Desserts"],
    image:
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop",
    isComingSoon: true,
    tags: ["Minimalist", "Premium"],
  },
  {
    id: 6,
    name: "Web3 Waffle House",
    city: "Barcelona",
    country: "Spain",
    cuisines: ["Spanish", "Waffles", "Brunch"],
    image:
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
    isComingSoon: true,
    tags: ["Beach View", "Live Music"],
  },
];

// ============================================
// I18N SYSTEM
// ============================================

class I18n {
  constructor() {
    this.currentLang = "en";
    this.content = {
      en: window.content_en || {},
      hi: window.content_hi || {},
    };
    this.init();
  }

  init() {
    // Detect language from localStorage, URL param, or browser
    const savedLang = localStorage.getItem("nexa-cafe-lang");
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    const browserLang = navigator.language.split("-")[0];

    // Priority: URL param > localStorage > browser > default
    if (urlLang && this.content[urlLang]) {
      this.currentLang = urlLang;
    } else if (savedLang && this.content[savedLang]) {
      this.currentLang = savedLang;
    } else if (this.content[browserLang]) {
      this.currentLang = browserLang;
    }

    this.updateContent();
  }

  setLanguage(lang) {
    if (!this.content[lang]) {
      console.error(`Language ${lang} not found`);
      return;
    }

    this.currentLang = lang;
    localStorage.setItem("nexa-cafe-lang", lang);
    this.updateContent();
    this.updateLangSwitcher();
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  updateContent() {
    const elements = document.querySelectorAll("[data-i18n]");
    const currentContent = this.content[this.currentLang];

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = this.getNestedValue(currentContent, key);

      if (value) {
        // Update content based on element type
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = value;
        } else if (element.hasAttribute("aria-label")) {
          element.setAttribute("aria-label", value);
        } else {
          element.textContent = value;
        }
      }
    });

    // Update document title and meta description
    const titleValue = this.getNestedValue(currentContent, "meta.title");
    const descValue = this.getNestedValue(currentContent, "meta.description");

    if (titleValue) {
      document.title = titleValue;
      document
        .querySelector('meta[name="title"]')
        ?.setAttribute("content", titleValue);
    }

    if (descValue) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", descValue);
    }

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
  }

  updateLangSwitcher() {
    const buttons = document.querySelectorAll(".lang-switcher__btn");
    buttons.forEach((btn) => {
      const lang = btn.getAttribute("data-lang");
      if (lang === this.currentLang) {
        btn.classList.add("lang-switcher__btn--active");
      } else {
        btn.classList.remove("lang-switcher__btn--active");
      }
    });
  }

  t(key) {
    return this.getNestedValue(this.content[this.currentLang], key) || key;
  }
}

// ============================================
// CAFE LISTING RENDERER
// ============================================

class CafeRenderer {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = "";

    this.data.forEach((cafe) => {
      const card = this.createCafeCard(cafe);
      this.container.appendChild(card);
    });
  }

  createCafeCard(cafe) {
    const card = document.createElement("div");
    card.className = "cafe-card";

    const statusBadge = cafe.isComingSoon
      ? `<span class="badge badge--mint" data-i18n="cafes.coming_soon">Coming Soon</span>`
      : `<span class="badge badge--nexa" data-i18n="cafes.accepts_nexa">Accepts Nexa</span>`;

    const cuisinesTags = cafe.cuisines
      .map(
        (cuisine) => `<span class="cafe-card__cuisine-tag">${cuisine}</span>`
      )
      .join("");

    card.innerHTML = `
      <div class="cafe-card__image">
        <img src="${cafe.image}" alt="${cafe.name}" loading="lazy">
      </div>
      <div class="cafe-card__header">
        <div>
          <h3 class="cafe-card__title">${cafe.name}</h3>
          <p class="cafe-card__location">${cafe.city}, ${cafe.country}</p>
        </div>
        ${statusBadge}
      </div>
      <div class="cafe-card__cuisines">
        ${cuisinesTags}
      </div>
    `;

    return card;
  }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Handle all anchor links with href starting with #
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");

        // Skip empty anchors
        if (href === "#") {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const nav = document.getElementById("mainNav");
          if (nav && nav.classList.contains("is-open")) {
            nav.classList.remove("is-open");
          }
        }
      });
    });
  }
}

// ============================================
// MOBILE MENU
// ============================================

class MobileMenu {
  constructor() {
    this.toggle = document.getElementById("mobileMenuToggle");
    this.nav = document.getElementById("mainNav");
    this.init();
  }

  init() {
    if (!this.toggle || !this.nav) return;

    this.toggle.addEventListener("click", () => {
      this.nav.classList.toggle("is-open");

      // Update aria-expanded
      const isExpanded = this.nav.classList.contains("is-open");
      this.toggle.setAttribute("aria-expanded", isExpanded);

      // Update toggle icon
      this.toggle.textContent = isExpanded ? "✕" : "☰";
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (!this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
        this.nav.classList.remove("is-open");
        this.toggle.setAttribute("aria-expanded", "false");
        this.toggle.textContent = "☰";
      }
    });
  }
}

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

class ActiveNav {
  constructor() {
    this.sections = document.querySelectorAll("section[id]");
    this.navLinks = document.querySelectorAll(".nav__link");
    this.init();
  }

  init() {
    if (!this.sections.length || !this.navLinks.length) return;

    // Update active link on scroll
    window.addEventListener("scroll", () => {
      this.updateActiveLink();
    });

    // Initial check
    this.updateActiveLink();
  }

  updateActiveLink() {
    const scrollPosition = window.pageYOffset + 100;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        this.navLinks.forEach((link) => {
          link.classList.remove("nav__link--active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("nav__link--active");
          }
        });
      }
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🎉 nexa.cafe initialized");

  // Initialize i18n system
  const i18n = new I18n();
  window.nexaCafeI18n = i18n; // Make available globally

  // Language dropdown switcher
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    // Initialize dropdown to current language
    langSelect.value = i18n.currentLang;
    langSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      i18n.setLanguage(lang);

      // Re-render cafes with new language
      const cafeRenderer = new CafeRenderer("cafeListGrid", cafesData);
      cafeRenderer.render();

      // Update i18n for newly rendered content
      i18n.updateContent();
    });
  }

  // Render cafe cards
  const cafeRenderer = new CafeRenderer("cafeListGrid", cafesData);
  cafeRenderer.render();

  // Initialize smooth scroll
  new SmoothScroll();

  // Initialize mobile menu
  new MobileMenu();

  // Initialize active navigation
  new ActiveNav();

  // Add fade-in animation to sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });

  // Console easter egg
  console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║         Welcome to nexa.cafe!         ║
    ║                                       ║
    ║   🌟 Future of payments meets        ║
    ║      cozy cafe culture               ║
    ║                                       ║
    ║   Built with ❤️ by the Nekka team   ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
  `);

  // Initialize QR Code
  initializeQRCode();
  initializeFAQ();
  initializeScrollAnimations();
});

// ============================================
// FAQ ACCORDION
// ============================================

function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        // Optional: stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".benefit-card, .impact-point, .stat-card, .faq-item, .cafe-card, .feature-card, .step-card"
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// ============================================
// QR CODE INITIALIZATION
// ============================================

function initializeQRCode() {
  const qrcodeContainer = document.getElementById("qrcode");
  if (qrcodeContainer && typeof QRCode !== "undefined") {
    qrcodeContainer.innerHTML = ""; // Clear placeholder
    new QRCode(qrcodeContainer, {
      text: "nexa:nqtsq5g5sjkqk7wzd9wwh9423rr0tda7m027ryljkrq8emeh?amount=12.50&label=Cafe%20Bill",
      width: 176,
      height: 176,
      colorDark: "#1D1D1F",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
  }
}

// ============================================
// EXPORT FOR EXTERNAL USE
// ============================================

window.nexaCafe = {
  cafesData,
  version: "1.0.0",
  addCafe: (cafe) => {
    cafesData.push(cafe);
    const renderer = new CafeRenderer("cafeListGrid", cafesData);
    renderer.render();
  },
};
