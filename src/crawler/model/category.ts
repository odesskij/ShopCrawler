"use strict";

import Product from "./product";

export default class Category {
    public title: string;
    public children: Category[] | Product[];
    public uri: string;

    constructor(uri: string, title: string, children: Category[] | Product[]) {
        this.uri = uri;
        this.title = title;
        this.children = children;
    }
}
