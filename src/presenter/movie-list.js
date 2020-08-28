import {FilmBoard, FilmCard, ShowMoreButton, FilmDetails, MainFilmList, TopRatedFilmList, MostCommentedFilmList} from "../view";
import {renderElement} from "../utils/render";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, NUMBER_MOCK, RenderPosition} from "../const";
import {generateComments} from "../mock/comments";

const body = document.querySelector(`body`);
const comments = new Array(NUMBER_MOCK).fill().map(generateComments);

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new FilmBoard();
    this._mainFilmListComponent = new MainFilmList();
    this._topRatedFilmListComponent = new TopRatedFilmList();
    this._mostCommentedFilmListComponent = new MostCommentedFilmList();
    this.mainFilmListContainer = this._mainFilmListComponent.getElement().querySelector(`.films-list__container`);
    this.topRatedFilmListContainer = this._topRatedFilmListComponent.getElement().querySelector(`.films-list__container`);
    this.mostCommentedFilmListContainer = this._mostCommentedFilmListComponent.getElement().querySelector(`.films-list__container`);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    renderElement(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardComponent, this._mainFilmListComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardComponent, this._topRatedFilmListComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardComponent, this._mostCommentedFilmListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderFilm(filmListElement, film, comment) {
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

    renderElement(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms() {
    for (let i = 0; i < Math.min(this._boardFilms.length, NUMBER_OF_FILMS); i++) {
      this._renderFilm(this.mainFilmListContainer, this._boardFilms[i], comments[i]);
    }

    for (let i = 0; i < Math.min(this._boardFilms.length, NUMBER_OF_EXTRA_FILMS); i++) {
      this._renderFilm(this.topRatedFilmListContainer, this._boardFilms[i], comments[i]);
    }

    for (let i = 0; i < Math.min(this._boardFilms.length, NUMBER_OF_EXTRA_FILMS); i++) {
      this._renderFilm(this.mostCommentedFilmListContainer, this._boardFilms[i], comments[i]);
    }
  }

  _renderShowMoreButton() {
    let renderedFilmCount = NUMBER_OF_FILMS;

    const showMoreButton = new ShowMoreButton();

    renderElement(this._mainFilmListComponent, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + NUMBER_OF_FILMS)
        .forEach((film, comment) => this._renderFilm(this.mainFilmListContainer, film, comment));

      renderedFilmCount += NUMBER_OF_FILMS;

      if (renderedFilmCount >= this._boardFilms.length) {
        showMoreButton.getElement().remove();
        showMoreButton.removeElement();
      }
    });
  }

  _renderFilmList() {
    this._renderFilms();

    if (this._boardFilms.length > NUMBER_OF_FILMS) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    this._renderFilmList();
  }
}
