import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read JSON palette data
const paletteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/styles/colors/palette.json'), 'utf8'));

// Generate CSS variables
let css = ':root {\n';

// Function to generate color variables using individual palette adjustments
function generateColorVariables(colorData, category) {
  css += `\n  /* ${category} color variables */\n`;
  Object.entries(colorData).forEach(([colorName, colorConfig]) => {
    const baseHex = colorConfig.color;
    const palette = colorConfig.palette;
    
    css += `  --${colorName}-0: #000000;\n`;
    
    // Generate tones 0-100 using individual palette adjustments
    const tones = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '95', '98', '99'];
    tones.forEach(tone => {
      const adjustment = palette[tone];
      if (adjustment) {
        const lightness = parseInt(adjustment.lightness);
        const saturation = adjustment.saturation ? parseInt(adjustment.saturation) : 0;
        css += `  --${colorName}-${tone}: ${adjustColor(baseHex, lightness, saturation)};\n`;
      }
    });
    
    css += `  --${colorName}-100: #ffffff;\n`;
  });
}

// Generate base brand colors
generateColorVariables(paletteData['base-brand-colors'], 'Base brand');

// Generate semantic colors  
generateColorVariables(paletteData['base-semantic-colors'], 'Semantic');

// Helper function to adjust color using percentage-based adjustments
function adjustColor(hex, lightness, saturation) {
  return generateToneFromAdjustment(hex, lightness, saturation);
}

// Function to generate tone from direct percentage adjustments
function generateToneFromAdjustment(baseColor, lightnessAdj, saturationAdj) {
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

  // Apply direct percentage adjustments
  let newL = Math.max(0, Math.min(1, l + lightnessAdj / 100));
  let newS = Math.max(0, Math.min(1, s + saturationAdj / 100));

  // Prevent colors from becoming pure white unless it's the 100 tone
  if (newL > 0.98) {
    newL = 0.98;
  }

  // Convert back to RGB
  if (newS === 0) {
    // For neutral colors, ensure proper differentiation between light tones
    let grayValue = Math.round(newL * 255);
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
