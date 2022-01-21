document.addEventListener('DOMContentLoaded', function() {
    const MobileNavButton = document.querySelector('.MobileNavButton');
    const MobileNavMenu = document.querySelector('.header-containerMobile');
    MobileNavButton.addEventListener('click', function() {
        if(!MobileNavMenu.classList.contains('mobilePath100')) {
            MobileNavMenu.classList.add('mobilePath100');
            MobileNavButton.innerHTML= `<svg>
            <use xlink:href="./img/icons/close_black_24dp.svg#close"></use>
        </svg>`;
        } else {
            MobileNavMenu.classList.remove('mobilePath100');
            MobileNavButton.innerHTML= `<svg>
            <use xlink:href="./img/icons/menu_black_24dp.svg#menu"></use>
        </svg>`;
        }
    })
})