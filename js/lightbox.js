/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var TITLE, INDEX;
function closeLightbox(){
    document.getElementById("lightbox").classList.remove("show");
    document.getElementById("smoke").classList.remove("show");

    document.removeEventListener("keydown", navigateLightbox);
}

function openLightbox(src, title){
    document.getElementById("lightbox").classList.add("show");
    document.getElementById("smoke").classList.add("show");

    changeContentLightbox(src, title);
    TITLE = title;
    INDEX = photos.findIndex(element => element.getTitle() == title);

    document.addEventListener("keydown", navigateLightbox);
}

function changeContentLightbox(src, title){
    document.getElementById("lightboxImage").src = "../Ressources/" + photographerID + "/" + src;
    document.getElementById("lightboxTitle").innerHTML = title;
}


function navigateLightbox(event){
    var foundNext = false;
    if(event.key == "ArrowLeft" || event == "ArrowLeft"){
        while(!foundNext){
            INDEX--;
            if(INDEX < 0){
                INDEX = photos.length-1;
            }
            if(photos[INDEX].getImage() != undefined){
                changeContentLightbox(photos[INDEX].getImage(), photos[INDEX].getTitle());
                foundNext = true;
            }
        }
    }
    else if(event.key == "ArrowRight" || event == "ArrowRight"){
        while(!foundNext){
            INDEX++;
            if(INDEX == photos.length){
                INDEX = 0;
            }
            if(photos[INDEX].getImage() != undefined){
                changeContentLightbox(photos[INDEX].getImage(), photos[INDEX].getTitle());
                foundNext = true;
            }
        }
    }
    else if(event.key == "Escape"){
        closeLightbox();
    }
}