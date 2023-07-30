const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_Adr5DPl9ug9FXQm48WnKX3GRjc8afJVruoe7V3Uz2ld7gLF9Ui8UmYzZGE1G6ZVY';

const option = {
  method: 'GET',
  headers: {
    'x-api-key': API_KEY,
  },
};

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`, option).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, option).then(
    response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
