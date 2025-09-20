document.getElementById('searchBtn').addEventListener('click', async () => {
  const name = document.getElementById('pokemonInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');

  if (!name) {
    resultDiv.innerHTML = "<p>Por favor escribe un nombre de Pokemon</p>";
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("Pokemon no encontrado");

    const data = await res.json();

    resultDiv.innerHTML = `
      <h2>${data.name} (#${data.id})</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><b>Habilidades:</b> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
      <p><b>Power ups:</b> ${data.held_items.map(a => a.item.name).join(', ')}</p>
      <b>❤️:</b> ${data.stats.map(a => a.base_stat)[0]} / <b>🥊:</b> ${data.stats.map(a => a.base_stat)[1]} / <b>🛡️:</b> ${data.stats.map(a => a.base_stat)[2]}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});
