import * as fs from 'fs';
import * as path from 'path';

const paletteFile = path.join(process.cwd(), 'assets/styles/colors/palette.json');

// Function to extract colors from the new JSON structure
function extractColorMaps() {
  try {
    // Read the JSON palette file
    const paletteContent = fs.readFileSync(paletteFile, 'utf-8');
    const paletteData = JSON.parse(paletteContent);

    // Extract colors from the new structure
    const brandColors = {};
    const semanticColors = {};
    const neutralColors = {};

    // Process brand colors
    Object.entries(paletteData['base-brand-colors']).forEach(([key, config]) => {
      brandColors[key] = config.color;
      if (key === 'neutral') {
        neutralColors[key] = config.color;
      }
    });

    // Process semantic colors
    Object.entries(paletteData['base-semantic-colors']).forEach(([key, config]) => {
      semanticColors[key] = config.color;
    });

    const colorData = {
      brand: brandColors,
      semantic: semanticColors,
      neutral: neutralColors
    };

    console.log('Extracted colors:', colorData);

    // Extract semantic roles using tone generation
    const semanticRoles = extractSemanticRoles(semanticColors);

    // Extract brand roles using tone generation
    const brandRoles = extractBrandRoles(brandColors);

    // Generate tonal palettes
    const tonalPalettes = generateAllTonalPalettes(colorData);

    console.log('Extracted tonal palettes:', tonalPalettes.length, 'palettes');

    // Generate JavaScript module
    const jsContent = `// Auto-generated from _palette.scss
export const colorMaps = ${JSON.stringify(colorData, null, 2)};

export const semanticRoles = ${JSON.stringify(semanticRoles, null, 2)};

export const brandRoles = ${JSON.stringify(brandRoles, null, 2)};

export const tonalPalettes = ${JSON.stringify(tonalPalettes, null, 2)};

// Helper function to get color data in the format expected by the component
export function generateColorSections() {
  const sections = [];

  Object.entries(colorMaps).forEach(([category, colors]) => {
    const sectionColors = Object.entries(colors).map(([key, value]) => ({
      name: formatColorName(key),
      value: value,
      cssVar: \`--color-base-\${category}-\${key}\`
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
`;

    const outputPath = path.join(process.cwd(), 'assets/styles/colors/palette.js');
    fs.writeFileSync(outputPath, jsContent);
    console.log('Successfully generated palette.js from _palette.scss');

  } catch (error) {
    console.error('Error extracting color maps:', error);
    process.exit(1);
  }
}

// Function to generate a specific tone from a base color (replicating Sass logic)
function generateTone(baseColor, tone) {
  // Convert hex to RGB
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  console.log(`Input color: ${baseColor}, tone: ${tone}, RGB: ${r}, ${g}, ${b}`);

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

  console.log(`HSL: h=${h}, s=${s}, l=${l}`);

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
    90: { lightness: 50, saturation: 0 },
    95: { lightness: 65, saturation: 0 },
    98: { lightness: 80, saturation: 0 },
    99: { lightness: 90, saturation: 0 },
    100: { lightness: 100, saturation: 0 }
  };

  const adj = adjustments[tone] || { lightness: 0, saturation: 0 };
  let newL = Math.max(0, Math.min(1, l + adj.lightness / 100));
  let newS = Math.max(0, Math.min(1, s + adj.saturation / 100));

  console.log(`Adjusted HSL: h=${h}, s=${newS}, l=${newL}`);

  // Convert back to RGB
  if (newS === 0) {
    const gray = Math.round(newL * 255);
    const result = `#${gray.toString(16).padStart(2, '0').repeat(3)}`;
    console.log(`Grayscale result: ${result}`);
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
  console.log(`Color result: ${result}`);
  return result;
}

// Function to extract semantic roles using tone generation
function extractSemanticRoles(semanticColors) {
  const roles = {};
  Object.keys(semanticColors).forEach(semantic => {
    const baseColor = semanticColors[semantic];
    roles[semantic] = {
      base: generateTone(baseColor, 60), // main uses 60 tone (base)
      on: generateTone(baseColor, 100), // on uses 100 (white)
      container: generateTone(baseColor, 90), // container uses 90 (light)
      onContainer: generateTone(baseColor, 10) // on-container uses 10 (dark)
    };
  });
  return roles;
}

// Function to extract brand roles using tone generation
function extractBrandRoles(brandColors) {
  const roles = {};
  Object.keys(brandColors).forEach(brand => {
    const baseColor = brandColors[brand];
    const colorKey = brand.replace('-', ''); // Remove hyphens for CSS var names
    roles[brand] = {
      light: {
        base: {
          hex: generateTone(baseColor, 60), // main uses 60 tone (base)
          cssVar: `--${brand}-40`
        },
        on: {
          hex: generateTone(baseColor, 100), // on uses 100 (white)
          cssVar: `--${brand}-100`
        },
        container: {
          hex: generateTone(baseColor, 90), // container uses 90 (light)
          cssVar: `--${brand}-90`
        },
        onContainer: {
          hex: generateTone(baseColor, 10), // on-container uses 10 (dark)
          cssVar: `--${brand}-10`
        }
      },
      dark: {
        base: {
          hex: generateTone(baseColor, 30), // dark theme uses 30 tone
          cssVar: `--${brand}-30`
        },
        on: {
          hex: generateTone(baseColor, 100), // dark theme uses 100 (white)
          cssVar: `--${brand}-100`
        },
        container: {
          hex: generateTone(baseColor, 20), // dark theme uses 20 tone
          cssVar: `--${brand}-20`
        },
        onContainer: {
          hex: generateTone(baseColor, 100), // dark theme uses 100 (white)
          cssVar: `--${brand}-100`
        }
      }
    };
  });
  return roles;
}

