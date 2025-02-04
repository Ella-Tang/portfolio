const isStudioPage = window.location.pathname.includes("studio");
const isProjectsPage = window.location.pathname.includes("projects");
const isPlaygroundPage = window.location.pathname.includes("playground");
const isAboutPage = window.location.pathname.includes("about");

document.addEventListener("DOMContentLoaded", function () {
  setupCustomCursor();
  typeHeaderText();
  if (isStudioPage) { renderProjectDetails(artworks); } 
  else if(isProjectsPage) { renderProjectDetails(projects); } 
  else if(isPlaygroundPage) { renderProjectDetails(items); }
});

// Opening fade in effect on page load
window.addEventListener('load', function () {
  document.querySelector('.opening-container .fade-in').classList.add('visible');
  setTimeout(function () {
    const openingContainer = document.querySelector('.opening-container');
    openingContainer.style.animation = 'slideUp 0.25s ease forwards'; 
    setTimeout(function() {
      openingContainer.style.display = 'none';
      const mainContainer = document.querySelector('.main-container');
      mainContainer.classList.remove('hidden');
      const fadeInEl = document.querySelectorAll(".fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right");
      for (let i = 0; i < fadeInEl.length; i++) { fadeInEl[i].classList.add("visible"); }
    }, 300);
}, 400); 
});

// Custom cursor
function setupCustomCursor() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorElements = document.querySelectorAll('.cursor-element');
    const artworkGrid = document.getElementById('artworkGrid');
    document.addEventListener('mousemove', function (e) {
      cursor.style.top = e.clientY + 'px';
      cursor.style.left = e.clientX + 'px';
    });
    cursorElements.forEach(function (e) {
      e.addEventListener('mouseenter', function () { cursor.classList.add('hovering'); });
      e.addEventListener('mouseleave', function () { cursor.classList.remove('hovering'); });
    });
    if (isStudioPage && artworkGrid) {
      artworkGrid.addEventListener('mouseenter', function () { cursor.classList.add('artwork-hover-active'); });
      artworkGrid.addEventListener('mouseleave', function () { cursor.classList.remove('artwork-hover-active'); });
    }
  } else { 
    if (document.querySelector('.custom-cursor')) { cursor.style.display = 'none'; }
  }
}

// Typing effect in header
function typeHeaderText() {
  const headerText = document.querySelector('header a h1');
  const texts = ['Ella Tang', '< 佳 韵 />'];
  let currTextIdx = 0, idx = 0, isDeleting = false;
  function typeEffect() {
    const curr = texts[currTextIdx];
    headerText.textContent = curr.substring(0, idx);
    if (!isDeleting && idx < curr.length) { idx++; } 
    else if (isDeleting && idx > 0) { idx--; } 
    else {
      isDeleting = !isDeleting;
      if (!isDeleting) currTextIdx = (currTextIdx + 1) % texts.length;
      setTimeout(typeEffect, isDeleting ? 1500 : 1000);
      return;
    }
    setTimeout(typeEffect, isDeleting ? 150 : 200);
  }
  typeEffect();
}

// Update button active/inactive styles
function updateFilterBtn(category) {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(function(button) {
    const buttonCategory = button.getAttribute('data-category') || button.innerText.toLowerCase();
    if (category === 'all' && buttonCategory === 'all' || buttonCategory === category) {
      button.classList.add('active');
      button.classList.remove('inactive');
    } else {
      button.classList.remove('active');
      button.classList.add('inactive');
    }
  });
}

// Artwork detail
function renderProjectDetails(dataArray) {
  const urlParts = window.location.pathname.split('/');
  const projectIdentifier = urlParts[urlParts.length - 2];
  const project = dataArray.find(item => item.link.includes(projectIdentifier));
  if (project) {
    const titleEl = document.querySelector('.project-title');
    const dateEl = document.querySelector('.project-date');
    const descriptionEl = document.querySelector('.project-description');
    const imageEl = document.querySelector('.artwork-image img');
    const paragraphEl = document.querySelector('.artwork-paragraph');
    const numberEl = document.querySelector('.project-number');
    if (titleEl) titleEl.textContent = project.title;
    if (dateEl) dateEl.textContent = project.date;
    if (descriptionEl) descriptionEl.textContent = project.description || "No description available.";
    if (imageEl) {
      imageEl.src = project.image;
      imageEl.alt = project.title;
    }
    if (paragraphEl) paragraphEl.innerHTML = project.paragraph || "Additional details will be added soon.";
    if (numberEl) numberEl.textContent = `00${dataArray.indexOf(project) + 1}`; 
  }
}