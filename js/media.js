class Media{
    constructor(id, photographer, title, image, tags, likes, date, price){
        this.id = id;
        this.photographer = photographer;
        this.title = title;
        this.image = image;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    getID(){
        return this.id;
    }
    getPhotographerID(){
        return this.photographer;
    }
    getTitle(){
        return this.title;
    }
    getImage(){
        return this.image;
    }
    getTags(){
        return this.tags;
    }
    getLikes(){
        return this.likes;
    }
    getDate(){
        return this.date;
    }
    getPrice(){
        return this.price;
    }
}

const MadiaFactory = {
    createMedia: (id, photographer, title, image, tags, likes, date, price) => new Media(id, photographer, title, image, tags, likes, date, price)
}