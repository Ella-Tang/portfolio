// Project data
const projects = [
  { 
    date: "January, 2023", 
    title: "The Lost Duckling", 
    description: "A video project following a duck bot's journey to rediscover childhood wonder and the feeling of home through a surreal arrival at night.", 
    category: "non-interactive", 
    link: "the-lost-duckling/index.html",
    image: "https://ella-tang.github.io/portfolio/projects/the-lost-duckling/images/screenshot-1.png",
    paragraph: "Inspired by J.D. Salinger’s *The Catcher in the Rye*, the story of \"The Lost Duckling\" draws on Holden Caulfield's curiosity about the ducks in Central Park, symbolizing his yearning to preserve innocence. In a surreal exploration of memory and belonging, the duck bot finds its way to Central Park, where it encounters a yellow rubber duck—an abstract representation of childhood wonder and simplicity."
  },
  { 
    date: 'December, 2023', 
    title: 'Forgotten Futures', 
    description: 'An interactive art project exploring technology’s impact on life and work through a dystopian lens, featuring a video introduction, Rest in Metaverse, and an immersive experience, In Memory of All the Deceased.', 
    category: 'interactive', 
    link: 'forgotten-futures/index.html',
    image: "https://ella-tang.github.io/portfolio/projects/forgotten-futures/images/forgotten-futures-1.png",
    paragraph: "In the year 2046, a time with more advanced technologies, a capitalist-controlled Metaverse becomes the primary workplace. What is hidden inside the sugar-coated metaverse workplace is the labor exploitation that no one can escape from. People have to work day and night like hamsters on a perpetual wheel to sustain themselves. <br><br> As work takes over life, social relationships of people are built more based on virtual identities, and their real-world identities gradually diminish. As a result, death is no longer the end of biological life, but rather the moment when a person's real-world identity is entirely replaced by their virtual identities."
  },
  { 
    date: 'October, 2024', 
    title: 'Wishes Come True', 
    description: 'An interactive art project that invites people to make a wish through a digital candle and a computer.', 
    category: 'interactive', 
    link: 'wishes-come-true/index.html',
    image: "https://ella-tang.github.io/portfolio/projects/wishes-come-true/images/wishes-come-true-1.jpg",
    paragraph: "An interactive art project that invites audiences to make a wish through a digital candle and a computer. After thinking about a wish in deep heart or typing out a wish on computer, audiences can blow out the candle and would receive the best of luck. Wishes are not just on birthdays but everyday. :)"
  },
];

// Render projects
function renderProjects() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  let projectHTML = '';

  projects.forEach(function(project, index) {
    projectHTML += `
      <div class="project" data-category="${project.category}">
      <span class="project-dot">${index + 1}</span>
      <div class="project-content">
      <img src="${project.image}" alt="${project.title} image" class="project-image">
      <h2>${project.title}</h2>
      <p class="project-date">${project.date}</p>
      <p class="project-description">${project.description}</p>
      <a href="${project.link}" class="project-link"></a>
      </div>
      </div>
    `;
  });

  timeline.innerHTML = projectHTML;

  // Focus on the first project by default
  const firstProject = document.querySelector('.project');
  if (firstProject) {
    firstProject.querySelector('.project-dot').classList.add('visible');
    firstProject.querySelector('.project-content').classList.add('focused');
    firstProject.classList.add('focused');
  }
}

// Check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Get project at the center of the viewport
function getClosestToCenter() {
  const projects = document.querySelectorAll('.project');
  let closestProject = null;
  let minDistance = window.innerHeight / 4;
  for (var i = 0; i < projects.length; i++) {
    var rect = projects[i].getBoundingClientRect();
    var distanceToCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
    if (distanceToCenter < minDistance) {
      minDistance = distanceToCenter;
      closestProject = projects[i];
    }
  }
  return closestProject;
}

// Scroll event listener to toggle project visibility
window.addEventListener('scroll', function () {
  const dots = document.querySelectorAll('.project-dot');
  const projectContents = document.querySelectorAll('.project div');
  const projects = document.querySelectorAll('.project');
  // Remove 'visible' and 'focused' classes from all dots, project contents, and vertical lines
  dots.forEach(function(dot) { dot.classList.remove('visible'); });
  projectContents.forEach(function(content) { content.classList.remove('focused'); });
  projects.forEach(function(project) { project.classList.remove('focused'); });
  // Find the project closest to the center
  const closestProject = getClosestToCenter();
  if (closestProject) {
    const dot = closestProject.querySelector('.project-dot');
    const content = closestProject.querySelector('div');
    // Add 'visible' to the dot and 'focused' to the project content and vertical line
    dot.classList.add('visible');
    content.classList.add('focused');
    closestProject.classList.add('focused');
  }
});

// Filter projects by category
function filterProjects(category) {
  const projects = document.querySelectorAll('.project');
  let firstVisibleProject = null;
  projects.forEach(function(project) {
    const projectCategory = project.getAttribute('data-category');
    const isVisible = (category === 'all' || projectCategory === category);
    project.classList.remove('fade-in', 'visible');
    if (isVisible) {
      project.style.display = 'none';
      setTimeout(function() {
        project.style.display = 'flex'; 
        project.classList.add('fade-in'); 
        setTimeout(function() { project.classList.add('visible'); }, 20);
      }, 10);
      if (!firstVisibleProject) firstVisibleProject = project; 
      updateFilterBtn(category);
      } else {
        project.style.display = 'none'; 
        project.classList.remove('fade-in', 'visible');
      }
  });
  // Reset focus on all projects and dots
  resetProjectFocus();
  // Set focus on the first visible project after filtering
  if (firstVisibleProject) {
    const dot = firstVisibleProject.querySelector('.project-dot');
    const content = firstVisibleProject.querySelector('div');   
    dot.classList.add('visible');
    content.classList.add('focused');
    firstVisibleProject.classList.add('focused');
  }
}

// Helper function to remove focus classes from all projects and dots
function resetProjectFocus() {
  var dots = document.querySelectorAll('.project-dot');
  var projectContents = document.querySelectorAll('.project div');
  var projects = document.querySelectorAll('.project');

  dots.forEach(function(dot) { dot.classList.remove('visible'); });
  projectContents.forEach(function(content) { content.classList.remove('focused'); });
  projects.forEach(function(project) { project.classList.remove('focused'); });
}

// Render projects on page load
document.addEventListener("DOMContentLoaded", function() {
  renderProjects();
});