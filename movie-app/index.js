// Script
const main = document.querySelector('.main');
const form = document.querySelector('form');
const search = form.querySelector('.header__search');

const API_KEY = 'api_key=6f835e6610ba8bc0c78dd19839a3fe0c';
const BASE_URL = 'https://api.themoviedb.org/3';
const START_PAGE_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;

console.log(START_PAGE_URL)
