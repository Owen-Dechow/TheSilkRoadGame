// @ts-check

import { waitForKeyClick } from "./utils.js";

/**
 * @typedef {Object} GameScreenSettings
 * @property {string} [defaultFont] 
 * @property {HTMLImageElement} dialogBackground
 */

export class GameScreen {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {GameScreenSettings} settings 
     */
    constructor(canvas, settings) {
        this.canvas = canvas;

        const ctx = canvas.getContext("2d");
        if (ctx == null)
            throw Error("Could not get 2d context from canvas");

        this.ctx = ctx;

        /** @type {string} */
        this.backgroundColor = "black";

        /** @type {string} */
        this.defaultFont = settings.defaultFont || "Arial";

        /** @type {number} */
        this.defaultTextSize = 16;

        /** @type {string} */
        this.defaultTextColor = "black";

        /** @type {CanvasTextAlign} */
        this.defaultTextAlign = "start";

        /** @type {CanvasTextBaseline} */
        this.defaultTextBaseline = "alphabetic";

        /** @type {number} */
        this.dialogTextPaddingY = 110;

        /** @type {number} */
        this.dialogTextPaddingX = 150;

        /** @type {number} */
        this.dialogBoxPadding = 15;

        //** @type {HTMLImageElement} */
        this.dialogBackground = settings.dialogBackground;

        this.pointer = "↬";
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {string} c
     */
    drawRect(x, y, w, h, c) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, h);
    }

    /**
     * @param {string} [fill]
     */
    clearBackground(fill) {
        this.drawRect(0, 0, this.canvas.width, this.canvas.height, fill || this.backgroundColor);
    }

    /**
     * @typedef {Object} TextDrawSettings
     * @property {number} [size]
     * @property {string} [font]
     * @property {string} [color]
     * @property {number} [maxWidth]
     * @property {CanvasTextAlign} [textAlign]
     * @property {CanvasTextBaseline} [textBaseline]

     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {TextDrawSettings} [settings]
     */
    drawText(text, x, y, settings) {
        settings = settings || {};

        this.ctx.font = `${settings.size || this.defaultTextSize}px "${settings.font || this.defaultFont}"`;
        this.ctx.fillStyle = settings.color || this.defaultTextColor;
        this.ctx.textAlign = settings.textAlign || this.defaultTextAlign;
        this.ctx.textBaseline = settings.textBaseline || this.defaultTextBaseline;

        const tm = this.ctx.measureText("ljyIY");
        const textHeight = tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent;
        const textSplit = text.replace("\t", "\xA0\xA0\xA0\xA0").split(" ").flatMap(e => e.split(/(\n)/));
        const maxWidth = settings.maxWidth || Infinity;

        let txt = "";
        while (textSplit.length > 0) {
            if (txt.length != 0) txt += " ";

            const w = textSplit.shift();
            const tm = this.ctx.measureText(txt + w);

            if (w) {
                if (tm.width > maxWidth || w == "\n") {
                    this.ctx.fillText(txt, x, y);

                    if (w == "\n") {
                        txt = "";
                        y += textHeight + 10;
                    } else {
                        txt = w;
                        y += textHeight;
                    }
                } else {
                    txt += w;
                }
            } else {
                this.ctx.fillText(txt, x, y);
            }
        }

        if (txt)
            this.ctx.fillText(txt, x, y);

        return y + textHeight + 5;
    }

    /**
     * @param {HTMLImageElement} [image]
     */
    drawDialogBox(image) {
        const w = this.canvas.width - this.dialogBoxPadding * 2;
        const h = this.canvas.height - this.dialogBoxPadding * 2;
        this.ctx.drawImage(image || this.dialogBackground, this.dialogBoxPadding, this.dialogBoxPadding, w, h);
    }

    /**
     * @param {string | null} title
     * @param {string[] | string} text
     */
    async dialog(title, text) {
        if (typeof text == "string")
            text = [text];

        for (const e of text) {
            this.drawDialogBox();

            let y;
            if (title)
                y = this.drawDialogTitle(title);
            else
                y = this.dialogTextPaddingY;

            const textSettings = this.dialogTextSettings();
            this.drawText(e, this.dialogTextPaddingX, y, textSettings);

            this.drawDialogSubNote("Press enter to continue.");

            await waitForKeyClick("Enter");
        }
    }

    dialogTextSettings() {
        /** @type {TextDrawSettings} */
        const textSettings = {
            size: 18,
            textAlign: "start",
            textBaseline: "alphabetic",
            maxWidth: this.canvas.width - this.dialogTextPaddingX * 2 - 10
        };

        return textSettings;
    }

    /**
     * @param {string} title
     */
    drawDialogTitle(title) {
        const textSettings = this.dialogTextSettings();

        textSettings.size = 25;
        textSettings.textBaseline = "top";
        textSettings.textAlign = "center";

        return this.drawText(title, this.canvas.width / 2, this.dialogTextPaddingY, textSettings) + 10;
    }

    /**
     * @param {string} note
     */
    drawDialogSubNote(note) {
        const textSettings = this.dialogTextSettings();

        textSettings.size = 13;
        textSettings.textAlign = "right";
        textSettings.textBaseline = "bottom";

        this.drawText(note,
            this.canvas.width - this.dialogTextPaddingX, this.canvas.height - this.dialogTextPaddingY, textSettings);
    }

    /**
     * @param {string} prompt
     * @param {string[]} opts
     * @returns {Promise<[number, string]>}
     */
    async selectMenu(prompt, opts) {
        let selectedIdx = 0;

        const renderMenu = () => {
            this.drawDialogBox();

            let y = this.drawDialogTitle(prompt);
            const originalY = y;

            const textSettings = this.dialogTextSettings();

            if (opts.length > 10 && textSettings.maxWidth)
                textSettings.maxWidth /= 2;


            let x = this.dialogTextPaddingX + 20;
            opts.forEach((opt, idx) => {
                if (idx == 10) {
                    x += textSettings.maxWidth || Infinity;
                    y = originalY;
                }

                const ny = this.drawText(`${idx + 1}. ${opt}`, x, y, textSettings);

                if (idx == selectedIdx) {
                    this.drawText(this.pointer, x - 20, y, textSettings);
                }

                y = ny;
            });

            this.drawDialogSubNote("Use arrow keys to select option then press enter.");
        };

        renderMenu();

        while (true) {
            const k = await waitForKeyClick(["Enter", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"]);

            if (k == "Enter") {
                return [selectedIdx, opts[selectedIdx]];
            }
            else if (["ArrowDown", "ArrowRight", "s", "d"].includes(k)) {
                selectedIdx += 1;

                if (selectedIdx >= opts.length)
                    selectedIdx = 0;
            } else if (["ArrowUp", "ArrowLeft", "w", "a"].includes(k)) {
                selectedIdx -= 1;
                if (selectedIdx < 0)
                    selectedIdx = opts.length - 1;
            }

            renderMenu();
        }
    }

    /**
     * @param {string} prompt
     */
    async selectBoolMenu(prompt) {
        return (await this.selectMenu(prompt, ["Yes", "No"]))[0] == 0;
    }

    /**
     * @param {string} prompt
     * @param {number} [maxLength]
     */
    async getTextInput(prompt, maxLength) {
        let text = "";

        maxLength = maxLength || Infinity;

        const render = () => {
            this.drawDialogBox();
            let y = this.drawDialogTitle(prompt);
            y = this.drawText(this.pointer + " " + text + "▂", this.dialogTextPaddingX, y);
            this.drawText(text.length + "/" + maxLength, this.dialogTextPaddingX, y);
            this.drawDialogSubNote("Type in response then press enter.");
        };

        const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "x", "y", "z",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z",
            " ", ".", "-", "Enter", "Backspace"];

        while (true) {
            render();

            const k = await waitForKeyClick(keys);

            if (k == "Enter") return text.trim();
            else if (k == "Backspace" && text.length > 0) text = text.slice(0, -1);
            else if (k != "Backspace" && text.length < maxLength) text += k;
        }
    }
}
