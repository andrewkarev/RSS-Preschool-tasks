// Script
const main = document.querySelector('.main');
const form = document.querySelector('.header__form');
const search = form.querySelector('.header__search');

const API_KEY = 'api_key=6f835e6610ba8bc0c78dd19839a3fe0c';
const BASE_URL = 'https://api.themoviedb.org/3';
const START_PAGE_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}&query=`

function getMovies(url) {
  fetch(url).then(response => response.json())
    .then(function displayMovies(data) {
      data.results.forEach(element => {
        const item = document.createElement('div');
        item.classList.add('main__item');
        const image = document.createElement('img');
        image.classList.add('main__img');
        const about = document.createElement('div');
        about.classList.add('main__about');
        const title = document.createElement('h2');
        title.classList.add('main__movie-title');
        const rating = document.createElement('div')
        rating.classList.add('main__movie-rating');
        const overview = document.createElement('div');
        overview.classList.add('main__movie-overview');

        image.src = IMG_PATH + element.poster_path;
        title.textContent = element.title;
        rating.textContent = element.vote_average;
        overview.textContent = element.overview;

        rating.classList.add(highlightRating(rating.textContent));

        main.appendChild(item);
        item.appendChild(image);
        item.appendChild(about);
        about.appendChild(title);
        about.appendChild(rating);
        about.appendChild(overview);
      });
    })
}

getMovies(START_PAGE_URL);

function highlightRating(rate) {
  if (rate >= 7) {
    return 'perfect';
  } else if (rate >= 5.5) {
    return "fine";
  } else {
    return 'bad';
  }
}

function findMovie(e) {
  e.preventDefault();

  main.innerHTML = '';

  const searchQuery = search.value;
  const requestURL = SEARCH_URL + searchQuery;

  searchQuery ? getMovies(requestURL) : getMovies(START_PAGE_URL);

  // search.value = searchQuery
}

form.addEventListener('submit', findMovie);