"use strict";

export default class Product {
    public title: string;
    public price: number;
    public description: string;
    public uri: string;

    constructor(uri: string, title: string, price: number, description: string) {
        this.uri = uri;
        this.title = title;
        this.price = price;
        this.description = description;
    }
}
