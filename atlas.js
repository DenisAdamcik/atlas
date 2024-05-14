year.innerText = new Date().getFullYear();
function showCountriesByContinent(continent) {
    staty.innerHTML = ''; 

    fetch(`https://restcountries.com/v3.1/region/${continent}`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(stat => {
                let blockCountry = `
                <div class="col-xl-2 col-lg-10 col-md-10 col-sm-10 lol">
                    <div class="card">
                        <a href="${stat.maps.googleMaps}">
                            <img class="card-img-top" src="${stat.flags.png}" 
                            alt="${stat.name.official}" />
                        </a>
                        <div class="card-body">
                            <h4 class="card-title">${stat.translations.ces.common}</h4>
                            <p class="card-text">Počet obyvatel: ${stat.population}
                                <br>Rozloha: ${stat.area} km<sup>2</sup>
                            </p>
                        </div>
                    </div>                   
                </div>`;
                staty.innerHTML += blockCountry;
            });

            const countryLinks = document.querySelectorAll('.country-link');
            countryLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); // Zabraňuje výchozímu chování odkazu
                    const index = Array.from(countryLinks).indexOf(link);
                    const selectedStat = data[index];
                    showModalWithCountryInfo(selectedStat.translations.ces.common, selectedStat.population, selectedStat.area);
                });
            });
        });
}





document.addEventListener('DOMContentLoaded', function() {
    showCountriesByContinent('europe');
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const continent = this.getAttribute('data-continent');
        showCountriesByContinent(continent);
    });
});

