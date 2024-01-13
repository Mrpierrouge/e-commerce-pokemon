function RecupPanier() {
  if (localStorage.getItem("Panier") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.Panier);
  }
}

let Panier = RecupPanier();
Panier.forEach(pokemon => {
    let Card = document.createElement("div")
    Card.innerHTML = `<h3>${pokemon.name}</h3><img src="${pokemon.img}"><p>${pokemon.prix}`
    let SuppCard = document.createElement("button")
    SuppCard.textContent = "Supprimer"
    SuppCard.addEventListener("click", () =>{
        let NewPanier = Panier.filter((poke) => poke.name !== pokemon.name)
        Card.remove()
        localStorage.Panier = JSON.stringify(NewPanier)
    })
    Card.appendChild(SuppCard)
    document.getElementById("pokemon-list").appendChild(Card)
});

