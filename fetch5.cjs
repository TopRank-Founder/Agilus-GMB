async function go() {
  const res = await fetch('https://agilusdiagnostics.com/');
  const text = await res.text();
  const urls = text.match(/https:\/\/[^"'>\s]+\.(?:png|svg|webp|jpg)/ig);
  if (urls) {
    const list = urls.filter(u => u.toLowerCase().includes('logo'));
    console.log('logos:', list);
  }
}
go();
