// ==UserScript==
// @name        Dark Mode univie.ac.at
// @namespace   Violentmonkey Scripts
// @match       https://moodle.univie.ac.at/*
// @grant       none
// @version     1.0
// @author      Tapeworm
// @description 08/10/2024, 23:12:41
// ==/UserScript==


const DARK_COLOR = 'rgb(22, 22, 22)';
const WHITE_COLOR = 'rgb(242, 242, 242)';
const HOOK_ID = 'usernavigation';

const moonSVG = (width, color) => (
    `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="${width ?? 2}em" height="${width ?? 2}em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill=${color ?? "#1C274C"} />
    </svg>`
);

const sunSVG = (width, color) => (
    `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="${width ?? 2}em" height="${width ?? 2}em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 3V5.25H11.25V3H12.75Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12.75L18.75 12.75L18.75 11.25L21 11.25L21 12.75Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8943 6.16637L17.3033 7.75736L16.2426 6.6967L17.8336 5.10571L18.8943 6.16637Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8336 18.8944L16.2426 17.3034L17.3033 16.2428L18.8943 17.8337L17.8336 18.8944Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 18.75V21H11.25V18.75H12.75Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 12.75L3 12.75L3 11.25L5.25 11.25L5.25 12.75Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75732 17.3033L6.16633 18.8943L5.10567 17.8337L6.69666 16.2427L7.75732 17.3033Z" fill=${color ?? "#080341"} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69666 7.75744L5.10567 6.16645L6.16633 5.10579L7.75732 6.69678L6.69666 7.75744Z" fill=${color ?? "#080341"} />
    </svg>`
);

function numberToHexString(num) {
    const BASE = 16;
    const HEX_NUMBERS = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

    let current = num;
    const store = [];

    do {
        store.push(Math.trunc(current % BASE));
        current = Math.floor(current / BASE );
    } while (current > 0)

    const result = store.reverse().map(numm => HEX_NUMBERS[numm]).join('');
    return result.length % 2 !== 0 ? '0' + result : result;
}

function rgbToHex(rgb) {
   return '#' + rgb.split(/[rgb.?(|,|)]/g)
       .filter(num => num !== "")
       .map(num => numberToHexString(Number(num.trim())).toString())
       .join('');
}

// toggle dark mode

function isLightMode() {
    return document.querySelector('body>*').style.backgroundColor === '';
}

function toggleDarkMode() {
    const elements = document.querySelectorAll('body *');

    isLightMode()
        ? elements.forEach(element => element.style.cssText = `background-color: ${DARK_COLOR} !important; color: ${WHITE_COLOR} !important;`)
        : elements.forEach(element => element.style.cssText = '');
}


// create button

const darkModeButtonCSS = {
    display: "flex",
    "border-color": 'black',
    "min-height": '1.8em',
    "border-radius": '1em',
    border: '1px solid #ededed',
    "font-size": '0.75em',
    "font-weight": '600',
    color: 'black',
};


function setModeInfo(tag) {
    //tag.innerHTML = !isLightMode() ? 'Light Mode' : 'Dark Mode';
    tag.innerHTML = !isLightMode() ? moonSVG(2, rgbToHex(WHITE_COLOR)) : sunSVG(2, rgbToHex(DARK_COLOR));
}


var btn = document.createElement('button');
btn.id = 'dark-mode-btn';


btn.onclick = () => {
    toggleDarkMode();
    setModeInfo(btn);
};


// create wrapper

const darkModeButtonWrapperCSS = {
    display: 'flex',
    "align-items": 'center',
};

var _div = document.createElement('div');
_div.id = 'dark-mode-btn-wrapper';
_div.appendChild(btn);

document.getElementById(HOOK_ID).appendChild(_div);


// add styles to dom
function transformToCssText(prefix = '', className, cssObject) {
    const css = JSON.stringify(cssObject).replace(/["{}]/g, '').replace(/,/g, ';') + ';';
    return `${prefix}${className} {${css}}`;
}

const css = transformToCssText('#', 'dark-mode-btn', darkModeButtonCSS) + transformToCssText('#', 'dark-mode-btn-wrapper', darkModeButtonWrapperCSS);
var style = document.createElement('style');

style.innerHTML = css;

document.head.appendChild(style);

toggleDarkMode();
setModeInfo(btn);
