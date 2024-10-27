function capitalizeFirstLetter(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function firstLetterToLowerCase(word) {
    return word.slice(0, 1).toLowerCase() + word.slice(1);
}

function toKebabCase(word) {
    return [word[0].toLowerCase(), ...word.split('').slice(1).map(letter => /[A-Z]/.test(letter) ? `-${letter.toLowerCase()}` : letter.toLowerCase())].join('');
}

export const stringFormatHelpers = {
    capitalizeFirstLetter,
    firstLetterToLowerCase,
    toKebabCase
}
