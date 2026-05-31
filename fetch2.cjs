async function go() {
  const res = await fetch('https://www.justdial.com/Bhopal/Agilus-Diagnostics-Formerly-SRL-Opposite-Airtel-Office-Malviya-Nagar/0755P755STDS000005_BZDET', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const text = await res.text();
  const match = text.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (match) console.log('og:image:', match[1]);
  else {
    const urls = text.match(/https:\/\/[^"'>\s]+\.jpg/ig);
    if (urls) console.log('first jpg:', urls[0]);
  }
}
go();
