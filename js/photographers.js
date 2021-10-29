class Photographer{
    constructor(id, name, city, country, tags, description, price, portrait){
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.description = description;
        this.price = price;
        this.portrait = portrait;
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
}

// eslint-disable-next-line no-unused-vars
const PhotographerFactory = {
    createPhotographer: (id, name, city, country, tags, description, price, portrait) => new Photographer(id, name, city, country, tags, description, price, portrait)
}