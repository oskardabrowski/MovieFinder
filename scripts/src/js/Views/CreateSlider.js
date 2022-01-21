export default function createSlides(data, el) {
    el.innerHTML = '';
    const controlLeft = document.querySelector('.window-slider-control-left');
    const controlRight = document.querySelector('.window-slider-control-right');
    if(controlRight) {
        controlRight.remove();
    }
    if(controlLeft) {
        controlLeft.remove();
    }
    let markup = ``;
    const controls = `
    <div class="window-slider-control-left">
        <svg>
            <use xlink:href="./img/icons/arrowLeft.svg#left"></use>
        </svg>
    </div>
    <div class="window-slider-control-right">
        <svg>
            <use xlink:href="./img/icons/arrowRight.svg#right"></use>
        </svg>
    </div>
    `;

    for(let i = 0; i < data.length; i++) {
        const thisData = data[i];
        if(thisData.poster_path != null) {
            if(i == 0) {
                markup += `<div class="window-slider-slide current" id="${thisData.id}">
                            <img src="https://image.tmdb.org/t/p/w500/${thisData.poster_path}">
                            </div>`
            } else if (i == 1) {
                markup += `<div class="window-slider-slide next" id="${thisData.id}">
                            <img src="https://image.tmdb.org/t/p/w500/${thisData.poster_path}">
                            </div>`
            } else {
                markup += `<div class="window-slider-slide" id="${thisData.id}">
                            <img src="https://image.tmdb.org/t/p/w500/${thisData.poster_path}">
                            </div>`
            }
        }
    }
    el.insertAdjacentHTML('afterbegin', markup);
    el.insertAdjacentHTML('afterend', controls);

}