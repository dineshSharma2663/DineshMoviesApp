const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  if (vote >= 7.5) return "green";
  else if (vote >= 7) return "orange";
  else return "red";
};

const showMovies = (movies) => {
  const searchValue = document.getElementById("search").value;
  const headerText = document.getElementById("headerText").innerHTML;
  const searchResults = "Search results for \'".concat(searchValue, "\'");
  document.getElementById("headerText").innerHTML = (searchValue && searchValue !== "") ? searchResults : "Find out your favourite movie."
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  `;
    main.appendChild(movieElement);
  });
};

const showPlaceholder = () => {
  main.innerHTML = "";
  document.getElementById("headerText").innerHTML =  "No movie found for \'".concat(document.getElementById("search").value, "\'");
  const placeHolderElement = document.createElement("div");
  placeHolderElement.classList.add("placeholderContainer");
  placeHolderElement.innerHTML = `
  <div class="placeholderImage">
  <img
      src="moviePlaceholder.png"
      alt="No movie placeholder."
      style="width:250px;height:400px;"
    />
  </div>
  `;
  main.appendChild(placeHolderElement);
}

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  if (data.results.length > 0) {
    showMovies(data.results);
  } else {
    showPlaceholder();
  }
};

getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    //search.value = "";
  } else history.go(0);
});
