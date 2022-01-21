export default function AddToWatchList(id) {
    let thisElement, exists;
    if(localStorage.getItem('watchList')) {
        let data = localStorage.getItem('watchList');
        let json = JSON.parse(data);
        exists = false;
        json.forEach(el => {if(el.id == id) { exists = true; }});
        console.log(exists)
        if(exists == false) {
            const searched = localStorage.getItem('lastSearched');
            const jsonSearched = JSON.parse(searched);
            let newData = [];
            json.forEach(el => {
                newData.push(el);
            })
            jsonSearched.forEach(el => {
                if(el.id == id) {
                    thisElement = el;
                    newData.push(thisElement);
                }
            });
            const preparedData = JSON.stringify(newData);
            localStorage.setItem('watchList', preparedData);
            return exists;
        } else {
            let newArray = json.filter(el => {if(el.id != id) {return el}});
            const preparedData = JSON.stringify(newArray);
            localStorage.setItem('watchList', preparedData);
            return exists;
        }
    } else {
        const searched = localStorage.getItem('lastSearched');
        const json = JSON.parse(searched);
        let newData = [];
        json.forEach(el => {
            if(el.id == id) {
                thisElement = el;
                newData.push(thisElement);
            }
        });
        const preparedData = JSON.stringify(newData);
        localStorage.setItem('watchList', preparedData);
        return exists;
    }
}