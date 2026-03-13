#!/usr/bin/env node

// Script to sync Sass variables with JavaScript colors
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Sass variables file
const sassVariablesPath = path.join(__dirname, '../../assets/styles/_variables.scss');

// Path to JavaScript colors file  
const jsColorsPath = path.join(__dirname, 'colors.js');

// Read Sass variables
const sassContent = fs.readFileSync(sassVariablesPath, 'utf8');

// Extract color variables using regex patterns
const colorMappings = {
  primaryGreen: /\$primary-green:\s*([^;!]+)/,
  accentOrange: /\$accent-orange:\s*([^;!]+)/,
  accentYellow: /\$accent-yellow:\s*([^;!]+)/,
  neutralDarkest: /\$neutral-darkest:\s*([^;!]+)/,
  neutralDark: /\$neutral-dark:\s*([^;!]+)/,
  neutralMedium: /\$neutral-medium:\s*([^;!]+)/,
  neutralLight: /\$neutral-light:\s*([^;!]+)/,
  neutralLightest: /\$neutral-lightest:\s*([^;!]+)/,
  neutralWhite: /\$neutral-white:\s*([^;!]+)/,
};

// Extract values from Sass
const extractedColors = {};
for (const [jsKey, regex] of Object.entries(colorMappings)) {
  const match = sassContent.match(regex);
  if (match) {
    extractedColors[jsKey] = match[1].trim();
  } else {
    console.warn(`Could not find Sass variable for ${jsKey}`);
  }
}

// Generate JavaScript content
const jsContent = `// Color variables from Sass system for programmatic access
// These values are automatically synced with assets/styles/_variables.scss
// Run this script to update: node sync-colors.js
export const colorVariables = {
  // Brand colors (from $primary-green, $accent-orange, $accent-yellow)
  primaryGreen: '${extractedColors.primaryGreen || '#00B67A'}',
  accentOrange: '${extractedColors.accentOrange || '#EF6948'}',
  accentYellow: '${extractedColors.accentYellow || '#ffca4e'}',

  // Neutral colors (from $neutral-* variables)
  neutralDarkest: '${extractedColors.neutralDarkest || '#1a1a1a'}',
  neutralDark: '${extractedColors.neutralDark || '#3d3d3d'}',
  neutralMedium: '${extractedColors.neutralMedium || '#767676'}',
  neutralLight: '${extractedColors.neutralLight || '#a3a3a3'}',
  neutralLightest: '${extractedColors.neutralLightest || '#d4d4d4'}',
  neutralWhite: '${extractedColors.neutralWhite || '#ffffff'}',

  // Material Design 3 tokens (read from CSS custom properties)
  get md3Primary() {
    return getCssProperty('--md3-primary', '${extractedColors.primaryGreen || '#00B67A'}')
  },
  get md3OnPrimary() {
    return getCssProperty('--md3-on-primary', '${extractedColors.neutralWhite || '#ffffff'}')
  },
  get md3PrimaryContainer() {
    return getCssProperty('--md3-primary-container', '${extractedColors.primaryGreen || '#00B67A'}')
  },
  get md3OnPrimaryContainer() {
    return getCssProperty('--md3-on-primary-container', '#000000')
  },
  get md3Secondary() {
    return getCssProperty('--md3-secondary', '${extractedColors.neutralMedium || '#767676'}')
  },
  get md3OnSecondary() {
    return getCssProperty('--md3-on-secondary', '${extractedColors.neutralWhite || '#ffffff'}')
  },
  get md3Surface() {
    return getCssProperty('--md3-surface', '${extractedColors.neutralWhite || '#ffffff'}')
  },
  get md3OnSurface() {
    return getCssProperty('--md3-on-surface', '${extractedColors.neutralDarkest || '#1a1a1a'}')
  },
  get md3SurfaceVariant() {
    return getCssProperty('--md3-surface-variant', '#f5f5f5')
  },
  get md3OnSurfaceVariant() {
    return getCssProperty('--md3-on-surface-variant', '${extractedColors.neutralDark || '#3d3d3d'}')
  },
  get md3Outline() {
    return getCssProperty('--md3-outline', '${extractedColors.neutralMedium || '#767676'}')
  },
  get md3Error() {
    return getCssProperty('--md3-error', '#ba1a1a')
  },
  get md3OnError() {
    return getCssProperty('--md3-on-error', '${extractedColors.neutralWhite || '#ffffff'}')
  }
}

// Utility function to get CSS custom property with fallback
function getCssProperty(property, fallback) {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    const root = document.documentElement
    const value = getComputedStyle(root).getPropertyValue(property).trim()
    return value || fallback
  }
  return fallback
}

// Utility function to copy color to clipboard
export async function copyColor(color) {
  try {
    await navigator.clipboard.writeText(color)
    return true
  } catch (err) {
    console.error('Failed to copy color:', err)
    return false
  }
}
`;

// Write the updated JavaScript file
fs.writeFileSync(jsColorsPath, jsContent);

console.log('✅ Colors synced successfully!');
console.log(`📁 Updated: ${jsColorsPath}`);
console.log('🔄 These values are now synced with your Sass variables');
