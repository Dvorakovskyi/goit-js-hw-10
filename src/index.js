import './css/styles.css';
import { RestCountriesAPI } from './fetchCountries';

const DEBOUNCE_DELAY = 300;





const inputEl = document.querySelector('#search-box');

const restCountriesAPI = new RestCountriesAPI();

const handleSearchCountries = (event) => {
    const searchCountry = event.target.value;

    restCountriesAPI.fetchCountries(searchCountry)
        .then(data => {
            console.log(data[0]);
    })
};

inputEl.addEventListener('input', handleSearchCountries);