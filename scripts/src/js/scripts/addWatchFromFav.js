export default function addWatchFromFavorities() {
    const btn = document.querySelectorAll('.AddToWatchList');
    btn.forEach(el => {
        el.addEventListener('click', function() {
            const thisId = el.getAttribute('id');
            const favorities = localStorage.getItem('Favorites');
            const encodedFavorities = JSON.parse(favorities);
            const WatchList = localStorage.getItem('watchList');
            const encodedWatchList = JSON.parse(WatchList);
            let exists = false;
            encodedWatchList.forEach(el => {if(el.id == thisId) {exists = true}});
            if(!exists) {
                let newData = [];
                encodedWatchList.forEach(el => {
                    newData.push(el);
                })
                encodedFavorities.forEach(el => {
                    if(el.id == thisId) {
                        newData.push(el);
                    }
                });
                const preparedData = JSON.stringify(newData);
                localStorage.setItem('watchList', preparedData);
                el.innerHTML = `<svg>
                <use xlink:href="./img/icons/task_alt_black_24dp.svg#task">
                </svg>`;
            } else {
                let newData = encodedWatchList.filter(el => {
                    if(el.id != thisId) {return el}
                });
                const preparedData = JSON.stringify(newData);
                localStorage.setItem('watchList', preparedData);
                el.innerHTML = `<svg>
                <use xlink:href="./img/icons/list_alt_black_24dp.svg#list">
                </svg>`;
            }
        })
    })
}