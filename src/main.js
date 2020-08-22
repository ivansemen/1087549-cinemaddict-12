import {generateFilm} from "./mock/film";
import {generateComments} from "./mock/comments";
import {generateFilterData} from "./mock/filter";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, NUMBER_MOCK} from "./const.js";
import {UserRankView, MenuView, FilterView, FilmBoardView, FilmCardView, ShowMoreButtonView, FooterStatisticView, FilmDetailsView} from "./view";
import {renderElement, RenderPosition} from "./utils";

const films = new Array(NUMBER_MOCK).fill().map(generateFilm);
const comments = new Array(NUMBER_MOCK).fill().map(generateComments);
const filterItems = generateFilterData(films);

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

renderElement(header, new UserRankView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new FilmBoardView().getElement(), RenderPosition.BEFOREEND);

const navigation = main.querySelector(`.main-navigation`);
renderElement(navigation, new FilterView(filterItems).getElement(), RenderPosition.AFTERBEGIN);

const filmList = main.querySelector(`.films-list`);
const containerForAllMovies = filmList.querySelector(`.films-list__container`);
const extrafilms = main.querySelectorAll(`.films-list--extra`);
const containerForTopRatedMovies = extrafilms[0].querySelector(`.films-list__container`);
const containerForMostCommntedMovies = extrafilms[1].querySelector(`.films-list__container`);
const footer = document.querySelector(`footer`);
const body = document.querySelector(`body`);

const renderFilmCard = (filmListElement, film, comment) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film, comment);

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

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    openFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    openFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    openFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
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
  renderElement(filmList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + NUMBER_OF_FILMS)
      .forEach((film, comment) => renderFilmCard(containerForAllMovies, film, comment));

    renderedFilmCount += NUMBER_OF_FILMS;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderElement(footer, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);
