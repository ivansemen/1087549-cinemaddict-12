import {createUserRankTemplate} from "./view/user-rank";
import {createMenuTemplate} from "./view/menu";
import {createContainerForFilmsTemplate} from "./view/container";
import {createCardForAllMoviesTemplate} from "./view/card";
import {createButtonShowMoreTemplate} from "./view/button-load";
import {createfooterStatisticTemplate} from "./view/footer-statistic";

const NUMBER_OF_FILMS = 5;
const NUMBER_OF_EXTRA_FILMS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

render(header, createUserRankTemplate(), `beforeend`);
render(main, createMenuTemplate(), `beforeend`);
render(main, createContainerForFilmsTemplate(), `beforeend`);

const filmList = main.querySelector(`.films-list`);
const containerForAllMovies = filmList.querySelector(`.films-list__container`);
const extrafilms = main.querySelectorAll(`.films-list--extra`);
const containerForTopRatedMovies = extrafilms[0].querySelector(`.films-list__container`);
const containerForMostCommntedMovies = extrafilms[1].querySelector(`.films-list__container`);

for (let i = 0; i < NUMBER_OF_FILMS; i++) {
  render(containerForAllMovies, createCardForAllMoviesTemplate(), `beforeend`);
}

for (let j = 0; j < NUMBER_OF_EXTRA_FILMS; j++) {
  render(containerForTopRatedMovies, createCardForAllMoviesTemplate(), `beforeend`);
}

for (let k = 0; k < NUMBER_OF_EXTRA_FILMS; k++) {
  render(containerForMostCommntedMovies, createCardForAllMoviesTemplate(), `beforeend`);
}

render(filmList, createButtonShowMoreTemplate(), `beforeend`);

const footer = document.querySelector(`footer`);
render(footer, createfooterStatisticTemplate(), `beforeend`);
