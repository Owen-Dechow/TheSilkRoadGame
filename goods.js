// @ts-check

import { baghdad, beijing, bukhara, cairo, City, constantinople, delhi, samarkand, shanghai, tehran } from "./map.js";

export class Good {
    /**
     * @param {string} name
     * @param {Map<City, number>} purchaseValues
     */
    constructor(name, purchaseValues) {
        /** @type {string} */
        this.name = name;

        /** @type {Map<City, number>} */
        this.values = purchaseValues;
    }
}


// Luxury Goods
export const silk = new Good(
    "Silk",
    new Map([
        [beijing, 5], [shanghai, 6], [samarkand, 8], [bukhara, 9],
        [tehran, 11], [baghdad, 12], [cairo, 14], [constantinople, 15], [delhi, 10]
    ]),
);

export const porcelain = new Good(
    "Porcelain",
    new Map([
        [beijing, 6], [shanghai, 7], [samarkand, 10], [bukhara, 11],
        [tehran, 13], [baghdad, 14], [cairo, 16], [constantinople, 17], [delhi, 12]
    ]),
);

export const tea = new Good(
    "Tea",
    new Map([
        [beijing, 4], [shanghai, 5], [samarkand, 8], [bukhara, 9],
        [tehran, 11], [baghdad, 12], [cairo, 13], [constantinople, 14], [delhi, 8]
    ]),
);

export const pepper = new Good(
    "Pepper",
    new Map([
        [delhi, 5], [tehran, 7], [baghdad, 9], [cairo, 11],
        [constantinople, 13], [samarkand, 7], [bukhara, 7], [beijing, 10], [shanghai, 10]
    ]),
);

export const cardamom = new Good(
    "Cardamom",
    new Map([
        [delhi, 6], [tehran, 8], [baghdad, 10], [cairo, 12],
        [constantinople, 14], [samarkand, 8], [bukhara, 8], [beijing, 11], [shanghai, 11]
    ]),
);

export const cinnamon = new Good(
    "Cinnamon",
    new Map([
        [delhi, 7], [tehran, 9], [baghdad, 11], [cairo, 13],
        [constantinople, 15], [samarkand, 9], [bukhara, 9], [beijing, 12], [shanghai, 12]
    ]),
);

export const wine = new Good(
    "Wine",
    new Map([
        [constantinople, 6], [cairo, 7], [baghdad, 8], [tehran, 9],
        [samarkand, 11], [bukhara, 11], [delhi, 9], [beijing, 11], [shanghai, 11]
    ]),
);

export const oliveoil = new Good(
    "Olive Oil",
    new Map([
        [constantinople, 7], [cairo, 7], [baghdad, 8], [tehran, 9],
        [samarkand, 10], [bukhara, 10], [delhi, 11], [beijing, 12], [shanghai, 12]
    ]),
);

export const glassware = new Good(
    "Glassware",
    new Map([
        [constantinople, 8], [cairo, 6], [baghdad, 7], [tehran, 5],
        [samarkand, 4], [bukhara, 5], [delhi, 6], [beijing, 7], [shanghai, 7]
    ]),
);


// Metals
export const silver = new Good(
    "Silver",
    new Map([
        [constantinople, 1], [cairo, 1], [baghdad, 1], [tehran, 1],
        [samarkand, 1], [bukhara, 1], [delhi, 1], [beijing, 1], [shanghai, 1]
    ]),
);

export const gold = new Good(
    "Gold",
    new Map([
        [constantinople, 10], [cairo, 10], [baghdad, 10], [tehran, 10],
        [samarkand, 10], [bukhara, 10], [delhi, 10], [beijing, 10], [shanghai, 10]
    ]),
);

// Food
export const rice = new Good(
    "Rice",
    new Map([
        [delhi, 3], [tehran, 5], [baghdad, 6], [cairo, 7],
        [constantinople, 8], [samarkand, 5], [bukhara, 5], [beijing, 4], [shanghai, 4]
    ]),
);

export const wheat = new Good(
    "Wheat",
    new Map([
        [constantinople, 5], [cairo, 6], [baghdad, 7], [tehran, 8],
        [samarkand, 7], [bukhara, 7], [delhi, 4], [beijing, 5], [shanghai, 5]
    ]),
);

export const driedfruit = new Good(
    "Dried Fruit",
    new Map([
        [samarkand, 4], [bukhara, 5], [baghdad, 7], [cairo, 8],
        [constantinople, 9], [tehran, 6], [delhi, 5], [beijing, 6], [shanghai, 6]
    ]),
);

export const driedmeat = new Good(
    "Dried Meat",
    new Map([
        [samarkand, 4], [bukhara, 5], [baghdad, 6], [cairo, 7],
        [constantinople, 8], [tehran, 6], [delhi, 5], [beijing, 6], [shanghai, 6]
    ]),
);

export const cheese = new Good(
    "Cheese",
    new Map([
        [constantinople, 6], [cairo, 7], [baghdad, 8], [tehran, 9],
        [samarkand, 7], [bukhara, 7], [delhi, 5], [beijing, 6], [shanghai, 6]
    ]),
);

export const honey = new Good(
    "Honey",
    new Map([
        [delhi, 4], [tehran, 6], [baghdad, 7], [cairo, 8],
        [constantinople, 9], [samarkand, 6], [bukhara, 6], [beijing, 7], [shanghai, 7]
    ]),
);

