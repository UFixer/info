function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("active");
    document.querySelector(".hamburger").classList.remove("active");
  });
});

// FAQ Accordion Trigger
document.querySelectorAll(".faq-trigger").forEach(trigger => {
  trigger.addEventListener("click", () => {
    const item = trigger.parentElement;
    const isActive = item.classList.contains("active");
    
    // Collapse all open FAQ items
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
    
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Scroll Reveal Observer
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  root: null,
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px"
});

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

// ScrollSpy & Reading Progress
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  // 1. Reading progress
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }

  // 2. ScrollSpy highlight
  let currentSectionId = "";
  const scrollPos = window.scrollY + 120; // Offset for fixed nav height
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentSectionId = section.getAttribute("id");
    }
  });

  if (currentSectionId) {
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }
});

