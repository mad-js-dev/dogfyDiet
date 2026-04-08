import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read JSON palette data
const paletteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/styles/colors/palette.json'), 'utf8'));

// Generate CSS variables
let css = ':root {\n';

// Generate base color variables from palette data
css += '\n  /* Base color variables */\n';
const baseColors = paletteData['base-brand-colors'];
Object.entries(baseColors).forEach(([colorName, hexValue]) => {
  // Generate tonal palette for each base color
  const baseHex = hexValue;
  css += `  --${colorName}-0: #000000;\n`;
  css += `  --${colorName}-10: ${adjustColor(baseHex, -60, -10)};\n`;
  css += `  --${colorName}-20: ${adjustColor(baseHex, -45, -5)};\n`;
  css += `  --${colorName}-30: ${adjustColor(baseHex, -30, -2)};\n`;
  css += `  --${colorName}-40: ${adjustColor(baseHex, -20, 0)};\n`;
  css += `  --${colorName}-50: ${adjustColor(baseHex, -10, 0)};\n`;
  css += `  --${colorName}-60: ${baseHex};\n`;
  css += `  --${colorName}-70: ${adjustColor(baseHex, 15, 0)};\n`;
  css += `  --${colorName}-80: ${adjustColor(baseHex, 30, 0)};\n`;
  css += `  --${colorName}-90: ${adjustColor(baseHex, 50, 0)};\n`;
  css += `  --${colorName}-95: ${adjustColor(baseHex, 65, -20)};\n`;
  css += `  --${colorName}-98: ${adjustColor(baseHex, 80, -40)};\n`;
  css += `  --${colorName}-99: ${adjustColor(baseHex, 90, -60)};\n`;
  css += `  --${colorName}-100: #ffffff;\n`;
});

// Also generate semantic colors
const semanticColors = paletteData['base-semantic-colors'];
Object.entries(semanticColors).forEach(([colorName, hexValue]) => {
  const baseHex = hexValue;
  css += `  --${colorName}-0: #000000;\n`;
  css += `  --${colorName}-10: ${adjustColor(baseHex, -60, -10)};\n`;
  css += `  --${colorName}-20: ${adjustColor(baseHex, -45, -5)};\n`;
  css += `  --${colorName}-30: ${adjustColor(baseHex, -30, -2)};\n`;
  css += `  --${colorName}-40: ${adjustColor(baseHex, -20, 0)};\n`;
  css += `  --${colorName}-50: ${adjustColor(baseHex, -10, 0)};\n`;
  css += `  --${colorName}-60: ${baseHex};\n`;
  css += `  --${colorName}-70: ${adjustColor(baseHex, 15, 0)};\n`;
  css += `  --${colorName}-80: ${adjustColor(baseHex, 30, 0)};\n`;
  css += `  --${colorName}-90: ${adjustColor(baseHex, 50, 0)};\n`;
  css += `  --${colorName}-95: ${adjustColor(baseHex, 65, -20)};\n`;
  css += `  --${colorName}-98: ${adjustColor(baseHex, 80, -40)};\n`;
  css += `  --${colorName}-99: ${adjustColor(baseHex, 90, -60)};\n`;
  css += `  --${colorName}-100: #ffffff;\n`;
});

// Generate neutral colors
const neutralHex = paletteData['base-brand-colors']['neutral'];
css += `  --neutral-0: #000000;\n`;
css += `  --neutral-10: ${adjustColor(neutralHex, -60, -10)};\n`;
css += `  --neutral-20: ${adjustColor(neutralHex, -45, -5)};\n`;
css += `  --neutral-30: ${adjustColor(neutralHex, -30, -2)};\n`;
css += `  --neutral-40: ${adjustColor(neutralHex, -20, 0)};\n`;
css += `  --neutral-50: ${adjustColor(neutralHex, -10, 0)};\n`;
css += `  --neutral-60: ${neutralHex};\n`;
css += `  --neutral-70: ${adjustColor(neutralHex, 15, 0)};\n`;
css += `  --neutral-80: ${adjustColor(neutralHex, 30, 0)};\n`;
css += `  --neutral-85: ${adjustColor(neutralHex, 40, 0)};\n`;
css += `  --neutral-90: ${adjustColor(neutralHex, 50, 0)};\n`;
css += `  --neutral-95: ${adjustColor(neutralHex, 65, -20)};\n`;
css += `  --neutral-98: ${adjustColor(neutralHex, 80, -40)};\n`;
css += `  --neutral-99: ${adjustColor(neutralHex, 90, -60)};\n`;
css += `  --neutral-100: #ffffff;\n`;

