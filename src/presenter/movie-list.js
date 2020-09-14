import {FilmBoardView, FilmCardView, ShowMoreButtonView, FilmDetailsView, MainFilmListView, NoFilmView} from "../view";
import {renderElement} from "../utils/render";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, NUMBER_MOCK, RenderPosition, EXTRA, HIDDEN_TITLE, MAIN_TITLE, TOP_RATED_TITLE, MOST_COMMENTED_TITLE} from "../const";
import {generateComments} from "../mock/comments";

const body = document.querySelector(`body`);
const comments = new Array(NUMBER_MOCK).fill().map(generateComments);

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._board = new FilmBoardView();
    this._mainFilmList = new MainFilmListView(``, HIDDEN_TITLE, MAIN_TITLE);
    this._topRatedFilmList = new MainFilmListView(EXTRA, ``, TOP_RATED_TITLE);
    this._mostCommentedFilmList = new MainFilmListView(EXTRA, ``, MOST_COMMENTED_TITLE);
    this._noFilm = new NoFilmView();
    this.mainFilmListContainer = this._mainFilmList.getElement().querySelector(`.films-list__container`);
    this.topRatedFilmListContainer = this._topRatedFilmList.getElement().querySelector(`.films-list__container`);
    this.mostCommentedFilmListContainer = this._mostCommentedFilmList.getElement().querySelector(`.films-list__container`);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    renderElement(this._boardContainer, this._board, RenderPosition.BEFOREEND);
    if (boardFilms.length > 0) {
      renderElement(this._board, this._mainFilmList, RenderPosition.BEFOREEND);
      renderElement(this._board, this._topRatedFilmList, RenderPosition.BEFOREEND);
      renderElement(this._board, this._mostCommentedFilmList, RenderPosition.BEFOREEND);
      this._renderBoard();
    } else {
      renderElement(this._board, this._noFilm, RenderPosition.BEFOREEND);
    }
  }

  _renderFilm(filmListElement, film, comment) {
    const filmCard = new FilmCardView(film);
    const filmDetails = new FilmDetailsView(film, comment);

    const openFilmDetails = () => {
      body.appendChild(filmDetails.getElement());
    };

    const closeFilmDetails = () => {
      body.removeChild(filmDetails.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closeFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.setEditClickHandler(() => {
      openFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmDetails.setEditClickHandler(() => {
      closeFilmDetails();
    });

    renderElement(filmListElement, filmCard, RenderPosition.BEFOREEND);
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

    if (this._boardFilms.length > NUMBER_OF_FILMS) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    let renderedFilmCount = NUMBER_OF_FILMS;

    const showMoreButton = new ShowMoreButtonView();

    renderElement(this._mainFilmList, showMoreButton, RenderPosition.BEFOREEND);

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

  _renderBoard() {
    this._renderFilms();
  }
}
