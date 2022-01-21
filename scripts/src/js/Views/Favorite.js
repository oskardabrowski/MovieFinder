export default function writeFavorities(el) {
    if(localStorage.getItem('Favorites')) {
        el.innerHTML = '';
        const data = localStorage.getItem('Favorites');
        const encodedData = JSON.parse(data);
        let markup = ``;
        function checkIsWatch(el) {
            if(localStorage.getItem('watchList')) {
                const data = localStorage.getItem('watchList');
                const encoded = JSON.parse(data);
                let exists = false;
                encoded.forEach(element => {if(element.id == el.id) {exists = true}});
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
        encodedData.forEach(el => {
            const item = `<div class="header-containerLiked-box-list-item">
                <div class="header-containerLiked-box-list-item-img"><img src="https://image.tmdb.org/t/p/w500/${el.poster}"></div>
                <div class="header-containerLiked-box-list-item-title">${el.title}</div>
                <div class="header-containerLiked-box-list-item-options">
                    <button id="${el.id}" class="RemoveFromFavoriteBtn">
                        <svg>
                            <use xlink:href="./img/icons/favorite_black_24dp.svg#favfill">
                        </svg>
                    </button>
                    <button id="${el.id}" class="AddToWatchList">
                        ${checkIsWatch(el)}
                    </button>
                    <button id="${el.id}" class="WatchTrailerFromFav">
                        <svg>
                            <use xlink:href="./img/icons/movie_black_24dp.svg#movie">
                        </svg>
                    </button>
                </div>
            </div>`;
            markup += item;
        });
        el.insertAdjacentHTML('beforeend', markup);
    }
}