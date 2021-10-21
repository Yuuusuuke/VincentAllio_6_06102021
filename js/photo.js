const query = window.location.search;

const photographerID = new URLSearchParams(query).get('id');

const dataLink = "../js/data.json";

var photographers = [], photos = [];


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
        buildPictures(data.media);
        const photographer = photographers.find(element => element.id == photographerID);
        displayPhotographerHeader(photographer);

        displayPictures(photographer.getID(), photos);
      })
});

/* Create Photographers object and push them in an array */
function buildPhotographers(data){
  data.forEach(element => {
    photographers.push(PhotographerFactory.createPhotographer(element.id, element.name, element.city, element.country, element.tags, element.tagline, element.price, element.portrait));
  });
}

function buildPictures(data){
  data.forEach(element => {
    photos.push(MediaFactory.createMedia(element.id, element.photographerId, element.title, element.image, element.tags, element.likes, element.date, element.price));
  });
}

function displayPhotographerHeader(photographer){
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
    element.src = "../Ressources/Photographers ID Photos/" + photographer.getPortrait();
    header.appendChild(element);

    element = document.createElement("a");
    element.classList.add("photographerCard__contact__button");
    element.classList.add("photographerCard__contact--fixed");
    element.innerHTML = "Contactez-moi";
    header.appendChild(element);
}

function displayPictures(photographerID, ListPhoto){
  console.log(photographerID);

  let location = document.getElementById("photosTable");

  ListPhoto.forEach(element => {
    if((element.getPhotographerID() == photographerID) && (element.getImage() != undefined)){
      console.log(element.getImage());
      let render = document.createElement("img");
      render.classList.add("photos__image");
      render.src = "../Ressources/" + photographerID + "/" + element.getImage();
      location.appendChild(render);
    }
  });
}