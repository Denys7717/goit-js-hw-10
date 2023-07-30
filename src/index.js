import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');
const loaderElm = document.querySelector('.loader');
const errorElm = document.querySelector('.error');

select.classList.add('is-hidden');
errorElm.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

select.addEventListener('change', onChange, false);

function onChange() {
  loaderElm.classList.remove('is-hidden');
  errorElm.classList.add('is-hidden');
  catInfo.innerHTML = '';
  fetchCatByBreed(select.value)
    .then(data => {
      catInfo.insertAdjacentHTML('beforeend', createCardMarkup(data));
      loaderElm.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
      select.classList.remove('is-hidden');
    })
    .catch(catchError);
}

fetchBreeds()
  .then(data => {
    select.insertAdjacentHTML('beforeend', createMarkup(data));
    select.classList.remove('is-hidden');
    loaderElm.classList.add('is-hidden');
    new SlimSelect({
      select: select,
    });
  })
  .catch(catchError);

function createMarkup(array) {
  return array
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join();
}

function createCardMarkup(array) {
  return array
    .map(
      ({ url, breeds: [{ name, description, temperament }] }) =>
        `<img src="${url}" alt="${name}"><h1>${name}</h1><h2>Temperament: ${temperament}</h2><p>${description}</p>`
    )
    .join();
}

function catchError(error) {
  loaderElm.classList.add('is-hidden');
  errorElm.classList.remove('is-hidden');
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '200px',
    }
  );
}
