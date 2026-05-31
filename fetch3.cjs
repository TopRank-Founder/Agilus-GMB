async function go() {
  const res = await fetch('https://agilusdiagnostics.com/');
  const text = await res.text();
  const urls = text.match(/https:\/\/[^"'>\s]+logo[^"'>\s]+\.(?:png|svg|webp|jpg)/ig) || text.match(/[^"'>\s]+logo[^"'>\s]+\.(?:png|svg|webp|jpg)/ig);
  console.log('logos:', urls);
}
go();
