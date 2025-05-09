const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const container = document.getElementById("content");
const main = document.getElementById("main");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  container.innerHTML = "";

  data.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      popularity,
      release_date,
    } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="overlay"></div>
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <span class="${getColor(vote_average)}">
        ${vote_average.toFixed(1)}</span>
        <div class="movie-info">
            <h3>${title}</h3>
        </div>
        
        `;
    container.appendChild(movieEl);

    movieEl.addEventListener("click", openOverview);
    function openOverview() {
      const overlayOverview = document.createElement("div");
      overlayOverview.classList.add("overview");
      overlayOverview.innerHTML = `
      <div class="container">
        <div class="box">
            <img src="${IMG_URL + poster_path}" alt="${title}"/>
            <div class="description">
                <h3>${title}</h3>
                <div class="info">
                    <p class="rel">${release_date}</p>
                    <p class="avg">${vote_average.toFixed(1)}</p>
                </div>
                <p class="pop">Popularity: ${popularity}</p>
                <p class="over">${overview}</p>
                <button class="close">X</button>
            </div>
        </div>
      </div>
      `;
      main.appendChild(overlayOverview);
      // Close on button click
      overlayOverview
        .querySelector(".close")
        .addEventListener("click", closeOverlay);
      // Close when clicking outside .box (on overlay background)
      overlayOverview.addEventListener("click", (e) => {
        if (e.target === overlayOverview) closeOverlay();
      });

      function closeOverlay() {
        if (overlayOverview) main.removeChild(overlayOverview);
      }
    }
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
