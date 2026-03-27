// Auto-generated from palette.json
import paletteData from './palette.json';

// Helper: Hex to HSL
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [h * 360, s * 100, l * 100];
}

// Helper: HSL to Hex
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Generate tones for a base color
function generateTones(baseHex, colorKey) {
  const [h, s, l] = hexToHsl(baseHex);
  const adjustments = paletteData['palette-adjustments'];
  const toneValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

  return toneValues.map(tone => {
    if (tone === 0) {
      return { value: 0, hex: '#000000', cssVar: `--${colorKey}-0` };
    }
    if (tone === 100) {
      return { value: 100, hex: '#FFFFFF', cssVar: `--${colorKey}-100` };
    }

    const adj = adjustments[tone.toString()];
    let newL = l;
    let newS = s;

    if (adj.lightness) {
      const delta = parseInt(adj.lightness);
      newL = l + delta;
    }

    if (adj.saturation) {
      const delta = parseInt(adj.saturation);
      newS = s + delta;
    }

    // Clamp values
    newL = Math.max(0, Math.min(100, newL));
    newS = Math.max(0, Math.min(100, newS));

    return {
      value: tone,
      hex: hslToHex(h, newS, newL),
      cssVar: `--${colorKey}-${tone}`
    };
  });
}

// Generate tonal palettes from palette.json
function generateTonalPalettes() {
  const baseColors = paletteData['base-brand-colors'];
  const semanticColors = paletteData['base-semantic-colors'];
  const allColors = { ...baseColors, ...semanticColors };

  const paletteLabels = {
    'primary-green': 'Primary',
    'accent-orange': 'Secondary',
    'accent-yellow': 'Tertiary',
    'neutral': 'Neutral',
    'success': 'Success',
    'error': 'Error',
    'warning': 'Warning',
    'info': 'Info'
  };

  return Object.entries(allColors).map(([key, baseColor]) => {
    const tones = generateTones(baseColor, key);
    return {
      key: key,
      label: paletteLabels[key] || key,
      baseColor: baseColor,
      tones: tones.map(t => ({
        ...t,
        color: t.hex
      }))
    };
  });
}

export const tonalPalettes = generateTonalPalettes();

export const colorMaps = {
  "brand": {},
  "semantic": {},
  "neutral": {}
};

export const semanticRoles = {};

export const brandRoles = {};

// Helper function to get color data in the format expected by the component
export function generateColorSections() {
  const sections = [];

  Object.entries(colorMaps).forEach(([category, colors]) => {
    const sectionColors = Object.entries(colors).map(([key, value]) => ({
      name: formatColorName(key),
      value: value,
      cssVar: `--color-base-${category}-${key}`
    }));

    sections.push({
      sectionId: category,
      sectionType: category,
      title: formatSectionTitle(category),
      subtitle: getSectionSubtitle(category),
      colors: sectionColors
    });
  });

  return sections;
}

export function formatColorName(key) {
  return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function formatSectionTitle(category) {
  const titles = {
    brand: 'Brand Colors',
    semantic: 'Semantic Colors',
    neutral: 'Neutral Colors'
  };
  return titles[category] || category;
}

export function getSectionSubtitle(category) {
  const subtitles = {
    brand: 'Core brand identity and supporting colors',
    semantic: 'UI states and feedback',
    neutral: 'Typography and UI elements'
  };
  return subtitles[category] || '';
}
