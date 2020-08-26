import {generateFilm} from "./mock/film";
import {generateComments} from "./mock/comments";
import {generateFilterData} from "./mock/filter";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, NUMBER_MOCK} from "./const.js";
import {UserRank, Menu, Filter, FilmBoard, FilmCard, ShowMoreButton, FooterStatistic, FilmDetails} from "./view";
import {renderElement} from "./utils";
import {RenderPosition} from "./const";

const films = new Array(NUMBER_MOCK).fill().map(generateFilm);
const comments = new Array(NUMBER_MOCK).fill().map(generateComments);
const filterItems = generateFilterData(films);

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

renderElement(header, new UserRank().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new Menu().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new FilmBoard().getElement(), RenderPosition.BEFOREEND);

const navigation = main.querySelector(`.main-navigation`);
renderElement(navigation, new Filter(filterItems).getElement(), RenderPosition.AFTERBEGIN);

const filmList = main.querySelector(`.films-list`);
const containerForAllMovies = filmList.querySelector(`.films-list__container`);
const extrafilms = main.querySelectorAll(`.films-list--extra`);
const containerForTopRatedMovies = extrafilms[0].querySelector(`.films-list__container`);
const containerForMostCommntedMovies = extrafilms[1].querySelector(`.films-list__container`);
const footer = document.querySelector(`footer`);
const body = document.querySelector(`body`);

const renderFilmCard = (filmListElement, film, comment) => {
  const filmCardComponent = new FilmCard(film);
  const filmDetailsComponent = new FilmDetails(film, comment);

  const openFilmDetails = () => {
    body.appendChild(filmDetailsComponent.getElement());
  };

  const closeFilmDetails = () => {
    body.removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent.setEditClickHandler(() => {
    openFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.setEditClickHandler(() => {
    closeFilmDetails();
  });

  renderElement(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(films.length, NUMBER_OF_FILMS); i++) {
  renderFilmCard(containerForAllMovies, films[i], comments[i]);
}

for (let i = 0; i < NUMBER_OF_EXTRA_FILMS; i++) {
  renderFilmCard(containerForTopRatedMovies, films[i], comments[i]);
}

for (let i = 0; i < NUMBER_OF_EXTRA_FILMS; i++) {
  renderFilmCard(containerForMostCommntedMovies, films[i], comments[i]);
}

let renderedFilmCount = NUMBER_OF_FILMS;

if (films.length > NUMBER_OF_FILMS) {
  const showMoreButton = new ShowMoreButton();

  renderElement(filmList, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.setClickHandler(() => {
    films
      .slice(renderedFilmCount, renderedFilmCount + NUMBER_OF_FILMS)
      .forEach((film, comment) => renderFilmCard(containerForAllMovies, film, comment));

    renderedFilmCount += NUMBER_OF_FILMS;

    if (renderedFilmCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}

renderElement(footer, new FooterStatistic().getElement(), RenderPosition.BEFOREEND);
