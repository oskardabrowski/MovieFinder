document.addEventListener('DOMContentLoaded', function() {
    let slider, left, right, slidersSet, maxLength, currentPosition;
    let current, next, last, windowWidth, nextImage, nextWidth, nextWidthMargin, normalSlide, slideWidth;
    let halfWindowWidth, halfCurrentWidth, realPosition, currentImage, partOfHeight;
    let currentWidth, normalSlideMargin;
    slider = document.querySelector('.window-slider');
    left = document.querySelector('.window-slider-control-left');
    right = document.querySelector('.window-slider-control-right');
    slidersSet = slider.querySelectorAll('.window-slider-slide');
    maxLength = slidersSet.length;
    currentPosition = 0;
    last = -1;
    current = 0;
    next = 1;

    function startingPosition() {
        setTimeout(() => {
            windowWidth = window.innerWidth;
            currentWidth = parseFloat(getComputedStyle(slidersSet[0]).width);
            halfWindowWidth = windowWidth/2;
            halfCurrentWidth = currentWidth/2;
            realPosition = halfWindowWidth-halfCurrentWidth;
            moveSlider(realPosition);
            nextWidth = parseFloat(getComputedStyle(slidersSet[1]).width);
            nextWidthMargin = nextWidth+10;
            slideWidth = parseFloat(getComputedStyle(slidersSet[2]).width);
            normalSlideMargin = slideWidth+10;
        }, 500);
    }

    right.addEventListener('click', function() {
        console.log('Width: ' + parseFloat(getComputedStyle(slidersSet[0]).width))
        if(currentPosition < maxLength-1) {
            if (currentPosition == 0) {
                moveRight(nextWidthMargin);
            } else if (currentPosition >= 1) {
                moveRight(normalSlideMargin);
            }
            function moveRight(movment) {
                const move = realPosition-movment;
                moveSlider(move);
                realPosition = move;
                currentPosition++;
                last++;
                current++;
                next++;
                changeSliders(last, current, next);
            }
        }
    });
    left.addEventListener('click', function() {
        if(currentPosition != 0) {
            if (currentPosition == 1) {
                moveLeft(nextWidthMargin);
            } else if (currentPosition >= 1) {
                moveLeft(normalSlideMargin);
            }
            function moveLeft(movment) {
                const move = realPosition+movment;
                moveSlider(move);
                realPosition = move;
                currentPosition--;
                last--;
                current--;
                next--;
                changeSliders(last, current, next);
            }
        }
    });

    function moveSlider(position) {
        slider.style.left = `${position}px`;
        realPosition = position;
    }
    function changeSliders(last, current, next) {
        slidersSet.forEach(element => {
            const classes = element.classList;
            const arr = Array.from(classes);
            const boolCurrent = arr.find(item => {if(item == 'current') {return true}});
            const boolLast = arr.find(item => {if(item == 'last') {return true}});
            const boolNext = arr.find(item => {if(item == 'next') {return true}});
            if(boolCurrent) {
                element.classList.remove('current');
            }
            if(boolLast) {
                element.classList.remove('last');
            }
            if(boolNext) {
                element.classList.remove('next');
            }
        });
        if(slidersSet[last]) {slidersSet[last].classList.add('last')};
        slidersSet[current].classList.add('current');
        slidersSet[next].classList.add('next');
    }
    startingPosition();
})