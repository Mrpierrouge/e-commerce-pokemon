fetch(`https://pokeapi.co/api/v2/pokemon?limit=1300`)
  .then((response) => response.json())
  .then((data) => {
    for (const pokemon of data.results) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then((pokeData) => {
          console.log(pokeData);
          const pokemonCard = document.createElement("div");
          pokemonCard.classList.add("pokemon-card");
          pokemonCard.innerHTML = `<h3>${pokeData.name}</h3>
            <img src="${pokeData.sprites.front_default}">`;

          const imageElement = document.createElement("img");
          imageElement.src = `${pokeData.sprites.front_default}`;

          fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${pokeData.species.name}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const GenDiv = data.generation.name;
              GenDiv.appendChild(pokemonCard);

            });
        })
        .catch((error) => console.log(error));
    }
  });
