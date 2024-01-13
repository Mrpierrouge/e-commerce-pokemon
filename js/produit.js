const Produit = localStorage.getItem("SelectedProduct");
const IsLegendary = localStorage.getItem("IsLegendary");
fetch(`https://pokeapi.co/api/v2/pokemon/${Produit}/`)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById(
      "sprite"
    ).innerHTML = `<h3>${data.name}</h3><img src="${data.sprites.front_default}">`;

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

    const DivPrix = document.createElement("button");
    let Prix = (TotalStats * 100) / data.stats.length;

    if (IsLegendary) {
      Prix = Prix * 1000;
    }
    DivPrix.textContent = `${Prix}$`;

    document.getElementById("chiffres").appendChild(DivStats);
    document.getElementById("chiffres").appendChild(DivPrix);
  });