// Function to generate tonal palette for a single color (full 0-100 tones)
function generateTonalPalette(baseColor, paletteKey) {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]
  
  // Convert hex to HSL for easier manipulation
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255
  
  // RGB to HSL conversion
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return tones.map(tone => {
    let adjustedL = tone / 100
    let adjustedS = s
    
    // Material Design 3 tonal palette adjustments
    if (tone === 0) {
      adjustedL = 0
      adjustedS = 0
    } else if (tone === 100) {
      adjustedL = 1
      adjustedS = 0
    } else {
      // Reduce saturation for extreme tones to maintain colorfulness
      if (tone <= 20 || tone >= 80) {
        adjustedS = s * 0.6
      }
      if (tone <= 10 || tone >= 90) {
        adjustedS = s * 0.3
      }
    }
    
    // HSL to RGB conversion
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r_val, g_val, b_val
    if (adjustedS === 0) {
      r_val = g_val = b_val = adjustedL
    } else {
      const q = adjustedL < 0.5 ? adjustedL * (1 + adjustedS) : adjustedL + adjustedS - adjustedL * adjustedS
      const p = 2 * adjustedL - q
      r_val = hue2rgb(p, q, h + 1/3)
      g_val = hue2rgb(p, q, h)
      b_val = hue2rgb(p, q, h - 1/3)
    }
    
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, '0')
    const hexColor = `#${toHex(r_val)}${toHex(g_val)}${toHex(b_val)}`
    
    return {
      value: tone,
      color: hexColor,
      hex: hexColor,
      cssVar: `--${paletteKey}-${tone}`
    }
  })
}

// Function to generate tonal palette using individual adjustments
function generateTonalPaletteWithAdjustments(baseColor, paletteKey, adjustments) {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]
  
  return tones.map(tone => {
    let hexColor
    
    if (tone === 0) {
      hexColor = '#000000'
    } else if (tone === 100) {
      hexColor = '#ffffff'
    } else if (adjustments[tone.toString()]) {
      const adj = adjustments[tone.toString()]
      const lightness = parseInt(adj.lightness)
      const saturation = adj.saturation ? parseInt(adj.saturation) : 0
      hexColor = generateToneFromAdjustment(baseColor, lightness, saturation)
    } else {
      // Fallback to default tone generation
      hexColor = generateTone(baseColor, tone)
    }
    
    return {
      value: tone,
      color: hexColor,
      hex: hexColor,
      cssVar: `--${paletteKey}-${tone}`
    }
  })
}

// Function to generate tone from direct percentage adjustments
function generateToneFromAdjustment(baseColor, lightnessAdj, saturationAdj) {
  // Convert hex to RGB
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // Calculate HSL
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / (2 * 255)

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (510 - max - min) : d / (max + min)
    // Ensure saturation is non-negative
    s = Math.max(0, s)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  // Apply direct percentage adjustments
  let newL = Math.max(0, Math.min(1, l + lightnessAdj / 100))
  let newS = Math.max(0, Math.min(1, s + saturationAdj / 100))

  // Prevent colors from becoming pure white unless it's 100 tone
  if (newL > 0.98) {
    newL = 0.98
  }

  // Convert back to RGB
  if (newS === 0) {
    // For neutral colors, ensure proper differentiation between light tones
    let grayValue = Math.round(newL * 255)
    const result = `#${grayValue.toString(16).padStart(2, '0').repeat(3)}`
    return result
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = newL < 0.5 ? newL * (1 + newS) : newL + newS - newL * newS
  const p = 2 * newL - q
  const newR = Math.round(hue2rgb(p, q, h + 1/3) * 255)
  const newG = Math.round(hue2rgb(p, q, h) * 255)
  const newB = Math.round(hue2rgb(p, q, h - 1/3) * 255)

  const result = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
  return result
}

// Function to generate all tonal palettes using individual adjustments
function generateAllTonalPalettes(colorMaps) {
  const palettes = []
  
  // Read the JSON palette to get individual adjustments
  const paletteContent = fs.readFileSync(paletteFile, 'utf-8');
  const paletteData = JSON.parse(paletteContent);
  
  // Combine brand and semantic colors with their adjustments
  const allColors = {
    ...paletteData['base-brand-colors'],
    ...paletteData['base-semantic-colors']
  }
  
  Object.entries(allColors).forEach(([key, config]) => {
    const category = colorMaps.brand[key] ? 'brand' : 
                   colorMaps.semantic[key] ? 'semantic' : 'neutral'
    
    palettes.push({
      key,
      label: formatColorName(key),
      category,
      baseColor: config.color,
      tones: generateTonalPaletteWithAdjustments(config.color, key, config.palette)
    })
  })
  
  return palettes
}

function formatColorName(key) {
  return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
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
