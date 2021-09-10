"use strict";

window.addEventListener("DOMContentLoaded", userColorSelect);
//let hexResult = showHex();

function userColorSelect() {
  //Gets the user input
  document.querySelector(".color").addEventListener("input", showSelectedColor);
}

function showSelectedColor() {
  const colorValue = document.querySelector(".color").value;
  console.log(colorValue);

  showHex(colorValue);

  let colorRGB = hexToRgb(colorValue);
  showRgb(colorRGB);

  const rgbCSS = rgbToCss(colorRGB);
  colorBox(rgbCSS);

  let colorHSL = rgbToHsl(colorRGB.r, colorRGB.g, colorRGB.b);
  showHsl(colorHSL);

  const dropDown = document.querySelector("#colorbuttons").value;
  if (dropDown === "analogous") {
    const analogousColors = calculateAnalogous(colorHSL);
    analogueRgb(analogousColors);
  } else if (dropDown === "monochromatic") {
    const monochromaticColors = calculateMonochromatic(colorHSL);
    monochromaticRgb(monochromaticColors);
  } else if (dropDown === "triad") {
    const triadColors = calculateTriad(colorHSL);
    triadRgb(triadColors);
  } else if (dropDown === "complementary") {
    const complementaryColors = calculateComplementary(colorHSL);
    complementaryRgb(complementaryColors);
  }
}

function showHex(colorValue) {
  document.querySelector(".hex").textContent = `HEX: ${colorValue}`;
}

function hexToRgb(color) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  let colorRGB = {
    r: r,
    g: g,
    b: b,
  };
  console.log(colorRGB);
  return colorRGB;
}

function showRgb(colorRGB) {
  let str = `${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}`;
  document.querySelector(".rgb").textContent = `RGB: ${str}`;
}

function rgbToCss(colorRGB) {
  const rgbCSS = `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`;
  return rgbCSS;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return {
    h: h,
    s: s,
    l: l,
  };
}

function showHsl(colorHSL) {
  document.querySelector(
    ".hsl"
  ).textContent = `HSL: ${colorHSL.h}, ${colorHSL.s}, ${colorHSL.l}`;
}

function colorBox(newColor) {
  document.querySelector(".colorboxmain").style.backgroundColor = newColor;
}

function calculateAnalogous(colorHSL) {
  console.log("Calculate Analogous");
  let hslObject = colorHSL;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    console.log(i);
    arrOfColors[i] = Object.assign({}, hslObject);
  }

  arrOfColors[1].h = bringIntoInterval(arrOfColors[1].h + 20, 360);
  arrOfColors[0].h = bringIntoInterval(arrOfColors[0].h + 40, 360);
  arrOfColors[2].h = bringIntoInterval(arrOfColors[2].h + 60, 360);
  arrOfColors[3].h = bringIntoInterval(arrOfColors[3].h + 80, 360);
  console.log(arrOfColors);

  return arrOfColors;
}

function analogueRgb(arrOfColors) {
  console.log(arrOfColors);
  //document.querySelector(".colorbox1").textContent = `HSL: ${arrOfColors[0].h}`;
  document.querySelector(
    ".colorbox1"
  ).style.backgroundColor = `hsl(${arrOfColors[0].h}, ${arrOfColors[0].s}%, ${arrOfColors[0].l}%)`;
  document.querySelector(
    ".colorbox2"
  ).style.backgroundColor = `hsl(${arrOfColors[1].h}, ${arrOfColors[1].s}%, ${arrOfColors[1].l}%)`;
  document.querySelector(
    ".colorbox3"
  ).style.backgroundColor = `hsl(${arrOfColors[2].h}, ${arrOfColors[2].s}%, ${arrOfColors[2].l}%)`;
  document.querySelector(
    ".colorbox4"
  ).style.backgroundColor = `hsl(${arrOfColors[3].h}, ${arrOfColors[3].s}%, ${arrOfColors[3].l}%)`;
}

function calculateMonochromatic(colorHSL) {
  console.log("calcualte monochromatic");
  let hslObject = colorHSL;
  let arrOfColors2 = [];
  for (let i = 0; i < 4; i++) {
    console.log(i);
    arrOfColors2[i] = Object.assign({}, hslObject);
  }
  arrOfColors2[0].s = bringIntoInterval(arrOfColors2[0].s + 10, 100);
  arrOfColors2[1].s = bringIntoInterval(arrOfColors2[1].s + 20, 100);
  arrOfColors2[2].l = bringIntoInterval(arrOfColors2[2].l + 30, 100);
  arrOfColors2[3].l = bringIntoInterval(arrOfColors2[3].l + 40, 100);
  console.log(arrOfColors2);
  return arrOfColors2;
}

function monochromaticRgb(arrOfColors2) {
  document.querySelector(
    ".colorbox1"
  ).style.backgroundColor = `hsl(${arrOfColors2[0].h}, ${arrOfColors2[0].s}%, ${arrOfColors2[0].l}%)`;
  document.querySelector(
    ".colorbox2"
  ).style.backgroundColor = `hsl(${arrOfColors2[1].h}, ${arrOfColors2[1].s}%, ${arrOfColors2[1].l}%)`;
  document.querySelector(
    ".colorbox3"
  ).style.backgroundColor = `hsl(${arrOfColors2[2].h}, ${arrOfColors2[2].s}%, ${arrOfColors2[2].l}%)`;
  document.querySelector(
    ".colorbox4"
  ).style.backgroundColor = `hsl(${arrOfColors2[3].h}, ${arrOfColors2[3].s}%, ${arrOfColors2[3].l}%)`;
}

function calculateTriad(colorHSL) {
  let hslObject = colorHSL;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    console.log(i);
    arrOfColors[i] = Object.assign({}, hslObject);
  }
  //Box 1
  arrOfColors[0].s = bringIntoInterval(arrOfColors[0].s + 60, 360);
  //Box 2
  arrOfColors[1].h = bringIntoInterval(arrOfColors[1].h + 120, 360);

  return arrOfColors;
}

function triadRgb(arrOfColors) {
  document.querySelector(
    ".colorbox1"
  ).style.backgroundColor = `hsl(${arrOfColors[0].h}, ${arrOfColors[0].s}%, ${arrOfColors[0].l}%)`;
  document.querySelector(
    ".colorbox2"
  ).style.backgroundColor = `hsl(${arrOfColors[1].h}, ${arrOfColors[1].s}%, ${arrOfColors[1].l}%)`;
  console.log(arrOfColors);
}

function calculateComplementary(colorHSL) {
  let hslObject = colorHSL;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    console.log(i);
    arrOfColors[i] = Object.assign({}, hslObject);
  }
  arrOfColors[1].s = bringIntoInterval(arrOfColors[1].s + 180, 360);
  console.log(arrOfColors);

  return arrOfColors;
}
function complementaryRgb(arrOfColors) {
  document.querySelector(
    ".colorbox2"
  ).style.backgroundColor = `hsl(${arrOfColors[1].h}, ${arrOfColors[1].s}%, ${arrOfColors[1].l}%)`;
}

function bringIntoInterval(number, max) {
  while (number < 0) {
    number += max;
  }
  return number % max;
}
