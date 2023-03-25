export class RestCountriesAPI {
    #BASE_URL = 'https://restcountries.com';
    #BASE_PARAMS = 'fields=name;fields=capital;fields=population;fields=flags;fields=languages';

    fetchCountries(name) {
        return fetch(`${this.#BASE_URL}/v3.1/name/${name}?${this.#BASE_PARAMS}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
        })
    }
}
