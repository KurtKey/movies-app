const API_TOKEN = "a3419bf0b7ca2a33db3077cd5ff95f5f";
export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))

  }
  // API/TMDBApi.js

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }

  export function getMovieDetail  (id) {
    const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=' + API_TOKEN + '&language=fr'
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }