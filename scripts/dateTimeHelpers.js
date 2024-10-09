function addLeadingSymbol(value, numberLength = 2, symbol = 0) {
    const reversedValue = value.toString().split('').reverse();
    return Array.from({length: numberLength}, () => symbol)
        .map((num, idx) => reversedValue[idx] ?? num)
        .reverse()
        .join('');
}

function formatWithLeadingSymbols(array, separator) {
    return array.map(timeUnit => addLeadingSymbol(timeUnit)).join(separator);
}
function getFormattedTime(date, separator = ':') {
    return formatWithLeadingSymbols([date.getUTCHours(), date.getMinutes(), date.getSeconds()], separator);
}
function getFormattedDate(date, separator = '/') {
    return formatWithLeadingSymbols([date.getDate(), date.getMonth(), date.getFullYear()], separator);
}
function getFormattedDateTime(date) {
    return `${getFormattedDate(date)}, ${getFormattedTime(date)}`;
}

export const dateTimeHelpers = {
    getFormattedDateTime
}