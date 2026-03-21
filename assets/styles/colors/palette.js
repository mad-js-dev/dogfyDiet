// Auto-generated from _palette.scss
export const colorMaps = {
  "brand": {
    "primary-green": "#00B67A",
    "accent-orange": "#EF6948",
    "accent-yellow": "#ffc800"
  },
  "semantic": {
    "success": "#0aaa46",
    "error": "#d80003",
    "warning": "#ffc800",
    "info": "#1976D2"
  },
  "neutral": {
    "base": "#767676"
  }
};

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

function formatColorName(key) {
  return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatSectionTitle(category) {
  const titles = {
    brand: 'Brand Colors',
    semantic: 'Semantic Colors',
    neutral: 'Neutral Colors'
  };
  return titles[category] || category;
}

function getSectionSubtitle(category) {
  const subtitles = {
    brand: 'Core brand identity and supporting colors',
    semantic: 'UI states and feedback',
    neutral: 'Typography and UI elements'
  };
  return subtitles[category] || '';
}

// Helper function to generate tonal palettes using CSS variables
export function generateTonalPalettes() {
  const palettes = [];

  // Define the tonal palette keys that correspond to our brand colors
  const tonalKeys = ['primary-green', 'accent-orange', 'accent-yellow'];

  tonalKeys.forEach(key => {
    const cssVarBase = `--color-base-brand-${key}`;
    const label = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Generate tones from 0-100 plus special tones
    const tones = [];
    const toneValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

    toneValues.forEach(tone => {
      const cssVar = `--${key}-${tone}`;
      tones.push({
        value: tone,
        cssVar: cssVar,
        hex: '', // Will be populated at runtime
        lch: ''  // Will be populated at runtime
      });
    });

    palettes.push({
      key: key,
      label: label,
      baseCssVar: cssVarBase,
      tones: tones
    });
  });

  return palettes;
}
