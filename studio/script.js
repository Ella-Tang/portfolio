// Artworks data
const artworks = [
  { date: "2023", 
    title: "Inner Beast", 
    description: "Medium: Neon light installation",
    link: "inner-beast/index.html", 
    image: "../../studio/inner-beast/images/inner-beast-1.jpg", 
    paragraph: "A neon light installation with red and blue glow, depicting an abstract dinosaur figure that symbolizes the self contained within its environment." 
  },
  { date: "2022", 
    title: "Creature", 
    description: "Medium: Ceramics sculpture",
    link: "creature/index.html", 
    image: "../../studio/creature/images/creature-1.jpg", 
    paragraph: "A sculpture designed for a fictional festival, the nocturnal festival. " 
  },
  { date: "2022", 
    title: "Refuge", 
    description: "Medium: Welded metal, found fluffy bear toy, light torch",
    link: "refuge/index.html", 
    image: "../../studio/refuge/images/refuge-1.jpg", 
    paragraph: "A mixed media installation, symbolizing childhood innocence as a safe haven from adult realities." 
  },
  { date: "2022", 
    title: "Fluttering", 
    description: "Medium: paper, cardboard, arduino, servo motor",
    link: "fluttering/index.html", 
    image: "../../studio/fluttering/images/fluttering-1.png", 
    paragraph: "A kinetic sculpture combining paper engineering with electronics. Powered by a servo motor and a microcontroller, this work resembles the motion of fluttering." 
  },
  { date: "2020", 
    title: "Sweet Potato", 
    description: "Medium: Oil on canvas, found human miniatures",
    link: "sweet-potato/index.html", 
    image: "../../studio/sweet-potato/images/sweet-potato-1.jpg", 
    paragraph: "A painting portraying a dystopian society where people entertain themselves to death." 
  },
  { date: "2020-2021", 
    title: "Portraiture", 
    description: "Medium: variable",
    link: "portraiture/index.html", 
    image: "../../studio/portraiture/images/self-portrait-2.jpg", 
    paragraph: "Portraiture from 2020 to 2021." 
  },
  { date: "2020-2021", 
    title: "Still Life", 
    description: "Medium: variable",
    link: "still-life/index.html", 
    image: "../../studio/still-life/images/silence.jpg", 
    paragraph: "Still-life from 2020 to 2021." 
  },
  { date: "2017-2018", 
    title: "Two Cities", 
    description: "Medium: engraving",
    link: "two-cities/index.html", 
    image: "../../studio/two-cities/images/sh-1.jpg", 
    paragraph: "Engraving portraying two different cities: Shanghai and New York City." 
  }
];

// Render artworks
function renderArtworks() {
const artworkGrid = document.getElementById("artworkGrid");
let artworkHTML = '';

artworks.forEach(function(artwork) {
  artworkHTML += `
    <div class="artwork">
      <a href="${artwork.link}" class="artwork" style="background-image: url('${artwork.image}');">
      <div class="artwork-content">
        <p class="project-date">${artwork.date}</p>
        <h2 class="project-title">${artwork.title}</h2>
      </div>
      </a>
  </div>
    `;
});

artworkGrid.innerHTML = artworkHTML;
}

document.addEventListener("DOMContentLoaded", renderArtworks);