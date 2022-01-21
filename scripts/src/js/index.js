import "./scripts/mobileMenu";

import insertRandomImg from "./scripts/randomImg";
import slider from "./scripts/slider";
import getMoviesData from "./scripts/getData";
import Names from "./models/Names";
import * as loader from "./scripts/loader";
import createSlides from "./Views/CreateSlider";
import searchedData from "./models/searchedData";
import showselectedMovie from "./Views/ShowDetails";
import viewTrailer from "./Views/viewTrailer";
import * as liked from "./scripts/liked";
import AddToWatchList from "./scripts/WatchListAdd";
import writeAll from "./Views/WatchList";
import remover from "./scripts/removeWatchWindow";
import AddToFavorite from "./scripts/addToFavorite";
import writeFavorities from "./Views/Favorite";
import removeFromFavorities from "./scripts/removeFromFavorities";
import addWatchFromFavorities from "./scripts/addWatchFromFav";
import watchTrailerFromFav from "./Views/watchTrailerFromFav";

insertRandomImg();
let data, searched, sliders;

const searchMovie = (name) => {
    const query = name;
    console.log('Called')
    async function createSlider(query) {
        loader.showLoader();
        data = await getMoviesData(Names.TMDBSearchApi, Names.TMDBapiKey, query);
        searched = [];
        await data.forEach(el => {
            const obj = new searchedData(el.id, el.backdrop_path, el.poster_path, el.title, el.overview, el.release_date, el.vote_average, el.vote_count);
            searched.push(obj);
        });
        const json = JSON.stringify(searched);
        localStorage.setItem('lastSearched', json);

        await createSlides(data, Names.sliderElement);
        sliders = document.querySelectorAll('.window-slider-slide');
        sliders.forEach(el => {
            el.addEventListener('click', async function() {
                const movieId = el.getAttribute('id');
                loader.showLoader();
                await showselectedMovie(movieId, Names.selectedMovie, Names.TMDBMovieApi, Names.TMDBapiKey);
                viewTrailer();
                loader.hideLoader();
                const addToWatchListBtn = document.querySelector('.AddToWatchListBtn');
                const FavoriteButton = document.querySelector('.FavoriteButton');
                addToWatchListBtn.addEventListener('click', function() {
                    const thisElId = addToWatchListBtn.getAttribute('id');
                    const exists = AddToWatchList(thisElId);
                    if(!exists) {
                        addToWatchListBtn.innerHTML = `<svg>
                        <use xlink:href="./img/icons/task_alt_black_24dp.svg#task">
                        </svg>`;
                    } else {
                        addToWatchListBtn.innerHTML = `<svg>
                        <use xlink:href="./img/icons/list_alt_black_24dp.svg#list">
                        </svg>`;
                    }
                })
                FavoriteButton.addEventListener('click', function() {
                    const thisElId = FavoriteButton.getAttribute('id');
                    const exists = AddToFavorite(thisElId);
                    if(!exists) {
                        FavoriteButton.innerHTML = `<svg>
                        <use xlink:href="./img/icons/favorite_black_24dp.svg#favfill">
                        </svg>`;
                    } else {
                        FavoriteButton.innerHTML = `<svg>
                        <use xlink:href="./img/icons/favorite_border_black_24dp.svg#favempty">
                        </svg>`;
                    }
                })
            });
        })
        await slider();
        loader.hideLoader();
    }
    try {
        createSlider(query);
    } catch (e) {
        alert("Something went wrong while creating sliders, try agin");
        loader.hideLoader();
    }
};

Names.MovieSearchBtnMobile.addEventListener('click', () => searchMovie(Names.MovieSearchInputMobile.value));
Names.MovieSearchBtn.addEventListener('click', () => searchMovie(Names.MovieSearchInput.value));

Names.FavoriteContainerBtn.forEach(el => {
    el.addEventListener('click', async function() {
        loader.showLoader();
        await writeFavorities(Names.FavoriteContainerBox);
        await removeFromFavorities(Names.FavoriteContainerBox);
        await addWatchFromFavorities();
        await watchTrailerFromFav(Names.TMDBMovieApi, Names.TMDBapiKey);
        liked.likedList(Names.FavoriteContainer);
        loader.hideLoader();
    })
})

Names.WatchListBtn.forEach(el => {
    el.addEventListener('click', async function() {
        loader.showLoader();
        await writeAll(Names.WatchListContainer);
        await remover();
        liked.likedList(Names.WatchList);
        loader.hideLoader();
    })
})
