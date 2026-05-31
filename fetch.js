const https = require('https');
https.get('https://www.justdial.com/Bhopal/Agilus-Diagnostics-Formerly-SRL-Opposite-Airtel-Office-Malviya-Nagar/0755P755STDS000005_BZDET', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
    if (match) console.log(match[1]);
    else console.log('no og:image found');
  });
}).on('error', err => console.log('Error: ', err.message));
