// @ts-check

/**
 * @type {string[]}
 */
export let DownKeys = [];

let heldKeys = [];
let holdKeys = false;

document.addEventListener("keydown", e => {
    DownKeys.push(e.key);
});

document.addEventListener("keyup", e => {
    heldKeys.push(e.key);

    if (!holdKeys) releaseHeldKeys();
});

function releaseHeldKeys() {
    heldKeys.forEach(k => {
        DownKeys = DownKeys.filter(e => e != k);
    });

    heldKeys = [];
}

/**
 * @param {() => boolean} predicate
 * @param {number} [interval] 
 */
export function waitUntil(predicate, interval) {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            if (predicate()) {
                clearInterval(intervalId);
                resolve(true);
            }
        }, interval || 100);
    });
}

/**
 * @param {string[] | string} possibleKeys
 * @param {() => void} [callback] 
 * @returns {Promise<string>}
 */
export function waitForKeyClick(possibleKeys, callback) {
    let keyPhases = {};
    holdKeys = true;

    if (typeof possibleKeys == "string")
        possibleKeys = [possibleKeys];

    possibleKeys.forEach(k => { keyPhases[k] = DownKeys.includes(k); });

    return new Promise(resolve => {
        let intervalId = null;
        const fn = () => {
            Object.entries(keyPhases).forEach(([k, v]) => {
                if (v && !DownKeys.includes(k)) {
                    keyPhases[k] = false;
                } else if (!v && DownKeys.includes(k)) {
                    if (intervalId)
                        clearInterval(intervalId);

                    holdKeys = false;
                    resolve(k);
                }
            });

            releaseHeldKeys();
            if (callback) callback();
        };

        fn();
        intervalId = setInterval(fn, 10);
    });
}

/**
 * @param {string} url
 */
export function getImage(url) {
    const img = new Image();
    img.src = url;

    return img;
}

/**
 * @param {HTMLImageElement} img
 */
function loadImage(img) {
    return new Promise((resolve, reject) => {
        if (img.complete && img.naturalWidth !== 0) {
            resolve(img);
        } else {
            img.onload = () => resolve(img);
            img.onerror = reject;
        }
    });
}

/**
 * @param {(HTMLImageElement | FontFace)[]} resources
 */
export async function awaitResourceLoad(...resources) {
    for (const r of resources) {
        if (r instanceof HTMLImageElement) await loadImage(r);
        if (r instanceof FontFace) { await r.load(); document.fonts.add(r); };
    }
}

