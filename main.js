// @ts-check

import { GameScreen } from "./gameScreen.js";
import { Character } from "./characters.js";
import { awaitResourceLoad, getImage, waitForKeyClick } from "./utils.js";
import { GameMap as GameMap, City, constantinople, cairo, baghdad, tehran, bukhara, samarkand, delhi, beijing, shanghai } from "./map.js";
import { silk, porcelain, tea, pepper, cardamom, cinnamon, wine, oliveoil, glassware, silver, gold, rice, wheat, driedfruit, driedmeat, cheese, honey, Good } from "./goods.js";

const font = new FontFace("MyFont", "url(https://fonts.gstatic.com/s/eaglelake/v26/ptRMTiqbbuNJDOiKj9wG1On4KA.woff2)");
const scroll = getImage("./scroll.webp");

const map = new GameMap("The Silk Road", getImage("./map.webp"), [
    constantinople,
    cairo,
    baghdad,
    tehran,
    bukhara,
    samarkand,
    delhi,
    beijing,
    shanghai,
]);

export const characters = [
    new Character(
        "Indian Spice Dealer",
        [pepper, cardamom, cinnamon],
        "Spices were worth their weight in silver, highly prized for food and medicine.",
        [delhi, tehran, baghdad],
        1451,
        "Medium distance from India to Mesopotamia, often through both land and sea routes.",
        "Once sneezed so hard while measuring pepper, they caused a group of customers to spill their curry all over themselves.",
        150,
    ),
    new Character(
        "Chinese Silk Trader",
        [silk, porcelain, tea],
        "Silk was the prestige commodity of the Silk Road, treasured by nobles and emperors.",
        [shanghai, beijing, bukhara, samarkand],
        1924,
        "Very long journey across deserts and mountains from China into Central Asia.",
        "Once tried to hide bolts of silk under his robe, but the camel coughed and revealed the stash to everyone at the caravanserai.",
        100,
    ),
    new Character(
        "Byzantine Merchant",
        [glassware, wine, oliveoil],
        "Useful everyday goods, but less rare than silk or spices, so profits were steadier but smaller.",
        [constantinople, baghdad, cairo],
        1125,
        "A shorter trip through Mesopotamia then on to Egypt.",
        `Once bragged about their wine being "the best in the empire," only to spill the entire amphora during a toast.`,
        300,
    )
];

document.addEventListener("DOMContentLoaded", async () => {
    /** @type {HTMLCanvasElement | null} */
    const gc = document.querySelector("#game");

    if (gc == null)
        throw new Error("Could not find game canvas.");

    await loadAssets();
    runGame(new GameScreen(gc, { defaultFont: font.family, dialogBackground: scroll }));
});

/**
 * @param {GameScreen} gs
 */
async function runGame(gs) {
    gs.clearBackground();

    while (true) {
        const selection = await gs.selectMenu(
            "The Silk Road Game",
            [
                "Play the silk road game.",
                "Learn about the silk road.",
                "Tips & tricks.",
                "View credits.",
            ]
        );

        await ([playGame, aboutTheSilkRoad, tipsAndTricks, credits])[selection[0]](gs);
    }
}

/**
 * @param {GameScreen} gs
 */
async function playGame(gs) {
    const character = await selectCharacter(gs);
    gs.clearBackground();

    character.name = await gs.getTextInput("What is your name?", 20);
    gs.clearBackground();

    const [startingSilver, startingGold] = [10, 10];
    character.inventory = new Map([
        [silver, startingSilver],
        [gold, startingGold],
        [rice, 0],
        [wheat, 0],
        [driedfruit, 0],
        [driedmeat, 0],
        [cheese, 0],
        [honey, 0],
        [silk, 0],
        [porcelain, 0],
        [tea, 0],
        [pepper, 0],
        [cardamom, 0],
        [cinnamon, 0],
        [wine, 0],
        [oliveoil, 0],
        [glassware, 0],
    ]);

    await showMap(gs, character.stops);
    gs.clearBackground();

    await showInventory(gs, character);
    gs.clearBackground();

    await gs.dialog(
        null,
        "\tBefore you go on your journey, it is important to purchase goods to trade along the way. "
        + "Goods that can be made near your home are cheaper than goods from far away. "
        + "It is a good idea to buy cheap goods because they'll become more valuable as you continue on your way. "
    );

    await market(gs, character, character.stops[0]);
}

/**
 * @param {Character} character
 * @param {City} city
 * @param {GameScreen} gs
 */
async function market(gs, character, city) {
    const validGoods = Good.getPurchasableGoodsAtCity(city);

    while (true) {
        let selected = await gs.selectMenu(
            "What would you like to trade for?",
            [...validGoods.map(x => x.name), "*View Inventory", "*Leave Market"]
        );

        // View inventory
        if (selected[0] == validGoods.length) {
            await showInventory(gs, character);
        }

        // Leave market
        else if (selected[0] > validGoods.length) {
            break;
        }

        // Item
        else {

        }
    }
}

