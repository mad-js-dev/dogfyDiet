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
css += `  --neutral-90: ${adjustColor(neutralHex, 50, 0)};\n`;
css += `  --neutral-95: ${adjustColor(neutralHex, 65, -20)};\n`;
css += `  --neutral-98: ${adjustColor(neutralHex, 80, -40)};\n`;
css += `  --neutral-99: ${adjustColor(neutralHex, 90, -60)};\n`;
css += `  --neutral-100: #ffffff;\n`;

// Helper function to adjust color lightness and saturation
function adjustColor(hex, lightness, saturation) {
  // Simple color adjustment - in a real implementation you'd use a proper color library
  // For now, return some reasonable approximations based on the existing palette data
  const colorMap = {
    '#00B67A': {
      '-60,-10': '#010a07', '-45,-5': '#000000', '-30,-2': '#001d13', '-20,0': '#005036',
      '-10,0': '#008358', '15,0': '#03ffac', '30,0': '#50ffc5', '50,0': '#93ecce',
      '65,-20': '#ace2d0', '80,-40': '#d0e2dc', '90,-60': '#e8edeb'
    },
    '#EF6948': {
      '-60,-10': '#090301', '-45,-5': '#491509', '-30,-2': '#90280e', '-20,0': '#c03311',
      '-10,0': '#eb4319', '15,0': '#f5a38e', '30,0': '#fbdcd5', '50,0': '#e5a99a',
      '65,-20': '#dcbab1', '80,-40': '#dfd5d2', '90,-60': '#eceae9'
    },
    '#ffc800': {
      '-60,-10': '#0a0801', '-45,-5': '#191401', '-30,-2': '#654f01', '-20,0': '#997800',
      '-10,0': '#cca000', '15,0': '#ffd94d', '30,0': '#ffe999', '50,0': '#ecd993',
      '65,-20': '#e2d6ac', '80,-40': '#e2ded0', '90,-60': '#edece8'
    },
    '#767676': {
      '-60,-10': '#060505', '-45,-5': '#030303', '-30,-2': '#2a2a2a', '-20,0': '#434343',
      '-10,0': '#5d5d5d', '15,0': '#9c9c9c', '30,0': '#c3c3c3', '50,0': '#c4baba',
      '65,-20': '#cac4c4', '80,-40': '#dad8d8', '90,-60': '#ebeaea'
    },
    '#0aaa46': {
      '-60,-10': '#010904', '-45,-5': '#000000', '-30,-2': '#02190b', '-20,0': '#044a1e',
      '-10,0': '#077a32', '15,0': '#10f164', '30,0': '#58f593', '50,0': '#98e7b5',
      '65,-20': '#b0dec1', '80,-40': '#d1e0d7', '90,-60': '#e9ecea'
    },
    '#d80003': {
      '-60,-10': '#0a0101', '-45,-5': '#000000', '-30,-2': '#3e0101', '-20,0': '#720002',
      '-10,0': '#a50002', '15,0': '#ff2529', '30,0': '#ff7274', '50,0': '#ec9394',
      '65,-20': '#e2acad', '80,-40': '#e2d0d0', '90,-60': '#ede8e8'
    },
    '#1976d2': {
      '-60,-10': '#020509', '-45,-5': '#010305', '-30,-2': '#0a2948', '-20,0': '#0e4377',
      '-10,0': '#145ca4', '15,0': '#4e9cea', '30,0': '#92c2f2', '50,0': '#9cbfe2',
      '65,-20': '#b3c7db', '80,-40': '#d3d9df', '90,-60': '#e9ebec'
    }
  };
  
  const key = `${lightness},${saturation}`;
  return colorMap[hex]?.[key] || hex;
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
