const query = window.location.search;

const photographerID = new URLSearchParams(query).get('id');

console.log(photographerID);

const dataLink = "/js/data.json";

const table = document.getElementById("cardsTable");

var photographers = [];


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
          displayPhotographerHeader();
      })
});

/* Create Photographers object and push them in an array */
function buildPhotographers(data){
    data.forEach(element => {
      photographers.push(PhotographerFactory.createPhotographer(element.id, element.name, element.city, element.country, element.tags, element.tagline, element.price, element.portrait));
    });
  }

function displayPhotographerHeader(){
    const photographer = photographers.find(element => element.id == photographerID);

    console.log(photographer);

    const header = document.getElementById("header");

    let element = document.createElement("div");
    element.classList.add("photographerCard__text");

    let subelement = document.createElement("h1");
    subelement.classList.add("photographerCard__text__name");
    subelement.innerHTML = photographer.getName();
    element.appendChild(subelement);

    subelement = document.createElement("p");
    subelement.classList.add("photographerCard__text__location");
    subelement.innerHTML = photographer.getCity() + ", " + photographer.getCountry();
    element.appendChild(subelement);

    subelement = document.createElement("p");
    subelement.classList.add("photographerCard__text__description");
    subelement.innerHTML = photographer.getDescription();
    element.appendChild(subelement);

    /* Tags */
    let terelement = document.createElement("div");
    terelement.classList.add("photographerCard__text__filters");

    /* For each tag, create a Node and append it to photographerCard__text__filters */
    photographer.getTags().forEach(tag => {
        subelement = document.createElement("a");
        subelement.classList.add("photographerCard__text__filters__tag");
        subelement.classList.add("tag");
        subelement.innerHTML = "#" + tag;
        terelement.appendChild(subelement);
    });
    element.appendChild(terelement);

    header.appendChild(element);

    subelement = document.createElement("div");
    subelement.classList.add("photographerCard__contact")
    element = document.createElement("a");
    element.classList.add("photographerCard__contact__button");
    element.innerHTML = "Contactez-moi";
    subelement.appendChild(element);
    header.appendChild(subelement);

    element = document.createElement("img");
    element.classList.add("photographerCard__image");
    element.src = "/Ressources/Photographers ID Photos/" + photographer.getPortrait();
    header.appendChild(element);
}