const https = require('https');
https.get('https://www.justdial.com/Mohali/Agilus-Diagnostics-Formerly-SRL-Lab-Mohali-Mohali-Sector-69/0172PX172-X172-250913201546-R6G3_BZDET?via=scode', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
    if (match) console.log(match[1]);
    else console.log('no og:image found');
  });
}).on('error', err => console.log('Error: ', err.message));
