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
     * @param {City} [dest]
     */
    draw(gs, dest) {
        gs.drawDialogBox(this.img);
        gs.drawDialogTitle(this.title);
        if (!dest) return;

        const w = gs.canvas.width - gs.dialogBoxPadding * 2;
        const h = gs.canvas.height - gs.dialogBoxPadding * 2;
        const x = gs.dialogBoxPadding + w * dest.x;
        const y = gs.dialogBoxPadding + h * dest.y;

        gs.ctx.fillStyle = "black";
        gs.ctx.fillRect(x - 2, y - 2, 11, 11);
        gs.ctx.fillStyle = "skyblue";
        gs.ctx.fillRect(x, y, 7, 7);
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
