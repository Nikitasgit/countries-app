const result = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let inputSearch = document.getElementById("inputSearch");
let sortMethod = "maxToMin";

async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      countries = data;
      console.log(countries[0]);
      countriesDisplay();
    });
}
fetchCountries();

function countriesDisplay() {
  result.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
    <div class="card">
    <img src=${country.flags.png}>
    <h2> ${country.translations.fra.common}</h2>
    <h3> ${country.capital} </h3>
    <p>  Population: ${country.population.toLocaleString()}</p>
    </div>
    `
    )
    .join("");
}
window.addEventListener("load", fetchCountries);
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
