// @ts-check

import { GameScreen } from "./gameScreen.js";

export class Map {
    /**
     * @param {HTMLImageElement} img
     * @param {City[]} cities
     * @param {string} title
     */
    constructor(title, img, cities) {
        /** @type {string} */
        this.title = title;

        /** @type {HTMLImageElement} */
        this.img = img;

        /** @type {City[]} */
        this.cities = cities;
    }

    /**
     * @param {GameScreen} gs
     * @param {City[] | City} [highlight]
     */
    draw(gs, highlight) {
        gs.drawDialogBox(this.img);
        gs.drawDialogTitle(this.title);
        if (!highlight) return;
        if (highlight instanceof City)
            highlight = [highlight];

        const w = gs.canvas.width - gs.dialogBoxPadding * 2;
        const h = gs.canvas.height - gs.dialogBoxPadding * 2;

        highlight.forEach(c => {
            const x = gs.dialogBoxPadding + w * c.x;
            const y = gs.dialogBoxPadding + h * c.y;

            gs.ctx.beginPath();
            gs.ctx.fillStyle = "black";
            gs.ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
            gs.ctx.fill();

            gs.ctx.beginPath();
            gs.ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
            gs.ctx.fillStyle = "skyblue";
            gs.ctx.fill();
        });
    }
}

export class City {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} name
     */
    constructor(name, x, y) {
        /** @type {string} */
        this.name = name;

        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;
    }
}

export const constantinople = new City("Constantinople", 0.220, 0.379);
export const cairo = new City("Cairo", 0.233, 0.478);
export const baghdad = new City("Baghdad", 0.304, 0.445);
export const tehran = new City("Tehran", 0.344, 0.425);
export const bukhara = new City("Bukhara", 0.445, 0.425);
export const samarkand = new City("Samarkand", 0.460, 0.426);
export const delhi = new City("Delhi", 0.504, 0.502);
export const beijing = new City("Beijing", 0.702, 0.375);
export const shanghai = new City("Shanghai", 0.743, 0.436);

