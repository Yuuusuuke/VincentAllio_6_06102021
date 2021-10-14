const dataLink = "./js/data.json";

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
          photographers = data;
          displayAllPhotographers();
      })
  });

function renderFilter(filter){
    console.log(filter);
    return 0;
}

function displayAllPhotographers(){
    console.log(photographers);
}
