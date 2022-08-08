"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssBoxShadow = void 0;
const toNumber = (v) => isFinite(+v) ? +v : v;
const parseUnit = (v) => {
    const match = v.match(/^(0?[-.]?\d+)(r?e[m|x]|v[h|w|min|max]+|p[x|t|c]|[c|m]m|%|s|in|ch)$/);
    const res = match ? parseFloat(match[1]) || match[1] : v;
    return toNumber(res);
};
const boxShadowParse = (string) => string.split(/\s(?![^(]*\))/).map((v) => parseUnit(v));
const getColor = (values) => values.find((v) => !isFinite(+v));
const cssBoxShadow = (stringBoxShadows) => stringBoxShadows.split(/,(?![^\(]*\))/).map(stringBoxShadow => {
    const inset = stringBoxShadow.includes("inset");
    stringBoxShadow = stringBoxShadow.replace("inset", "").trim();
    const valuesParsed = boxShadowParse(stringBoxShadow);
    const color = getColor(valuesParsed);
    const [x, y, blur, spread] = valuesParsed.filter((v) => v !== color);
    return { inset, x, y, blur, spread, color };
});
exports.cssBoxShadow = cssBoxShadow;
