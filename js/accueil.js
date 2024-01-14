// Fonction pour obtenir la liste des Pokémon par génération
function getPokemonByGeneration(generation) {
  fetch(`https://pokeapi.co/api/v2/generation/${generation}/`)
    .then((response) => response.json())
    .then((data) => displayPokemonList(data.pokemon_species, generation));
}

// Fonction pour afficher une liste de pokemon dans une div
function displayPokemonList(pokemonList, gen) {
  // cette ligne tris les pokemon par numéros de pokedex
  pokemonList.sort(
    (a, b) => a.url.split("/").slice(-2, -1) - b.url.split("/").slice(-2, -1)
  );

  //pour chaque pokemon dans la lsite de pokemon de la génération
  pokemonList.forEach((pokemon) => {
    // Je Créer la carte du Pokémon
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.id = pokemon.name;

    // J' y Ajoute son nom
    const pokemonH = document.createElement("h3");
    pokemonH.textContent = pokemon.name;
    pokemonCard.appendChild(pokemonH);

    // Je récupére les détails du Pokémon pour obtenir l'image
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        //l'URL de l'image du Pokémon
        const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;

        // Je créer l'image du Pokémon
        const image = document.createElement("img");
        image.src = pokemonImageURL;
        image.alt = pokemon.name;
        image.classList.add("pokemon-image");
        
        //Je récupère l'information de si le pokemon est un pokemon légendaire
        Islegendary = document.createElement("input");
        Islegendary.setAttribute("type", "hidden");
        Islegendary.classList.add("IsLegendary");
        //L'information de si le pokemon légendaire est stocké de 2 manière différentes dans l'api : is_legendary et is_mythical
        if (data.is_legendary) {
          Islegendary.value = true;
        } else {
          Islegendary.value = data.is_mythical;
        }

        //J'ajoute les élements a la carte du pokemon
        pokemonCard.appendChild(image);
        pokemonCard.appendChild(Islegendary);
      })
      .catch((error) =>
        console.error("Error fetching Pokémon details:", error)
      );

    //J'joute la carte du Pokémon à la liste de sa génération
    const pokemonListContainer = document.getElementById(`${gen}gen`);
    pokemonListContainer.appendChild(pokemonCard);
  });
}

// on lance le code pour chacune des 8 génération
for (let i = 1; i < 10; i++) {
  getPokemonByGeneration(i);
}

// Les events listener pour chacunes des cartes, pour rediriger vers une page produit du pokemon.
//L'intervalle est présente pour mettre a jour le nombre de carte au fur et a mesure qu'elles se chargent
let Intervalle = setInterval(() => {
  const AllCards = document.querySelectorAll(".pokemon-card");
  AllCards.forEach((Card) => {
    Card.addEventListener("click", () => {
      //Je stock les information de quel pokemon est sélectionner puis redirige vers la page produit
      localStorage.setItem("SelectedProduct", Card.id);
      localStorage.setItem(
        "IsLegendary",
        document.querySelector(`#${Card.id}>.IsLegendary`).value
      );
      window.location.href = "../html/produit.html";
    });
  });
  if (document.querySelectorAll(".pokemon-card").length > 1024) {
    clearInterval(Intervalle);
  }
}, 1 * 1000);
