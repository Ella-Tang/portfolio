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

if (window.location.pathname.endsWith("index.html")) {
  window.location.replace(window.location.pathname.replace("index.html", ""));
}

(function() {
  let link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = "/favicon.png";
  document.head.appendChild(link);
})();

function hideOriginalCursor() {
  document.body.style.cursor = "none";
  document.querySelectorAll("*").forEach((e) => { e.style.cursor = "none"; });
}

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
      document.querySelectorAll('.fade-in').forEach(function (e) { e.classList.add('visible'); });
    }, 100);
}, 300); 
});

// Custom cursor
function setupCustomCursor() {
  hideOriginalCursor();
  let cursor = document.querySelector(".custom-cursor");
  if (!cursor) {
    cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);
  }

  document.addEventListener('mousemove', function (e) {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  document.querySelectorAll('.cursor-element').forEach(function (e) {
    e.addEventListener('mouseenter', function () { cursor.classList.add('hovering'); });
    e.addEventListener('mouseleave', function () { cursor.classList.remove('hovering'); });
  });

  document.querySelectorAll('.cursor-element, p, span, h1, h2, h3, h4, h5, h6, strong, em, a').forEach((e) => {
    e.addEventListener('mouseenter', () => {
      if (!e.closest('.artwork-hover')) {
        cursor.classList.add('difference');
      }
    });

    e.addEventListener('mouseleave', () => {
      cursor.classList.remove('difference');
    });
  });

  document.addEventListener("mousedown", () => { 
    hideOriginalCursor();
    cursor.classList.add('click'); 
  });

  document.addEventListener("mouseup", () => { 
    hideOriginalCursor();
    cursor.classList.remove('click'); 
  });

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hideOriginalCursor();
      cursor.style.display = "none"; 
    });
  });
}

function applyCursorDifference() {
  document.querySelectorAll('.nav-button', 'p, span, h1, h2, h3, h4, h5, h6, strong, em').forEach((e) => {
    e.addEventListener('mouseenter', () => cursor.classList.add('difference'));
    e.addEventListener('mouseleave', () => cursor.classList.remove('difference'));
  });
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
    if (category == 'all' && buttonCategory == 'show all' || buttonCategory == category) {
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