export default async function watchTrailerFromFav(api, key) {
    const allBtns = document.querySelectorAll('.WatchTrailerFromFav');
    allBtns.forEach(el => {
        el.addEventListener('click', async function() {
            try {
                let trailer, videoDiv, container, iframe, close, id;
                id = el.getAttribute('id');
                const getTrailer = await fetch(`${api}${id}?api_key=${key}&append_to_response=videos`);
                console.log(getTrailer);
                const trailersJSON = await getTrailer.json();
                const results = trailersJSON.videos.results;
                console.log(results);
                for(let i = 0; i < results.length; i++) {
                    if(results[i].type == "Trailer" && results[i].site == "YouTube") {
                        trailer = results[i].key;
                        break;
                    }
                }
                videoDiv = document.querySelector('.videoDiv');
                container = document.querySelector('.header-containerTrailer');
                iframe = videoDiv.querySelector('iframe');
                close = videoDiv.querySelector('button');
                const markup = `<iframe src="https://www.youtube.com/embed/${trailer}" title="YouTube video player"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>`;
                videoDiv.insertAdjacentHTML('beforeend', markup);
                container.classList.remove('dnone');
                close.addEventListener('click', function() {
                    container.classList.add('dnone');
                    iframe = videoDiv.querySelector('iframe');
                    iframe.remove();
                })
            } catch (e) {
                alert("Something went wrong, please try agin later!")
            }
        })
    })
}