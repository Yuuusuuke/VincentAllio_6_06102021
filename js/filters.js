/* Active a filter and display them */
function toggleFilter(filter){
    switch(filter){
      case "portrait":
        portrait = !portrait;
        swapFilterColor(filter, portrait);
        break;
      case "art":
        art = !art;
        swapFilterColor(filter, art);
        break;
      case "fashion":
        fashion = !fashion;
        swapFilterColor(filter, fashion);
        break;
      case "architecture":
        architecture = !architecture;
        swapFilterColor(filter, architecture);
        break;
      case "travel":
        travel = !travel;
        swapFilterColor(filter, travel);
        break;
      case "sport":
        sport = !sport;
        swapFilterColor(filter, sport);
        break;
      case "animals":
        animals = !animals;
        swapFilterColor(filter, animals);
        break;
      case "events":
        events = !events;
        swapFilterColor(filter, events);
        break;
    }
    eraseRender(table);
  
    var listFilters = [];
    if(portrait){listFilters.push("portrait");}
    if(art){listFilters.push("art");}
    if(fashion){listFilters.push("fashion");}
    if(architecture){listFilters.push("architecture");}
    if(travel){listFilters.push("travel");}
    if(sport){listFilters.push("sport");}
    if(animals){listFilters.push("animals");}
    if(events){listFilters.push("events");}
  
    //Render all photographers if every filters are toggled off
    if(!portrait && !art && !fashion && !architecture && !travel && !sport && !animals && !events){
      displayAllPhotographers();
    }
    else{
      renderFilter(listFilters);
    }
}
  
function swapFilterColor(filter, state){
    var elements = document.getElementsByClassName(filter);
    if(state){
      for(var i = 0; i < elements.length; i++){
        elements[i].classList.add("tag--active");
      }
    }
    else{
      for(var i = 0; i < elements.length; i++){
        elements[i].classList.remove("tag--active");
      }
    }
}