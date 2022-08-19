/////////////////////////////////////////
// MOBILE NAVIGATION
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");

  // Remove active element outline
  // document.activeElement.blur();
});

/////////////////////////////////////////
// YEAR IN FOOTER COPYRIGHT
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

/////////////////////////////////////////
// SMOOTH SCROLLING
const bodyEl = document.querySelector("body");

bodyEl.addEventListener("click", (e) => {
  e.preventDefault();
  const clickedEl = e.target;
  const href = clickedEl.getAttribute("href");

  // Scroll back to the top when logo is clicked
  if (clickedEl.classList.contains("logo")) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Scroll to other links (sections)
  if (href && href !== "#" && href.startsWith("#")) {
    const sectionEl = document.querySelector(href);
    sectionEl.scrollIntoView({ behavior: "smooth" });
  }

  // Close mobile navigation
  if (clickedEl.classList.contains("main-nav-link"))
    headerEl.classList.toggle("nav-open");
});

// WITHOUT EVENT BUBBLING
// const allLinks = document.querySelectorAll("a:link");
// allLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     const href = link.getAttribute("href");

//     // Scroll back to the top
//     if (href === "#")
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//     // Scroll to other links (sections)
//     if (href !== "#" && href.startsWith("#")) {
//       const sectionEl = document.querySelector(href);
//       sectionEl.scrollIntoView({ behavior: "smooth" });
//     }

//     // Close mobile navigation
//     if (link.classList.contains("main-nav-link"))
//       headerEl.classList.toggle("nav-open");
//   });
// });

///////////////////////////////////
// STICKY NAVIGATION

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) document.body.classList.add("sticky");

    if (ent.isIntersecting) document.body.classList.remove("sticky");
  },
  {
    // In the viewport
    root: null,
    // 0 - fires when the 0% of the section is in the viewport
    // 1 - fires when 100% of the section is in the viewport
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  // console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
