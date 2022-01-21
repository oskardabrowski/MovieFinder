export default function removeFromFavorities(element) {
    const allBtns = document.querySelectorAll('.RemoveFromFavoriteBtn');
    allBtns.forEach(el => {
        el.addEventListener('click', async function() {
            const elId = el.getAttribute('id');
            const data = localStorage.getItem('Favorites');
            const encodedData = JSON.parse(data);
            const newData = encodedData.filter(el => {if(el.id != elId) {return el}});
            const preparedData = JSON.stringify(newData);
            localStorage.setItem('Favorites', preparedData);
            removeFromFavorities();

            element.innerHTML = '';
            let markup = ``;
            newData.forEach(el => {
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
                            <svg>
                                <use xlink:href="./img/icons/list_alt_black_24dp.svg#list">
                            </svg>
                        </button>
                        <button id="${el.id}" class="WatchTrailer">
                            <svg>
                                <use xlink:href="./img/icons/movie_black_24dp.svg#movie">
                            </svg>
                        </button>
                    </div>
                </div>`;
                markup += item;
            });
            element.insertAdjacentHTML('beforeend', markup);
        })
    })
}