/**
 * @param {GameScreen} gs
 * @returns {Promise<Character>}
 */
async function selectCharacter(gs) {
    while (true) {
        const selection = await gs.selectMenu("Select your character", [...characters.map(e => e.title), "*Find out the differences."]);

        if (selection[0] == characters.length)
            await findOutCharacterDifferences(gs);
        else
            return characters[selection[0]];
    }
}

/**
 * @param {GameScreen} gs
 */
async function findOutCharacterDifferences(gs) {
    await gs.dialog("Character Differences",
        characters.map((e, idx) =>
            `${idx + 1}. ${e.title}\n`
            + `Goods: ${e.getProducts()} (${e.productExplanation}).\n`
            + `Travel: ${e.getTravelList()} (~${e.distance} miles—${e.travelDescription}).\n`
            + e.story
        )
    );
}

/**
 * @param {GameScreen} gs
 */
async function aboutTheSilkRoad(gs) {
    await gs.dialog("About the Silk Road", [
        "\tThe Silk Road was a network of Asian trade routes active from the 2nd century BC "
        + "until the mid-15th century AD. The term 'Silk Road' was coined in the 19th century, "
        + "though many historians prefer 'Silk Routes' to reflect its complexity. Some scholars "
        + "criticize the term for focusing too much on empires at either end of Eurasia and "
        + "overlooking contributions from nomads and civilizations like India and Iran.",

        "\tThe name comes from China’s lucrative silk trade, which began with Han dynasty expansion "
        + "into Central Asia around 114 BC. By the 1st century AD, silk was highly desired in Rome, "
        + "Egypt, and Greece. Other eastern goods included tea, dyes, perfumes, and porcelain, while "
        + "western exports included horses, wine, and gold. Innovations like paper and gunpowder spread "
        + "widely, shaping political history.",

        "\tThe Silk Road operated through periods of upheaval, including the Mongol conquests and the Black Death. "
        + "It was decentralized and dangerous, with threats from bandits and harsh terrain. Few traveled the entire "
        + "route, relying instead on chains of middlemen. Beyond goods, the routes enabled exchanges of religion, "
        + "philosophy, and science, while also spreading diseases such as plague.",
    ]);

    const resources = {
        "Smart History: The Silk Roads": "https://smarthistory.org/reframing-art-history/the-silk-roads/",
        "Wikipedia: Silk Road": "https://en.wikipedia.org/wiki/Silk_Road",
        "Britannica: Silk Road (trade route)": "https://www.britannica.com/topic/Silk-Road-trade-route",
        "National Geographic: ENCYCLOPEDIC ENTRY The Silk Road": "https://education.nationalgeographic.org/resource/silk-road/"
    };

    const keys = Object.keys(resources);

    while (true) {
        const selected = await gs.selectMenu("View additional resources on the Silk Road", [...keys, "*Return to main menu"]);
        if (selected[0] == keys.length)
            break;

        window.open(resources[selected[1]], "_blank");
    }
}


/**
 * @param {GameScreen} gs
 */
async function tipsAndTricks(gs) {

}

/**
 * @param {GameScreen} gs
 */
async function credits(gs) {

}

async function loadAssets() {
    await awaitResourceLoad(font, map.img, scroll);
}

/**
 * @param {GameScreen} gs
 * @param {City | City[]} [highlight]
 */
async function showMap(gs, highlight) {
    const blinkRate = .01;

    const render = () => {
        const t = Date.now();
        map.draw(gs, Math.sin(t * blinkRate) >= 0 ? highlight : undefined);
        gs.drawDialogSubNote("Press enter to continue.");
    };

    await waitForKeyClick("Enter", () => {
        render();
    });
}

/**
 * @param {GameScreen} gs
 * @param {Character} character 
 */
async function showInventory(gs, character) {
    gs.drawDialogBox();
    gs.drawDialogSubNote("Press enter to continue.");

    let capacity = `${character.getWeightCarrying()}/${character.carryingCapacity} lbs`;

    /** @type {string[]} */
    let list = [capacity];
    character.inventory.forEach((v, k) => { list.push(`${k.name} - ${v}`); });
    const y = gs.drawDialogTitle("Inventory");

    gs.drawText(
        list.slice(0, Math.floor(list.length / 2)).join("\n"),
        gs.dialogTextPaddingX, y);

    gs.drawText(
        list.slice(Math.floor(list.length / 2)).join("\n"),
        gs.dialogTextPaddingX + 200, y);

    await waitForKeyClick("Enter");
}
