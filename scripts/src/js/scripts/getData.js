export default async function getMoviesData(api, key, query) {
    const data = await fetch(`${api}?api_key=${key}&query=${query}&language=pl&include_image_language=pl,null&append_to_response=videos`);
    const jsonData = await data.json();
    const results = jsonData.results;
    return results;
}
