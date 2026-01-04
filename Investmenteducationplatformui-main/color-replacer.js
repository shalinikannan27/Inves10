const fs = require('fs');
const path = require('path');

// Color mapping from green to navy blue
const colorMap = {
  // Text colors
  'text-green-500': 'text-blue-400',
  'text-green-400': 'text-blue-300',
  'text-green-300': 'text-blue-200',
  
  // Background colors
  'bg-green-500': 'bg-blue-900',
  'bg-green-400': 'bg-blue-800',
  'bg-green-300': 'bg-blue-700',
  
  // Border colors
  'border-green-500': 'border-blue-900',
  'border-green-400': 'border-blue-800',
  'border-green-300': 'border-blue-700',
  
  // Hover states
  'hover:text-green-500': 'hover:text-blue-400',
  'hover:bg-green-500': 'hover:bg-blue-900',
  'hover:bg-green-400': 'hover:bg-blue-800',
  'hover:border-green-500': 'hover:border-blue-900',
  
  // Shadow colors
  'shadow-green-500': 'shadow-blue-900',
  
  // Opacity variants
  'green-500/90': 'blue-900/90',
  'green-500/80': 'blue-900/80',
  'green-500/70': 'blue-900/70',
  'green-500/60': 'blue-900/60',
  'green-500/50': 'blue-900/50',
  'green-500/40': 'blue-900/40',
  'green-500/30': 'blue-900/30',
  'green-500/20': 'blue-900/20',
  'green-500/10': 'blue-900/10',
  'green-500/5': 'blue-900/5',
  
  'green-400/90': 'blue-800/90',
  'green-400/80': 'blue-800/80',
  'green-400/70': 'blue-800/70',
  'green-400/60': 'blue-800/60',
  'green-400/50': 'blue-800/50',
  'green-400/40': 'blue-800/40',
  'green-400/30': 'blue-800/30',
  'green-400/20': 'blue-800/20',
  'green-400/10': 'blue-800/10',
  'green-400/5': 'blue-800/5',
};

// Additional replacement for 'text-black' when used with bg-green-500
const contextualReplacements = [
  {
    find: /bg-blue-900 text-black/g,
    replace: 'bg-blue-900 text-white'
  },
  {
    find: /bg-blue-800 text-black/g,
    replace: 'bg-blue-800 text-white'
  }
];

function replaceColors(content) {
  let result = content;
  
  // Apply color mappings
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    const regex = new RegExp(oldColor.replace(/\//g, '\\/'), 'g');
    result = result.replace(regex, newColor);
  }
  
  // Apply contextual replacements
  for (const {find, replace} of contextualReplacements) {
    result = result.replace(find, replace);
  }
  
  return result;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = replaceColors(content);
    
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir) {
  let filesUpdated = 0;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      filesUpdated += walkDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (processFile(filePath)) {
        filesUpdated++;
      }
    }
  }
  
  return filesUpdated;
}

// Run the script
const componentsDir = path.join(__dirname, 'src', 'app', 'components');
console.log('Starting color replacement...');
console.log(`Processing directory: ${componentsDir}`);

const updated = walkDirectory(componentsDir);

console.log(`\nComplete! Updated ${updated} file(s).`);
