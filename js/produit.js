//Je récupere les infos du localstorage sur le pokemon a afficher
const Produit = localStorage.getItem("SelectedProduct");
const IsLegendary = localStorage.getItem("IsLegendary");

//une fonction qui permet de récupérer l'information des pokemon presents dans le panier
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
    //J'affiche le nom du pokemon, si il est légendaire une étoile est ajoutée
    let Nom = data.name;
    if (IsLegendary == "true") {
      Nom += " &#127775;";
    }
    //J'ajoute l'image du pokemon
    document.getElementById(
      "sprite"
    ).innerHTML = `<h3>${Nom}</h3><img src="${data.sprites.front_default}">`;

    //J'affiche les types du pokemon
    data.types.forEach((type) => {
      const Type = document.createElement("div");
      Type.innerHTML = `<img src ="../img/type_${type.type.name}.png"><h3>${type.type.name}</h3>`;
      console.log(Type);
      document.getElementById("zone-type").appendChild(Type);
    });

    //Je créer les stats du pokemon
    const DivStats = document.createElement("ul");
    let TotalStats = 0;
    data.stats.forEach((stat) => {
      const Li = document.createElement("li");
      Li.textContent = `${stat.stat.name} : ${stat.base_stat}`;
      TotalStats += stat.base_stat;
      DivStats.appendChild(Li);
    });
    //Je créer le prix du pokemon, une moyenne des stats de celui-ci (multiplié par 1000 pour les pokemon legendaires)
    let Prix = ((TotalStats * 10) / data.stats.length).toFixed();
    if (IsLegendary == "true") {
      Prix = Prix * 1000;
    }
    const DivPrix = document.createElement("div");
    DivPrix.id = "Prix";
    DivPrix.textContent = `${Prix} $`;

    // J'ajoute ces derniers
    document.getElementById("chiffres").appendChild(DivStats);
    document.getElementById("chiffres").appendChild(DivPrix);

    // Au clic sur le bouton d'ajout au panier, je met a jour le panier dans le local storage
    const BoutonAdd = document.getElementById("Ajouter");
    BoutonAdd.addEventListener("click", () => {
      //maj du panier
      let Panier = RecupPanier();
      Panier.push({
        name: data.name,
        img: data.sprites.front_default,
        prix: Prix,
        IsLegendary: IsLegendary
      });
      localStorage.Panier = JSON.stringify(Panier);
      // Changement d'animation 
      BoutonAdd.classList.remove("anim-scale");
      void BoutonAdd.offsetWidth;
      BoutonAdd.classList.add("anim-pulse");
      setTimeout(() => {
        BoutonAdd.classList.remove("anim-pulse");
        void BoutonAdd.offsetWidth;
        BoutonAdd.classList.add("anim-scale");

      }, 3 * 1000);
    });
  });
