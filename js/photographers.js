class Photographer{
    constructor(id, name, city, country, tags, description, price, portrait, altText){
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.description = description;
        this.price = price;
        this.portrait = portrait;
        this.altText = altText;
    }

    getID(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getCity(){
        return this.city;
    }
    getCountry(){
        return this.country;
    }
    getTags(){
        return this.tags;
    }
    getDescription(){
        return this.description;
    }
    getPrice(){
        return this.price;
    }
    getPortrait(){
        return this.portrait;
    }
    getAltText(){
        return this.altText;
    }
}

// eslint-disable-next-line no-unused-vars
const PhotographerFactory = {
    createPhotographer: (id, name, city, country, tags, description, price, portrait, altText) => new Photographer(id, name, city, country, tags, description, price, portrait, altText)
}