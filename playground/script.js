const items = [
  { 
    date: "2021", 
    title: "Cappriccio", 
    description: "Medium: digital", 
    category: "non-interactive", 
    link: "cappriccio/index.html",
    image: "cappriccio/images/cappriccio-1.jpg",
    paragraph:"Digital painting series as a study of color, lines, and textures."
  },
  { 
    date: "2022", 
    title: "Phantasmagoric", 
    description: "Medium: photography",
    category: "non-interactive", 
    link: "phantasmagoric/index.html",
    image: "phantasmagoric/images/phantasmagoric-1.png",
    paragraph:"Photography experiments to illustrate a surreal city environment."
  },
  {  
    date: "2023", 
    title: "Till Success", 
    description: "Processing in Java", 
    category: "interactive", 
    link: "till-success/index.html",
    image: "till-success/images/till-success-0.jpg",
    paragraph:"A runner + word game. The game continues until success."
  },
  { 
    date: "2024", 
    title: "Bloom", 
    description: "HTML, Javascript (p5.js & ml5 library), CSS", 
    category: "interactive", 
    link: "bloom/index.html",
    image: "bloom/images/bloom-0.jpg",
    paragraph:"An interactive art project built with p5.js and ml5.js that allows users to draw flowers on screen using hand detection (via a webcam) or mouse control."
  },
  { 
    date: "2024", 
    title: "Wanted", 
    description: "HTML, Javascript (p5.js library), CSS", 
    category: "interactive", 
    link: "wanted/index.html",
    image: "wanted/images/wanted-0.jpg",
    paragraph:"Interactive game to catch wanted animals generated through a particle system that randomly fall from top of the screen."
  },
];

function renderColumns(filteredItems = items) {
  const container = document.querySelector('.column-container');
  if (!container) return;
  const columnNum = items.length;
  const columns = [];
  for (let i = 0; i < columnNum; i++) { columns.push(''); }
  let i = 0; 
  let columnsHTML = '';

  filteredItems.forEach(function(item) {
    columns[i] += `
        <div class="column-item project" data-category="${item.category}" style="background-image: url('${item.image}');">
          <p class="project-date">${item.date}</p>
          <h2 class="project-title">${item.title}</h2>
          <a href="${item.link}" class="item-link project-link"></a>
        </div>
      `;      
    i = (i + 1) % columnNum; 
  });
  columns.forEach(function(content, i) { columnsHTML += `<div class="column column-${i + 1}">${content}</div>`; });
  container.innerHTML = columnsHTML;
}

function filterColumns(category) {
  renderColumns(category === 'all' ? items : items.filter(item => item.category === category));
  updateFilterBtn(category);
}

renderColumns();