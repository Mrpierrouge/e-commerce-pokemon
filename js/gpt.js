// Fonction pour obtenir la liste des Pokémon par génération
function getPokemonByGeneration(generation) {
  fetch(`https://pokeapi.co/api/v2/generation/${generation}/`)
    .then((response) => response.json())
    .then((data) => displayPokemonList(data.pokemon_species, generation));
}

// Fonction pour afficher une liste de pokemon dans une div
function displayPokemonList(pokemonList, gen) {
  pokemonList.sort(
    (a, b) => a.url.split("/").slice(-2, -1) - b.url.split("/").slice(-2, -1)
  );

  const pokemonListContainer = document.getElementById(`${gen}gen`);

  pokemonList.forEach((pokemon) => {
    const pokemonName = pokemon.name;
    const pokemonDetailURL = pokemon.url;

    // Créer la carte du Pokémon
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    // Ajouter le nom du Pokémon à la carte
    const nameHeading = document.createElement("h3");
    nameHeading.textContent = pokemonName;
    pokemonCard.appendChild(nameHeading);

    // Récupérer les détails du Pokémon pour obtenir l'image
    fetch(pokemonDetailURL)
      .then((response) => response.json())
      .then((data) => {
        //l'URL de l'image du Pokémon
        const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;

        // Ajouter l'image du Pokémon à la carte
        const imageElement = document.createElement("img");
        imageElement.src = pokemonImageURL;
        imageElement.alt = pokemonName;
        imageElement.classList.add("pokemon-image");
        pokemonCard.appendChild(imageElement);
      })
      .catch((error) =>
        console.error("Error fetching Pokémon details:", error)
      );

    // Ajouter la carte du Pokémon à la liste
    pokemonListContainer.appendChild(pokemonCard);
  });
}

// on lance le code pour chacune des 8 génération
for (let i = 1; i < 10; i++) {
  getPokemonByGeneration(i);
}
