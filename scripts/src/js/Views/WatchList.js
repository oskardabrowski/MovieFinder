export default function writeAll(el) {
    el.innerHTML = '';
    if(localStorage.getItem('watchList')) {
        const list = localStorage.getItem('watchList');
        const encodedData = JSON.parse(list);
        let markup = ``;
        encodedData.forEach(el => {
            const element = `<div class="header-containerList-box-list-item">
            <div class="header-containerList-box-list-item-img"><img src="https://image.tmdb.org/t/p/w500/${el.poster}"></div>
            <div class="header-containerList-box-list-item-title">${el.title}</div>
            <button id="${el.id}" class="header-containerList-box-list-item-remove RemoveFromContainerWatchList">Remove</button>
            </div>`;
            markup += element;
        });
        el.insertAdjacentHTML('beforeend', markup);
    }
}