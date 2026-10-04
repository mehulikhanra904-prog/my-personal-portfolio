document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTopButton = document.querySelector(".scroll-top");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  /* Mobile navigation */
  if (navToggle && navMenu) {
    navToggle.setAttribute("aria-expanded", "false");

    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("active");
      navToggle.classList.toggle("active", open);
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
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

  /* Navbar state */
  const updateNavbar = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  /* Active section */
  const sections = document.querySelectorAll("section[id]");
  const updateActiveNav = () => {
    const position = window.scrollY + 180;
    let current = "home";

    sections.forEach((section) => {
      if (position >= section.offsetTop) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  };
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* Smooth scrolling */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      const offset = navbar ? navbar.offsetHeight + 10 : 10;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* Scroll reveal */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  /* Project hover spotlight */
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", event.clientX - rect.left + "px");
      card.style.setProperty("--mouse-y", event.clientY - rect.top + "px");
    });
  });

  /* Scroll to top */
  const updateScrollTop = () => {
    if (scrollTopButton) {
      scrollTopButton.classList.toggle("show", window.scrollY > 600);
    }
  };

  window.addEventListener("scroll", updateScrollTop, { passive: true });
  updateScrollTop();

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Scroll indicator */
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", (event) => {
      const target = document.querySelector("#about");
      if (!target) return;
      event.preventDefault();

      const offset = navbar ? navbar.offsetHeight + 10 : 10;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth"
      });
    });
  }

  /* Image fallback:
     Use the real local image when available.
     If the repository contains a broken/missing image,
     fall back to the GitHub profile avatar. */
  document.querySelectorAll(".hero-image img").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") return;

      image.dataset.fallbackApplied = "true";
      image.src = "https://github.com/mehulikhanra904-prog.png";
    });
  });

  /* Close mobile menu with Escape */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });

  console.log(
    "%c Mehuli Khanra Portfolio ",
    "font-size:16px;font-weight:800;color:#6d5dfc;"
  );
});
