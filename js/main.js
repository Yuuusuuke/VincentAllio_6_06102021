const dataLink = "./js/data.json";

const table = document.getElementById("cardsTable");

var photographers = [];

/* Filters */
var portrait = false, art = false, fashion = false, architecture = false, travel = false, sport = false, animals = false, events = false;

window.addEventListener("load", () => {
    fetch(dataLink)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(`Une erreur de type ${response.status}  est survenu ! `);
          setTimeout(function loaderAnim() {
            loader.className += " hidden";
          }, 2000);
        }
      })
      .then((data) => {
          buildPhotographers(data.photographers);
          displayAllPhotographers();
      })
});

/* Create Photographers object and push them in an array */
function buildPhotographers(data){
  data.forEach(element => {
    photographers.push(PhotographerFactory.createPhotographer(element.id, element.name, element.city, element.country, element.tags, element.tagline, element.price, element.portrait));
  });
}

/* Display photographers with the filter selected */
function renderFilter(filters){
  photographers.forEach(element => {
    var found = false;
    var count = 0;
      
    while (!found && (count < element.getTags().length)){
      filters.forEach(filter => {
        if (element.getTags()[count] == filter){
          found = true;
        }
        
      });
      count++;
    }
      
    if(found){
      table.appendChild(displayPhotographer(element));
    }
  });
}

function eraseRender(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

function displayAllPhotographers(){
  eraseRender(table);
  photographers.forEach(element => {
    table.appendChild(displayPhotographer(element));
  });
}

function displayPhotographer(data){
  /* Render div */
  var render = document.createElement("div");
  render.classList.add("card");

  /* Image + Name of photographer */
  var element = document.createElement("a");
  element.href = "html/photographer.html?id=" + data.getID();
  var subElement = document.createElement("img");
  subElement.classList.add("card__image");
  subElement.src = "Ressources/Photographers ID Photos/" + data.getPortrait();
  subElement.alt = data.getName() + " picture";
  element.appendChild(subElement);
  subElement = document.createElement("h2");
  subElement.classList.add("card__name");
  subElement.innerHTML = data.getName();
  element.appendChild(subElement);

  render.appendChild(element);
  
  /* Location */
  element = document.createElement("p");
  element.classList.add("card__location");
  element.innerHTML = data.getCity() + ", " + data.getCountry();

  render.appendChild(element);

  /* Description */
  element = document.createElement("p");
  element.classList.add("card__description");
  element.innerHTML = data.getDescription();

  render.appendChild(element);

  /* Price */
  element = document.createElement("p");
  element.classList.add("card__price");
  element.innerHTML = data.getPrice() + "€/jour";

  render.appendChild(element);

  /* Tags */
  element = document.createElement("div");
  element.classList.add("card__links");

  /* For each tag, create a Node and append it to card__links */
  data.getTags().forEach(tag => {
    subElement = document.createElement("a");
    subElement.classList.add("card__links__tag");
    subElement.classList.add("tag");
    subElement.innerHTML = "#" + tag;
    element.appendChild(subElement);
  });

  render.appendChild(element);

  return render;
}