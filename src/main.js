import {createUserRankTemplate} from "./view/user-rank";
import {createMenuTemplate} from "./view/menu";
import {createFilmBoardTemplate} from "./view/film-board";
import {createFilmCard} from "./view/card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFooterStatisticTemplate} from "./view/footer-statistic";
import {createFilmDetails} from "./view/film-details";
import {generateFilm} from "./mock/film";
import {generateComments} from "./mock/comments";
import {generateFilter} from "./mock/filter";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, NUMBER_MOCK} from "./const.js";

const films = new Array(NUMBER_MOCK).fill().map(generateFilm);
const comments = new Array(NUMBER_MOCK).fill().map(generateComments);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

render(header, createUserRankTemplate(), `beforeend`);
render(main, createMenuTemplate(filters), `beforeend`);
render(main, createFilmBoardTemplate(), `beforeend`);

const filmList = main.querySelector(`.films-list`);
const containerForAllMovies = filmList.querySelector(`.films-list__container`);
const extrafilms = main.querySelectorAll(`.films-list--extra`);
const containerForTopRatedMovies = extrafilms[0].querySelector(`.films-list__container`);
const containerForMostCommntedMovies = extrafilms[1].querySelector(`.films-list__container`);
const footer = document.querySelector(`footer`);

for (let i = 0; i < Math.min(films.length, NUMBER_OF_FILMS); i++) {
  render(containerForAllMovies, createFilmCard(films[i]), `beforeend`);
}

for (let i = 0; i < NUMBER_OF_EXTRA_FILMS; i++) {
  render(containerForTopRatedMovies, createFilmCard(films[i]), `beforeend`);
}

for (let i = 0; i < NUMBER_OF_EXTRA_FILMS; i++) {
  render(containerForMostCommntedMovies, createFilmCard(films[i]), `beforeend`);
}

const body = document.querySelector(`body`);
const cards = body.querySelectorAll(`.film-card`);

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

const closeCard = () => {
  const filmDetails = document.querySelector(`.film-details`);
  body.removeChild(filmDetails);
  document.removeEventListener(`keydown`, onCardEscPress);
  let closeButton = filmDetails.querySelector(`.film-details__close-btn`);
  closeButton.removeEventListener(`click`, closeCard);
};

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener(`click`, function () {
    render(footer, createFilmDetails(films[i], comments[i]), `afterend`);
    let closeButton = body.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, closeCard);
    document.addEventListener(`keydown`, onCardEscPress);
  });
}

let renderedFilmCount = NUMBER_OF_FILMS;

if (films.length > NUMBER_OF_FILMS) {
  render(filmList, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + NUMBER_OF_FILMS)
      .forEach((film) => render(containerForAllMovies, createFilmCard(film), `beforeend`));

    renderedFilmCount += NUMBER_OF_FILMS;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(footer, createFooterStatisticTemplate(), `beforeend`);
