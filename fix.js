const fs = require('fs');
const file = 'app/components/HeroSection.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\"/g, '"');
fs.writeFileSync(file, content);
console.log('Fixed quotes in', file);
