import * as sass from 'sass';
import * as fs from 'fs';
import * as path from 'path';

const paletteFile = path.join(process.cwd(), 'assets/styles/colors/_palette.scss');

// Function to extract Sass maps from the file
function extractColorMaps() {
  try {
    // Read the palette file
    const paletteContent = fs.readFileSync(paletteFile, 'utf-8');

    // Extract the maps directly by parsing the content
    const brandColors = extractMapFromContent(paletteContent, '$brand-colors');
    const semanticColors = extractMapFromContent(paletteContent, '$semantic-colors');
    const neutralColors = extractMapFromContent(paletteContent, '$neutral-colors');

    const colorData = {
      brand: brandColors,
      semantic: semanticColors,
      neutral: neutralColors
    };

    console.log('Extracted colors:', colorData);

    // Generate JavaScript module
    const jsContent = `// Auto-generated from _palette.scss
export const colorMaps = ${JSON.stringify(colorData, null, 2)};

// Helper function to get color data in the format expected by the component
export function generateColorSections() {
  const sections = [];

  Object.entries(colorMaps).forEach(([category, colors]) => {
    const sectionColors = Object.entries(colors).map(([key, value]) => ({
      name: formatColorName(key),
      value: value,
      sassVar: \`--color-base-\${category}-\${key}\`
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
`;

    const outputPath = path.join(process.cwd(), 'assets/styles/colors/palette.js');
    fs.writeFileSync(outputPath, jsContent);
    console.log('Successfully generated palette.js from _palette.scss');

  } catch (error) {
    console.error('Error extracting color maps:', error);
    process.exit(1);
  }
}

// Simple parser to extract Sass maps
function extractMapFromContent(content, mapName) {
  // Find the map definition manually
  const startPattern = `${mapName}: (`;
  const endPattern = ') !default;';

  const startIndex = content.indexOf(startPattern);
  if (startIndex === -1) {
    console.log(`Could not find start of ${mapName}`);
    return {};
  }

  const mapStart = startIndex + startPattern.length;
  const endIndex = content.indexOf(endPattern, mapStart);
  if (endIndex === -1) {
    console.log(`Could not find end of ${mapName}`);
    return {};
  }

  const mapContent = content.substring(mapStart, endIndex).trim();
  console.log(`Extracted content for ${mapName}:`, mapContent.substring(0, 100) + '...');

  const colors = {};

  // Parse key-value pairs by splitting on newlines and processing each line
  const lines = mapContent.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));

  lines.forEach(line => {
    if (line.includes(':')) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().replace(/['"]/g, '');
        const value = parts[1].trim().replace(/['"]/g, '').replace(/[,\s]*$/, '').split('//')[0].trim();
        if (key && value) {
          colors[key] = value;
        }
      }
    }
  });

  console.log(`Parsed colors for ${mapName}:`, colors);
  return colors;
}

extractColorMaps();
