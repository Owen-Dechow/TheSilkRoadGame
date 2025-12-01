// @ts-check

import { City } from "./map.js";
import { Good } from "./goods.js";

export class Character {
    /**
     * @param {string} title
     * @param {Good[]} products
     * @param {string} productExplanation
     * @param {City[]} stops
     * @param {number} distance
     * @param {string} travelDescription
     * @param {string} story
     */
    constructor(title, products, productExplanation, stops, distance, travelDescription, story) {
        /** @type {string} */
        this.title = title;

        /** @type {Good[]} */
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
        const products = this.products.map(p => p.name);

        if (products.length == 1)
            return products[0];

        if (products.length == 2)
            return products.join(" & ");

        return products.slice(0, -1).join(", ") + ", & " + products[products.length - 1];
    }

    getTravelList() {
        return this.stops.map(c => c.name).join("-");
    }
}
