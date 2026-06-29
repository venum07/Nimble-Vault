const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const forms = document.querySelectorAll("form");

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => {
  revealObserver.observe(item);
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const originalText = button.textContent;
    button.textContent = "Received";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
});
