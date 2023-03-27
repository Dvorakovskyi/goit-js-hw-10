import './css/styles.css';
import { RestCountriesAPI } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  contryList: document.querySelector('.country-list'),
  contryInfo: document.querySelector('.country-info'),
};

const restCountriesAPI = new RestCountriesAPI();

const handleSearchCountries = event => {
  const searchCountry = event.target.value.trim();

  if (searchCountry === '') {
    clearInfo();
  } else {
    restCountriesAPI
      .fetchCountries(searchCountry)
      .then(data => {
        if (data.length === 1) {
          createCountryInfo(data);
        } else if (data.length > 1 && data.length <= 10) {
          createCountryList(data);
        } else {
          clearInfo();

          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(() => {
        clearInfo();

        Notify.failure('Oops, there is no country with that name');
      });
  }
};

refs.input.addEventListener(
  'input',
  debounce(handleSearchCountries, DEBOUNCE_DELAY)
);

const clearInfo = () => {
  refs.contryList.innerHTML = '';
  refs.contryInfo.innerHTML = '';
};

const createCountryList = data => {
  const countryItem = data
    .map(
      data => `<li>
            <p><img src=${data.flags.svg} alt=${data.flags.alt} width="20" height="15"> ${data.name.official}</p>
          </li>`
    )
    .join('');
  refs.contryList.innerHTML = countryItem;
  refs.contryInfo.innerHTML = '';
};

const createCountryInfo = data => {
  const countryInfo = data
    .map(
      data => `
          <h2><img src=${data.flags.svg} alt=${data.flags.alt} width="20" height="15"> ${
        data.name.official
      }</h2>
          <p><b>Capital:</b> ${data.capital}</p>
          <p><b>Population:</b> ${data.population}</p>
          <p><b>Languages:</b> ${Object.values(data.languages)}</p>`
    )
    .join('');
  refs.contryInfo.innerHTML = countryInfo;
  refs.contryList.innerHTML = '';
};