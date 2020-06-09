const nav = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

// build the nav
sections.forEach((ele) => {
  const sectionName = ele.getAttribute('data-nav');
  const navEle = document.createElement('li');
  navEle.innerHTML =
      `<a href="#${ele.id}" id="nav_${ele.id}">${sectionName}</a>`;
  nav.appendChild(navEle);
});


// check if an element in viewport
// reference: https://stackoverflow.com/a/125106
const isElementInViewport = (el) => {
  let bounding = el.getBoundingClientRect();

  return (
      bounding.top <=
      (window.innerHeight || document.documentElement.clientHeight) / 2);
};


const removeAllActive = () => {
  sections.forEach((section) => {
    const navEle = document.querySelector(`#nav_${section.id}`);
    navEle.classList.remove('active');
  });
};

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', function() {
  sections.forEach((section) => {
    const navEle = document.querySelector(`#nav_${section.id}`);
    if (isElementInViewport(section)) {
      removeAllActive();
      navEle.classList.add('active');
    }
  });
});