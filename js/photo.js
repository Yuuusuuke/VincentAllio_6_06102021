/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const query = window.location.search;

const photographerID = new URLSearchParams(query).get('id');

const dataLink = "../js/data.json";

var photographers = [], photos = [], sorter = ["Popularité", "Date", "Titre"], DDToggle = false;


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
        displayCountPhotographer(photographer);

        sortingImages("Popularité", photos);
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

function displayCountPhotographer(photographer){
  const count = document.getElementById("count");

  var render = document.createElement("div");
  render.classList.add("count__likes");
  var subrender = document.createElement("p");
  subrender.classList.add("count__likes__number");
  subrender.innerHTML = getTotalLikes(photographer);
  render.appendChild(subrender);

  subrender = document.createElement("i");
  subrender.classList.add("fas");
  subrender.classList.add("fa-heart");
  subrender.classList.add("count__likes__icon");
  render.appendChild(subrender);

  count.appendChild(render);

  render = document.createElement("p");
  render.classList.add("count__price");
  render.innerHTML = photographer.getPrice() + "€/jour";

  count.appendChild(render);
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
        subelement.href = "../index.html?filter=" + tag;
        terelement.appendChild(subelement);
    });
    element.appendChild(terelement);

    header.appendChild(element);

    subelement = document.createElement("div");
    subelement.classList.add("photographerCard__contact")
    element = document.createElement("a");
    element.classList.add("photographerCard__contact__button");
    element.innerHTML = "Contactez-moi";
    element.onclick = openFormModal;
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
    element.onclick = openFormModal;
    header.appendChild(element);
}

function displayPictures(photographerID, ListPhoto){
  let location = document.getElementById("photosTable");

  ListPhoto.forEach(element => {
    if((element.getPhotographerID() == photographerID) && (element.getImage() != undefined)){
      console.log(element.getTitle());
      let imgbloc = document.createElement("div");
      imgbloc.classList.add("photos__bloc");
      let render = document.createElement("img");

      render.classList.add("photos__image");
      render.src = "../Ressources/" + photographerID + "/" + element.getImage();

      imgbloc.appendChild(render);

      render = document.createElement("div");
      render.classList.add("photos__description");

      var subrender = document.createElement("p");
      subrender.classList.add("photos__description__title");
      subrender.innerHTML = element.getTitle();
      render.appendChild(subrender);

      subrender = document.createElement("p");
      subrender.classList.add("photos__description__likes");
      subrender.innerHTML = element.getLikes();
      render.appendChild(subrender);

      subrender = document.createElement("i");
      subrender.classList.add("fas");
      subrender.classList.add("fa-heart");
      subrender.classList.add("photos__description__icon");
      render.appendChild(subrender);

      imgbloc.appendChild(render);

      location.appendChild(imgbloc);

    }
  });
}

function erasePictures(){
  let parent = document.getElementById("photosTable");

  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

window.onclick = function(event){
  console.log(event.target);
  if(!event.target.matches('.sorting__dropdown--content') && DDToggle && !event.target.matches(".sorting__dropdown") && !event.target.matches(".sorting__dropdown__button") && !event.target.matches("#DDButton") && !event.target.matches(".fas")){
    closeDropdown("none");
  }
}

function openDropdown(){
  var dropdown = document.getElementById("Dropdown");
  var iconUP = document.getElementById("iconUP");
  var iconDOWN = document.getElementById("iconDOWN");

  if(DDToggle){
    closeDropdown("none");
  }
  else{
    dropdown.classList.add("show");
    iconDOWN.classList.remove("show");
    iconUP.classList.add("show");

    DDToggle = true;
  }
}

function closeDropdown(button){
  var dropdown = document.getElementById("Dropdown");
  var iconUP = document.getElementById("iconUP");
  var iconDOWN = document.getElementById("iconDOWN");

  dropdown.classList.remove("show");
  iconUP.classList.remove("show");
  iconDOWN.classList.add("show");

  DDToggle = false;
  var tmp = [];

  if(button == "first"){
    tmp[0] = sorter[1];
    tmp[1] = sorter[2];
    tmp[2] = sorter[0];

    sorter = tmp;

    displayDropdown();
    sortingImages(sorter[0], photos);
  }
  else if(button == "second"){
    tmp[0] = sorter[2];
    tmp[1] = sorter[0];
    tmp[2] = sorter[1];

    sorter = tmp;

    displayDropdown();
    sortingImages(sorter[0], photos);
  }
}

function displayDropdown(){
  var button = document.getElementById("DDButton"),
    DDfirst = document.getElementById("DDFirst"),
    DDSecond = document.getElementById("DDSecond");
  
  button.innerHTML = sorter[0];
  DDfirst.innerHTML = sorter[1];
  DDSecond.innerHTML = sorter[2];
}

function sortingImages(type, list){
  var renderList = [];

  list.forEach(element => {
    if(element.getPhotographerID() == photographerID){
      renderList.push(element);
    }
  });

  if(type == "Date"){
    renderList.sort(function (a,b){
      return a.getDate() < b.getDate() ? 1 : -1; // -1:1 older to newer | 1:-1 newer to older
    })
  }
  else if(type == "Popularité"){
    renderList.sort(function (a,b){
      return a.getLikes() < b.getLikes() ? 1 : -1; // -1:1 small to bigger | 1:-1 bigger to smaller
    })
  }
  else if(type == "Titre"){
    renderList.sort(function (a,b){
      return a.getTitle().localeCompare(b.getTitle());
    })
  }

  erasePictures();
  displayPictures(photographerID, renderList);
}

function getTotalLikes(photographer){
  var total = 0;
  photos.forEach(element => {
    if(element.getPhotographerID() == photographer.getID()){
      total += element.getLikes();
    }
  });

  return total;
}