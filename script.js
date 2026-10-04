/* =========================================================
   MEHULI KHANRA — AI/ML ENGINEERING PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const revealElements = document.querySelectorAll(".reveal");
  const scrollTopButton = document.querySelector(".scroll-top");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);

      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* =========================================================
     NAVBAR SCROLL EFFECT
     ========================================================= */

  const handleNavbarScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll, {
    passive: true,
  });

  handleNavbarScroll();

  /* =========================================================
     ACTIVE NAVIGATION LINK
     ========================================================= */

  const sections = document.querySelectorAll("section[id]");

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          const href = link.getAttribute("href");

          if (href === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, {
    passive: true,
  });

  updateActiveNav();

  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =========================================================
     SCROLL REVEAL ANIMATION
     ========================================================= */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =========================================================
     STAGGER ANIMATIONS
     ========================================================= */

  const staggerGroups = [
    ".skills-grid",
    ".projects-grid",
    ".stats-grid",
    ".about-grid",
    ".opensource-grid",
  ];

  staggerGroups.forEach((selector) => {
    const container = document.querySelector(selector);

    if (!container) return;

    const children = container.children;

    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 80}ms`;
    });
  });

  /* =========================================================
     ANIMATED COUNTERS
     ========================================================= */

  const counters = document.querySelectorAll("[data-count]");

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);

    if (Number.isNaN(target)) return;

    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(target * easedProgress);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ("IntersectionObserver" in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  /* =========================================================
     SKILL CARD HOVER EFFECT
     ========================================================= */

  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -5;
      const rotateY = (x / rect.width - 0.5) * 5;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-5px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* =========================================================
     PROJECT CARD HOVER EFFECT
     ========================================================= */

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* =========================================================
     CODE WINDOW TYPING EFFECT
     ========================================================= */

  const codeLines = document.querySelectorAll(".code-line");

  codeLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 120}ms`;
  });

  /* =========================================================
     FLOATING BACKGROUND EFFECT
     ========================================================= */

  const hero = document.querySelector(".hero");

  if (hero && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    hero.addEventListener("mousemove", (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      const orbs = hero.querySelectorAll(".orb");

      orbs.forEach((orb, index) => {
        const intensity = (index + 1) * 12;

        orb.style.transform = `
          translate(
            ${x * intensity}px,
            ${y * intensity}px
          )
        `;
      });
    });
  }

  /* =========================================================
     SCROLL INDICATOR
     ========================================================= */

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.querySelector("#about");

      if (!aboutSection) return;

      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     SCROLL TO TOP
     ========================================================= */

  const handleScrollTopVisibility = () => {
    if (!scrollTopButton) return;

    if (window.scrollY > 600) {
      scrollTopButton.classList.add("show");
    } else {
      scrollTopButton.classList.remove("show");
    }
  };

  window.addEventListener("scroll", handleScrollTopVisibility, {
    passive: true,
  });

  handleScrollTopVisibility();

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     PROJECT FILTERS
     ========================================================= */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll("[data-category]");

  if (filterButtons.length > 0 && filterItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        filterItems.forEach((item) => {
          const categories = item.dataset.category || "";

          if (
            filter === "all" ||
            categories
              .split(" ")
              .map((category) => category.toLowerCase())
              .includes(filter.toLowerCase())
          ) {
            item.style.display = "";
            requestAnimationFrame(() => {
              item.classList.remove("hidden");
            });
          } else {
            item.classList.add("hidden");

            setTimeout(() => {
              if (item.classList.contains("hidden")) {
                item.style.display = "none";
              }
            }, 250);
          }
        });
      });
    });
  }

  /* =========================================================
     COPY EMAIL
     ========================================================= */

  const emailElements = document.querySelectorAll("[data-copy-email]");

  emailElements.forEach((element) => {
    element.addEventListener("click", async (event) => {
      const email = element.dataset.copyEmail;

      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);

        const originalText = element.textContent;

        element.textContent = "Email copied!";

        setTimeout(() => {
          element.textContent = originalText;
        }, 1800);
      } catch (error) {
        console.warn("Unable to copy email:", error);
      }
    });
  });

  /* =========================================================
     CONTACT FORM
     ========================================================= */

  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = contactForm.querySelector('[name="name"]');
      const emailInput = contactForm.querySelector('[name="email"]');
      const messageInput = contactForm.querySelector('[name="message"]');

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        showNotification(
          "Please fill in all required fields.",
          "error"
        );
        return;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        showNotification(
          "Please enter a valid email address.",
          "error"
        );
        return;
      }

      /*
       * Opens the user's default email client.
       * Replace this with Formspree / EmailJS / backend API
       * later if you want server-side form handling.
       */

      const subject = encodeURIComponent(
        `Portfolio Contact — ${name}`
      );

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href =
        `mailto:mehulikhanra904@gmail.com?subject=${subject}&body=${body}`;

      showNotification(
        "Opening your email client...",
        "success"
      );
    });
  }

  /* =========================================================
     NOTIFICATION SYSTEM
     ========================================================= */

  function showNotification(message, type = "success") {
    const existingNotification =
      document.querySelector(".portfolio-notification");

    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");

    notification.className =
      `portfolio-notification ${type}`;

    notification.innerHTML = `
      <span class="notification-dot"></span>
      <span>${escapeHTML(message)}</span>
      <button
        type="button"
        aria-label="Close notification"
      >
        ×
      </button>
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    const closeButton =
      notification.querySelector("button");

    closeButton.addEventListener("click", () => {
      removeNotification(notification);
    });

    setTimeout(() => {
      removeNotification(notification);
    }, 4000);
  }

  function removeNotification(notification) {
    if (!notification) return;

    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  /* =========================================================
     ESCAPE HTML
     ========================================================= */

  function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  /* =========================================================
     EXTERNAL LINKS
     ========================================================= */

  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* =========================================================
     IMAGE LAZY LOADING
     ========================================================= */

  document.querySelectorAll("img").forEach((image) => {
    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =========================================================
     PARALLAX EFFECT
     ========================================================= */

  const parallaxElements =
    document.querySelectorAll("[data-parallax]");

  if (
    parallaxElements.length > 0 &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach((element) => {
          const speed =
            Number(element.dataset.parallax) || 0.1;

          element.style.transform =
            `translateY(${scrollY * speed}px)`;
        });
      },
      { passive: true }
    );
  }

  /* =========================================================
     KEYBOARD ACCESSIBILITY
     ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (navMenu) {
        navMenu.classList.remove("active");
      }

      if (navToggle) {
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }

      document.body.classList.remove("menu-open");
    }
  });

  /* =========================================================
     REDUCED MOTION SUPPORT
     ========================================================= */

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotionQuery.matches) {
    document.documentElement.classList.add(
      "reduced-motion"
    );
  }

  /* =========================================================
     PAGE LOAD
     ========================================================= */

  window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");

    const loader = document.querySelector(".page-loader");

    if (loader) {
      setTimeout(() => {
        loader.classList.add("hidden");

        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 400);
    }
  });

  /* =========================================================
     CONSOLE BRANDING
     ========================================================= */

  console.log(
    "%c Mehuli Khanra ",
    "font-size: 18px; font-weight: bold; color: #6d5dfc;"
  );

  console.log(
    "%c AI/ML Engineer • Full-Stack Developer • Web3 Explorer ",
    "font-size: 12px; color: #64748b;"
  );

  console.log(
    "%c Portfolio initialized successfully 🚀",
    "font-size: 12px; color: #22c55e;"
  );
});