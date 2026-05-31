async function go() {
  const res = await fetch('https://agilusdiagnostics.com/');
  const text = await res.text();
  const urls = text.match(/[^"'>\s]+agilus[^"'>\s]*\.(?:png|svg|webp|jpg)/ig);
  console.log('agilus assets:', urls);
}
go();
