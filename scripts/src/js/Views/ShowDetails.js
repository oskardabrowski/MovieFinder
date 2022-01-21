export default async function showselectedMovie(id, el, api, key,) {
    el.innerHTML = '';
    let data, stars, trailer, background;
    const searched = localStorage.getItem('lastSearched');
    const json = JSON.parse(searched);
    json.forEach(el => {
        if(el.id == id) {
            data = el;
        }
    });
    const mark = data.voteAverage;
    stars = '';
    for(let i = 1; i <= 10; i++) {
        if(i < mark) {
            stars += `<svg>
                        <use xlink:href="./img/icons/star.svg#star">
                    </svg>`
        } else if (i > mark) {
            if((mark-(i-1)) > 0.5) {
                stars += `<svg>
                        <use xlink:href="./img/icons/halfStar.svg#half">
                    </svg>`
            } else {
                stars += `<svg>
                            <use xlink:href="./img/icons/emptyStar.svg#empty">
                        </svg>`;
            }
        }
    }

    try {
        const getTrailer = await fetch(`${api}${id}?api_key=${key}&append_to_response=videos`);
        const trailersJSON = await getTrailer.json();
        const results = trailersJSON.videos.results;
        for(let i = 0; i < results.length; i++) {
            if(results[i].type == "Trailer" && results[i].site == "YouTube") {
                trailer = results[i].key;
                break;
            }
        }
        if(data.back != null) {
            background = `https://image.tmdb.org/t/p/w500/${data.back}`;
        } else {
            background = `./img/pictures/default.jpg`;
        }
    } catch(e) {
        alert("Something went wrong and the trailer didn't load")
    }


    function checkIsFavorite() {
        if(localStorage.getItem('Favorites')) {
            const data = localStorage.getItem('Favorites');
            const encodedData = JSON.parse(data);
            let exists = false;
            encodedData.forEach(el => {if(el.id == id) {exists = true}});
            if(exists != false) {
                return `<svg>
                <use xlink:href="./img/icons/favorite_black_24dp.svg#favfill">
                </svg>`;
            } else {
                return `<svg>
                <use xlink:href="./img/icons/favorite_border_black_24dp.svg#favempty">
                </svg>`;
            }
        } else {
            return `<svg>
                <use xlink:href="./img/icons/favorite_border_black_24dp.svg#favempty">
                </svg>`;
        }
    }
    function checkIsWatch() {
        if(localStorage.getItem('watchList')) {
            const data = localStorage.getItem('watchList');
            const encodedData = JSON.parse(data);
            let exists = false;
            encodedData.forEach(el => {if(el.id == id) {exists = true}});
            if(exists != false) {
                return `<svg>
                <use xlink:href="./img/icons/task_alt_black_24dp.svg#task">
                </svg>`;
            } else {
                return `<svg>
                <use xlink:href="./img/icons/list_alt_black_24dp.svg#list">
                </svg>`;
            }
        } else {
            return `<svg>
                <use xlink:href="./img/icons/list_alt_black_24dp.svg#list">
                </svg>`;
        }
    }

    const markup = `<div class="selectedMovie-back">
    <img src="${background}">
</div>
<div class="selectedMovie-container">
    <div class="selectedMovie-container-img">
        <img src="https://image.tmdb.org/t/p/w500/${data.poster}">
    </div>
    <div class="selectedMovie-container-data">
        <div class="selectedMovie-container-data-btns">
            <button class="FavoriteButton" id="${data.id}">
                ${checkIsFavorite()}
            </button>
            <button class="AddToWatchListBtn" id="${data.id}">
                ${checkIsWatch()}
            </button>
            <button class="TrailerButton" trailer="${trailer}">
                <svg>
                    <use xlink:href="./img/icons/movie_black_24dp.svg#movie">
                </svg>
            </button>
        </div>
        <div class="selectedMovie-container-data-title">${data.title}</div>
        <div class="selectedMovie-container-data-rating">
            <div class="selectedMovie-container-data-rating-stars">
                ${stars}
            </div>
            <div class="selectedMovie-container-data-rating-number">Ocena: ${data.voteAverage}</div>
            <div class="selectedMovie-container-data-rating-voices">Na podstawie ${data.voteCount} głosów</div>
        </div>
        <div class="selectedMovie-container-data-premiereDate">Data premiery: ${data.releaseDate}</div>
        <div class="selectedMovie-container-data-overview">${data.overview}</div>
    </div>
</div>`;
el.insertAdjacentHTML('beforeend', markup);
}