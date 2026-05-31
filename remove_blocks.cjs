const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

// We want to delete:
// 1. Lines 1107-1178 (inclusive) which is index 1106 to 1177
// 2. Lines 1639-1763 (inclusive) which is index 1638 to 1762

// To be safe, let's look for the start and end tokens.
let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('{/* High-Conversion GMB Review Widget */}')) {
    skip = true;
  }
  
  if (line.includes('{/* Health Packages Showcase Section - Shield Style Redesign */}')) {
    skip = true;
  }

  if (!skip) {
    newLines.push(line);
  }

  if (skip && line.includes('</section>') && i >= 1106 && i <= 1200) {
    skip = false;
  }
  
  if (skip && line.includes('</section>') && i >= 1638 && i <= 1770) {
    skip = false;
  }
}

fs.writeFileSync('src/App.tsx', newLines.join('\n'));
