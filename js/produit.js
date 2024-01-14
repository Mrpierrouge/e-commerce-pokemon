const Produit = localStorage.getItem("SelectedProduct");
const IsLegendary = localStorage.getItem("IsLegendary");
function RecupPanier() {
  if (localStorage.getItem("Panier") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.Panier);
  }
}
fetch(`https://pokeapi.co/api/v2/pokemon/${Produit}/`)
  .then((response) => response.json())
  .then((data) => {
    let Nom = data.name;
    if (IsLegendary == "true") {
      Nom += " &#127775;";
    }
    document.getElementById(
      "sprite"
    ).innerHTML = `<h3>${Nom}</h3><img src="${data.sprites.front_default}">`;

    data.types.forEach((type) => {
      const Type = document.createElement("div");
      Type.innerHTML = `<img src ="../img/type_${type.type.name}.png"><h3>${type.type.name}</h3>`;
      console.log(Type);
      document.getElementById("zone-type").appendChild(Type);
    });

    const DivStats = document.createElement("ul");

    let TotalStats = 0;
    data.stats.forEach((stat) => {
      const Li = document.createElement("li");
      Li.textContent = `${stat.stat.name} : ${stat.base_stat}`;
      TotalStats += stat.base_stat;
      DivStats.appendChild(Li);
    });

    let Prix = ((TotalStats * 10) / data.stats.length).toFixed();
    if (IsLegendary == "true") {
      Prix = Prix * 1000;
    }

    const DivPrix = document.createElement("div");
    DivPrix.id = "Prix";
    DivPrix.textContent = `${Prix} $`;

    document.getElementById("chiffres").appendChild(DivStats);
    document.getElementById("chiffres").appendChild(DivPrix);
// Au clic sur le bouton d'ajout au panier, je met a jour le panier dans le local storage
    const BoutonAdd = document.getElementById("Ajouter")
    BoutonAdd.addEventListener("click", () => {
      //maj du panier
      let Panier = RecupPanier();
      Panier.push({
        name: data.name,
        img: data.sprites.front_default,
        prix: Prix,
      });
      localStorage.Panier = JSON.stringify(Panier);
      //
      BoutonAdd.classList.remove('anim-pulse');
      void BoutonAdd.offsetWidth;
      BoutonAdd.classList.add('anim-pulse');
      void BoutonAdd.offsetWidth;
    });
  });