// Helper function to generate a specific tone from a base color
function adjustColor(hex, lightness, saturation) {
  return generateTone(hex, getToneFromAdjustment(lightness, saturation));
}

// Helper function to map lightness/saturation adjustments to tone numbers
function getToneFromAdjustment(lightness, saturation) {
  const toneMap = {
    '-60,-10': 10,
    '-45,-5': 20,
    '-30,-2': 30,
    '-20,0': 40,
    '-10,0': 50,
    '0,0': 60,
    '15,0': 70,
    '30,0': 80,
    '50,0': 90,
    '65,-20': 95,
    '80,-40': 98,
    '90,-60': 99,
    '100,0': 100
  };
  
  const key = `${lightness},${saturation}`;
  return toneMap[key] || 60;
}

// Function to generate a specific tone from a base color (replicating Sass logic)
function generateTone(baseColor, tone) {
  // Convert hex to RGB
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / (2 * 255);

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (510 - max - min) : d / (max + min);
    // Ensure saturation is non-negative
    s = Math.max(0, s);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Apply tone adjustments (based on M3 tonal palette)
  const adjustments = {
    0: { lightness: -100, saturation: 0 },
    10: { lightness: -60, saturation: -10 },
    20: { lightness: -45, saturation: -5 },
    30: { lightness: -30, saturation: -2 },
    40: { lightness: -20, saturation: 0 },
    50: { lightness: -10, saturation: 0 },
    60: { lightness: 0, saturation: 0 },
    70: { lightness: 15, saturation: 0 },
    80: { lightness: 30, saturation: 0 },
    90: { lightness: 40, saturation: -15 },
    95: { lightness: 48, saturation: -35 },
    98: { lightness: 55, saturation: -55 },
    99: { lightness: 60, saturation: -75 },
    100: { lightness: 100, saturation: 0 }
  };

  const adj = adjustments[tone] || { lightness: 0, saturation: 0 };
  let newL = Math.max(0, Math.min(1, l + adj.lightness / 100));
  let newS = Math.max(0, Math.min(1, s + adj.saturation / 100));

  // Prevent colors from becoming pure white unless they're tone 100
  // Allow more subtle differences between light tones
  if (tone < 100 && newL > 0.98) {
    newL = 0.98;
  }

  // Convert back to RGB
  if (newS === 0) {
    // For neutral colors, ensure proper differentiation between light tones
    let grayValue;
    if (tone === 98) {
      grayValue = 250; // #fafafa
    } else if (tone === 99) {
      grayValue = 252; // #fcfcfc  
    } else {
      grayValue = Math.round(newL * 255);
    }
    const result = `#${grayValue.toString(16).padStart(2, '0').repeat(3)}`;
    return result;
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = newL < 0.5 ? newL * (1 + newS) : newL + newS - newL * newS;
  const p = 2 * newL - q;
  const newR = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const newG = Math.round(hue2rgb(p, q, h) * 255);
  const newB = Math.round(hue2rgb(p, q, h - 1/3) * 255);

  const result = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  return result;
}

// Generate light theme roles
css += '\n  /* Light theme roles */\n';
Object.entries(paletteData['light-roles']).forEach(([category, roles]) => {
  if (typeof roles === 'object' && roles !== null) {
    Object.entries(roles).forEach(([role, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subRole, subValue]) => {
          css += `  --md3-${category}-${role}-${subRole}: ${subValue};\n`;
        });
      } else {
        css += `  --md3-${category}-${role}: ${value};\n`;
      }
    });
  }
});

// Generate semantic colors
css += '\n  /* Semantic colors */\n';
Object.entries(paletteData['semantic-roles']).forEach(([semantic, roles]) => {
  Object.entries(roles).forEach(([role, value]) => {
    css += `  --md3-${semantic}-${role}: ${value};\n`;
  });
});

css += '}\n\n';

// Generate dark theme
css += '[data-theme="dark"] {\n';
Object.entries(paletteData['dark-roles']).forEach(([category, roles]) => {
  if (typeof roles === 'object' && roles !== null) {
    Object.entries(roles).forEach(([role, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subRole, subValue]) => {
          css += `  --md3-${category}-${role}-${subRole}: ${subValue};\n`;
        });
      } else {
        css += `  --md3-${category}-${role}: ${value};\n`;
      }
    });
  }
});
css += '}\n';

// Write to CSS file
fs.writeFileSync(path.join(__dirname, '../assets/styles/_css-variables-generated.css'), css);

console.log('CSS variables generated successfully!');
