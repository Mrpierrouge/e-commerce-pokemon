const champ = document.getElementById("search");
const div = document.createElement("div");
const recherche = document.querySelector(".recherche");

// J'ajoute un événement a la modification de l'input de recherche
document.getElementById("search").addEventListener("change", () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${champ.value}`)
    .then((response)=> response.json())
    .then((data) => {
        //Je créer la carte du pokemon correspondant
        div.innerHTML = `<h3>${data.name}</h3>
        <img src="${data.sprites.front_default}">`;
        div.classList.add("pokemon-card")

        //J'y ajoute un écouteur évennement pour rediriger vers la page produit du pokemon
        div.addEventListener("click", () => {
            localStorage.setItem("SelectedProduct",`${data.name}`);
            localStorage.setItem("IsLegendary",document.querySelector(`#${data.name}>.IsLegendary`).value)
            window.location.href="../html/produit.html";
        })
    })
    .catch((error) => {
        //J'affiche qu'il n'y a aucun résultat
        div.innerHTML = "<p>Aucun pokémon trouvé</p>";
    });
})
document.getElementById("recherche").appendChild(div)