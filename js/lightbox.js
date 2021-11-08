/* eslint-disable no-unused-vars */
function closeLightbox(){
    document.getElementById("lightbox").classList.remove("show");
    document.getElementById("smoke").classList.remove("show");
}

function openLightbox(src, title){
    document.getElementById("lightbox").classList.add("show");
    document.getElementById("smoke").classList.add("show");
    console.log(src);
    console.log(title);

    document.getElementById("lightboxImage").src = src;
    document.getElementById("lightboxTitle").innerHTML = title;
}