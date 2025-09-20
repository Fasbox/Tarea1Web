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
      <p><b>Experiencia base:</b> ${data.base_experience}</p>
      <p><b>Habilidades:</b> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});
