async function getMoviesData() {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?api_key=fdf6f8747d46822a268e638230bc3fa7&query=Batman&language=pl&include_image_language=pl,null');
    const jsonData = await data.json();
    const results = jsonData.results;
    console.log(results);
}
getMoviesData();

