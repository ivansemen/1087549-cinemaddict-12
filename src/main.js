import {createUserRankTemplate} from "./view/user-rank";
import {createMenuTemplate} from "./view/menu";
import {createFilmBoardTemplate} from "./view/film-board";
import {createFilmCard} from "./view/card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFooterStatisticTemplate} from "./view/footer-statistic";

const NUMBER_OF_FILMS = 5;
const NUMBER_OF_EXTRA_FILMS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

render(header, createUserRankTemplate(), `beforeend`);
render(main, createMenuTemplate(), `beforeend`);
render(main, createFilmBoardTemplate(), `beforeend`);

const filmList = main.querySelector(`.films-list`);
const containerForAllMovies = filmList.querySelector(`.films-list__container`);
const extrafilms = main.querySelectorAll(`.films-list--extra`);
const containerForTopRatedMovies = extrafilms[0].querySelector(`.films-list__container`);
const containerForMostCommntedMovies = extrafilms[1].querySelector(`.films-list__container`);

for (let i = 0; i < NUMBER_OF_FILMS; i++) {
  render(containerForAllMovies, createFilmCard(), `beforeend`);
}

for (let j = 0; j < NUMBER_OF_EXTRA_FILMS; j++) {
  render(containerForTopRatedMovies, createFilmCard(), `beforeend`);
}

for (let k = 0; k < NUMBER_OF_EXTRA_FILMS; k++) {
  render(containerForMostCommntedMovies, createFilmCard(), `beforeend`);
}

render(filmList, createShowMoreButtonTemplate(), `beforeend`);

const footer = document.querySelector(`footer`);
render(footer, createFooterStatisticTemplate(), `beforeend`);
