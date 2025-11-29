// @ts-check

import { City } from "./map.js";

export class Character {
    /**
     * @param {string} title
     * @param {string[]} products
     * @param {string} productExplanation
     * @param {City[]} stops
     * @param {number} distance
     * @param {string} travelDescription
     * @param {string} story
     */
    constructor(title, products, productExplanation, stops, distance, travelDescription, story) {
        /** @type {string} */
        this.title = title;

        /** @type {string[]} */
        this.products = products;

        /** @type {string} */
        this.productExplanation = productExplanation.replace(/\.$/, "");

        /** @type {City[]} */
        this.stops = stops;

        /** @type {number} */
        this.distance = distance;

        /** @type {string} */
        this.travelDescription = travelDescription.replace(/\.$/, "");

        /** @type {string} */
        this.story = story;

        /** @type {string} */
        this.name = "";
    }

    getProducts() {
        if (this.products.length == 1)
            return this.products[0];

        if (this.products.length == 2)
            return this.products.join(" & ");

        return this.products.slice(0, -1).join(", ") + ", & " + this.products[this.products.length - 1];
    }

    getTravelList() {
        return this.stops.map(c => c.name).join("-");
    }
}
