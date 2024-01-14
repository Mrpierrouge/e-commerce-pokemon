// fonction pour récupérer les information des pokemons dans le panier dans le localstorage
function RecupPanier() {
  if (localStorage.getItem("Panier") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.Panier);
  }
}

let PrixTotal = 0;
let Panier = RecupPanier();
// Pour chauque pokemon du panier :
Panier.forEach((pokemon) => {
  //j'augmente le prix du panier total
  PrixTotal += parseInt(pokemon.prix);

  //Je créer une carte pour le pokemon, avec son nom son img et son prix
  let Card = document.createElement("div");
  Card.classList.add("pokemon");
  Card.innerHTML = `<h3>${pokemon.name}</h3><img src="${pokemon.img}" class="img-pokemon"><p class="prix">${pokemon.prix} $ </p>`;

  // et y ajoute une redirection vers sa page produit
  Card.addEventListener("click", () => {
    localStorage.setItem("SelectedProduct", pokemon.name);
    localStorage.setItem("IsLegendary", pokemon.Islegendary);
    window.location.href = "../html/produit.html";
  });
  //Je créer un bouton supprimer
  const SuppCard = document.createElement("button");
  SuppCard.classList.add("anim-pulse");
  SuppCard.textContent = "Supprimer";
  // et y ajoute un evennement pour supprimer le pokemon du panier
  SuppCard.addEventListener("click", (event) => {
    //cette ligne sert a stopper la propagation de l'evennement de clic a l'élément parent. Ainsi le bouton supprimer de redirige pas vers la page produit
    event.stopPropagation();
    //Je cherche le pokemon dans la liste des pokemon du panier
    const indexOfPokemon = Panier.findIndex(
      (poke) => poke.name === pokemon.name
    );
    if (indexOfPokemon !== -1) {
      //et le supprime
      Panier.splice(indexOfPokemon, 1);
      Card.remove();
      //puis met a jour le panier et le prix total
      localStorage.Panier = JSON.stringify(Panier);
      PrixTotal -= parseInt(pokemon.prix);
      document.getElementById("prix-total").textContent = PrixTotal + " $";
    }
  });
  //J'ajoute le bouton supprimer a la carte du pokemon
  Card.appendChild(SuppCard);

  document.getElementById("pokemon-list").appendChild(Card);
  document.getElementById("prix-total").textContent = PrixTotal + " $";
});
