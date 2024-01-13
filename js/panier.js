function RecupPanier() {
  if (localStorage.getItem("Panier") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.Panier);
  }
}
let PrixTotal = 0;
let Panier = RecupPanier();
Panier.forEach(pokemon => {
    PrixTotal += parseInt(pokemon.prix)
    let Card = document.createElement("div")
    Card.classList.add("pokemon")
    Card.innerHTML = `<h3>${pokemon.name}</h3><img src="${pokemon.img}"><p class="prix">${pokemon.prix} $ </p>`
    let SuppCard = document.createElement("button")
    SuppCard.textContent = "Supprimer"
    SuppCard.addEventListener("click", () =>{
        const indexOfPokemon = Panier.findIndex((poke) => poke.name === pokemon.name);
        if (indexOfPokemon !== -1) {
            Panier.splice(indexOfPokemon, 1);
            Card.remove();
            localStorage.Panier = JSON.stringify(Panier);
            PrixTotal -= parseInt(pokemon.prix)  
            document.getElementById("prix-total").textContent = PrixTotal 
        }
    })
    Card.appendChild(SuppCard)
    document.getElementById("pokemon-list").appendChild(Card)

    document.getElementById("prix-total").textContent = PrixTotal + " $"
});

