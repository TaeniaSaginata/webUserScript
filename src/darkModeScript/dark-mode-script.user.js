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
    "border-color": 'black',
    height: '1.8em',
    "border-radius": '1em',
    border: '1px solid #ededed',
    "font-size": '0.75em',
    "font-weight": '600',
    color: 'black',
};


function setDarkModeText(tag) {
    tag.innerHTML = !isLightMode() ? 'Light Mode' : 'Dark Mode';
}


var btn = document.createElement('button');
btn.id = 'dark-mode-btn';

setDarkModeText(btn);

btn.onclick = () => {
    toggleDarkMode();
    setDarkModeText(btn);
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

