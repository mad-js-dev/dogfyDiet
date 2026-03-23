import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read JSON palette data
const paletteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/styles/colors/palette.json'), 'utf8'));

// Generate CSS variables
let css = ':root {\n';

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
