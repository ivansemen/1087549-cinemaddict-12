import {generateFilm} from "./mock/film";
import {generateComments} from "./mock/comments";
import {generateFilterData} from "./mock/filter";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, NUMBER_MOCK} from "./const.js";
import {createUserRankTemplate, createMenuTemplate, createFilterTemplate, createFilmBoardTemplate, createFilmCardTemplate, createShowMoreButtonTemplate, createFooterStatisticTemplate, createFilmDetailsTemplate} from "./view";
import {renderTemplate} from "./utils";

const films = new Array(NUMBER_MOCK).fill().map(generateFilm);
const comments = new Array(NUMBER_MOCK).fill().map(generateComments);
const filterItems = generateFilterData(films);

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

renderTemplate(header, createUserRankTemplate(), `beforeend`);
renderTemplate(main, createMenuTemplate(), `beforeend`);
renderTemplate(main, createFilmBoardTemplate(), `beforeend`);

const navigation = main.querySelector(`.main-navigation`);
renderTemplate(navigation, createFilterTemplate(filterItems), `afterbegin`);

const filmList = main.querySelector(`.films-list`);
const containerForAllMovies = filmList.querySelector(`.films-list__container`);
const extrafilms = main.querySelectorAll(`.films-list--extra`);
const containerForTopRatedMovies = extrafilms[0].querySelector(`.films-list__container`);
const containerForMostCommntedMovies = extrafilms[1].querySelector(`.films-list__container`);
const footer = document.querySelector(`footer`);

for (let i = 0; i < Math.min(films.length, NUMBER_OF_FILMS); i++) {
  renderTemplate(containerForAllMovies, createFilmCardTemplate(films[i]), `beforeend`);
}

for (let i = 0; i < NUMBER_OF_EXTRA_FILMS; i++) {
  renderTemplate(containerForTopRatedMovies, createFilmCardTemplate(films[i]), `beforeend`);
}

for (let i = 0; i < NUMBER_OF_EXTRA_FILMS; i++) {
  renderTemplate(containerForMostCommntedMovies, createFilmCardTemplate(films[i]), `beforeend`);
}

const body = document.querySelector(`body`);
const cards = body.querySelectorAll(`.film-card`);

const closeCard = () => {
  const filmDetails = document.querySelector(`.film-details`);
  body.removeChild(filmDetails);
  document.removeEventListener(`keydown`, onCardEscPress);
  let closeButton = filmDetails.querySelector(`.film-details__close-btn`);
  closeButton.removeEventListener(`click`, closeCard);
};

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener(`click`, function () {
    renderTemplate(footer, createFilmDetailsTemplate(films[i], comments[i]), `afterend`);
    let closeButton = body.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, closeCard);
    document.addEventListener(`keydown`, onCardEscPress);
  });
}

let renderedFilmCount = NUMBER_OF_FILMS;

if (films.length > NUMBER_OF_FILMS) {
  renderTemplate(filmList, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + NUMBER_OF_FILMS)
      .forEach((film) => renderTemplate(containerForAllMovies, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += NUMBER_OF_FILMS;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderTemplate(footer, createFooterStatisticTemplate(), `beforeend`);
