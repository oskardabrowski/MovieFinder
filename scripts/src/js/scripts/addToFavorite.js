export default function AddToFavorite(id) {
    if(localStorage.getItem('Favorites')) {
        let newData, exists;
        const favorities = localStorage.getItem('Favorites');
        const encodedFavorities = JSON.parse(favorities);
        exists = false;
        encodedFavorities.forEach(el => {if(el.id == id) {exists = true}});
        if(!exists) {
            const data = localStorage.getItem('lastSearched');
            const encodedData = JSON.parse(data);
            newData = [];
            encodedFavorities.forEach(el => {
                newData.push(el);
            });
            encodedData.forEach(el => {
                if(el.id == id) {
                    newData.push(el);
                }
            });
            const preparedData = JSON.stringify(newData);
            localStorage.setItem('Favorites', preparedData);
            return exists;
        } else {
            const newArray = encodedFavorities.filter(el => {if(el.id != id) {return el}});
            const preparedData = JSON.stringify(newArray);
            localStorage.setItem('Favorites', preparedData);
            return exists;
        }
    } else {
        let newData;
        newData = [];
        const data = localStorage.getItem('lastSearched');
        const encodedData = JSON.parse(data);
        encodedData.forEach(el => {
            if(el.id == id) {
                newData.push(el);
            }
        });
        const preparedData = JSON.stringify(newData);
        localStorage.setItem('Favorites', preparedData);
        return exists;
    }
}