/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const header = document.querySelector(".page__header");
const navList = document.querySelector("#navbar__list");
const scrollToTopBtn = document.querySelector(".page__scrollToTop");
let headerTimeout;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav() {
  let liFragment = document.createDocumentFragment();
  sections.forEach((sec) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.className = "menu__link";
    a.textContent = sec.getAttribute("data-nav");
    li.appendChild(a);
    liFragment.appendChild(li);
  });
  navList.appendChild(liFragment);
}

// Add class 'active' to section when near top of viewport
function addActiveNearTop() {
  sections.forEach((sec) => {
    let secBounds = sec.getBoundingClientRect();
    if (secBounds.top <= 200 && secBounds.top >= 0) {
      sections.forEach((sec) => sec.classList.remove("active"));
      sec.classList.add("active");
    }
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.tagName === "A") {
    const scrollEleText = event.target.textContent;
    const scrollEle = document.querySelector(`section[data-nav="${scrollEleText}"]`);
    scrollEle.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Hide header while not scrolling
function hideHeader() {
  header.style.opacity = "1";
  clearTimeout(headerTimeout);
  headerTimeout = setTimeout(() => {
    header.style.opacity = "0";
  }, 2500);
}

// Toggle scroll to top button
function toggleScrollToTop() {
  if (window.pageYOffset > 700) scrollToTopBtn.style.opacity = "1";
  else scrollToTopBtn.style.opacity = "0";
}

// Collapsible sections
function toggleSection(event) {
  if (event.target.tagName === "H2" && event.target.getAttribute("data-parent") === "section") {
    let h2 = event.target;
    Array.from(h2.parentNode.children).forEach((child) => {
      if (child.tagName !== "H2") {
        child.classList.toggle("hidden");
      }
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("DOMContentLoaded", buildNav);

// Scroll to section on link click
navList.addEventListener("click", scrollToSection);

// Set sections as active
document.addEventListener("scroll", addActiveNearTop);

// Hide header while not scrolling and toggle scroll to top button
document.addEventListener("scroll", () => {
  hideHeader();
  toggleScrollToTop();
});

// Scroll to top
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Collapsible sections
document.addEventListener("click", toggleSection);
