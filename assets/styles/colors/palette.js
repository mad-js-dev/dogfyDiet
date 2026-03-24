// Auto-generated from _palette.scss
export const colorMaps = {
  "brand": {},
  "semantic": {},
  "neutral": {}
};

export const semanticRoles = {};

export const brandRoles = {};

export const tonalPalettes = [];

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
