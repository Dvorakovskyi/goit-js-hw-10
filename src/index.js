import './css/styles.css';
import { RestCountriesAPI } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const contryListEl = document.querySelector('.country-list');

const restCountriesAPI = new RestCountriesAPI();

const handleSearchCountries = event => {
  const searchCountry = event.target.value;

    restCountriesAPI
        .fetchCountries(searchCountry)
        .then(data => {
            const countryInfo = data
                .map((data) => `<li>
          <h2><img src=${data.flags.svg} width="20" height="15"> ${data.name.official}</h2>
          <p>Capital: ${data.capital}</p>
          <p>Population: ${data.population}</p>
          <p>Languages: ${Object.values(data.languages)}</p>
      </li>`)
                .join('');
            contryListEl.innerHTML = countryInfo;
        });
  
};

// function renderCountryCard(data) {
//   const countryInfo = data
//     .map(data => `<li>
//         <h2><img src=${data.flags.svg} width="20" height="15"> ${data.name.official}</h2>
//         <p>Capital: ${data.capital}</p>
//         <p>Population: ${data.population}</p>
//         <p>Languages: ${Object.values(data.languages)}</p>
//     </li>`
//     )
//     .join('');
//     contryListEl.innerHTML = countryInfo;
// }

inputEl.addEventListener(
  'input',
  debounce(handleSearchCountries, DEBOUNCE_DELAY)
);
