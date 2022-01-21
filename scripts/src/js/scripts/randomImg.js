export default function insertRandomImg() {
    const imgLotery = Math.floor(Math.random() * 3) + 1;
    const container = document.querySelector('.ImageHtmlContiner');
    let img;

    switch(imgLotery) {
        case 1:
            img = `<img class="window-image" src="./img/pictures/samuel-regan-asante-wMkaMXTJjlQ-unsplash.jpg">`;
        break;
        case 2:
            img = `<img class="window-image" src="./img/pictures/serge-kutuzov-7ya3l_JdHpM-unsplash.jpg">`;
        break;
        case 3:
            img = `<img class="window-image" src="./img/pictures/steven-lasry-LtDKx9ICQuI-unsplash.jpg">`;
        break;
        default:
            img = `<img class="window-image" src="./img/pictures/samuel-regan-asante-wMkaMXTJjlQ-unsplash.jpg">`;
        break;
    }

    container.innerHTML = img;
}