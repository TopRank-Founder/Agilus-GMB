const https = require('https');
https.get('https://www.justdial.com/Bhopal/Agilus-Diagnostics-Formerly-SRL-Opposite-Airtel-Office-Malviya-Nagar/0755P755STDS000005_BZDET', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<img[^>]+src=["']?([^"'\s>]+)["']?[^>]*alt=["']?Agilus[\w\s]*Logo["']?[^>]*>/i);
    if (match) console.log('Found:', match[1]);
    const imgs = data.match(/<img[^>]+src=["']?([^"'\s>]+(?:Agilus|logo|SRL)[^"'\s>]*)["']?[^>]*>/ig);
    if (imgs) imgs.forEach(img => console.log('Match img:', img));
    const ogMatch = data.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    if (ogMatch) console.log('og:image:', ogMatch[1]);
  });
}).on('error', err => console.log('Error: ', err.message));
