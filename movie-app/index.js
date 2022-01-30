// Script
const main = document.querySelector('.main');
const form = document.querySelector('.header__form');
const search = form.querySelector('.header__search');
const genreList = document.querySelector('.header__genre-list');
const scrollToTopButton = document.querySelector('.btn-to-top');

const API_KEY = 'api_key=6f835e6610ba8bc0c78dd19839a3fe0c';
const BASE_URL = 'https://api.themoviedb.org/3';
const START_PAGE_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}&query=`;
const GENRE_URL = '&with_genres=';

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  }
];

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
        const rating = document.createElement('div');
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

function addGenres() {
  let names = genres.map(element => element.name);

  names.forEach(name => {
    const listitem = document.createElement('li');
    listitem.classList.add('header__list-item');
    listitem.textContent = name;

    genreList.appendChild(listitem);
  })
}

addGenres();

function findMovie(e) {
  e.preventDefault();

  main.innerHTML = '';

  const searchQuery = search.value;
  const requestURL = SEARCH_URL + searchQuery;

  searchQuery ? getMovies(requestURL) : getMovies(START_PAGE_URL);

  // search.value = searchQuery
}

function getMoviesByGenre(e) {
  const selectedGenre = e.target.textContent;
  const selectedGenreID = (genres.find(genre => genre.name === selectedGenre)).id;
  const moviesByGenre = START_PAGE_URL + GENRE_URL + selectedGenreID;

  main.innerHTML = '';

  getMovies(moviesByGenre);
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

form.addEventListener('submit', findMovie);

genreList.addEventListener('click', getMoviesByGenre);

scrollToTopButton.addEventListener('click', scrollToTop);

