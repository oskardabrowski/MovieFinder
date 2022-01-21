export default function remover() {
    const buttons = document.querySelectorAll('.RemoveFromContainerWatchList');
    buttons.forEach(el => {
        el.addEventListener('click', function() {
            const data = localStorage.getItem('watchList');
            const encodedData = JSON.parse(data);
            const elId = el.getAttribute('id');
            const newData = encodedData.filter(el => {if(el.id != elId) {return el}});
            const preparedData = JSON.stringify(newData);
            localStorage.setItem('watchList', preparedData);

            let containerList = document.querySelector('.header-containerList-box-list');
            containerList.innerHTML = '';
            let markup = ``;
            newData.forEach(el => {
                const element = `<div class="header-containerList-box-list-item">
                <div class="header-containerList-box-list-item-img"><img src="https://image.tmdb.org/t/p/w500/${el.poster}"></div>
                <div class="header-containerList-box-list-item-title">${el.title}</div>
                <button id="${el.id}" class="header-containerList-box-list-item-remove RemoveFromContainerWatchList">Remove</button>
                </div>`;
                markup += element;
            });
            containerList.insertAdjacentHTML('beforeend', markup);
            remover();
        });
    });
}
    