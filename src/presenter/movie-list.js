import {FilmBoardView, ShowMoreButtonView, MainFilmListView, SortView, NoFilmView} from "../view";
import {renderElement} from "../utils/render";
import {NUMBER_OF_FILMS, NUMBER_OF_EXTRA_FILMS, RenderPosition, EXTRA, HIDDEN_TITLE, MAIN_TITLE, TOP_RATED_TITLE, MOST_COMMENTED_TITLE} from "../const";
// import {generateComments} from "../mock/comments";
import {SortType} from "../const";
import {sortFilmDate, sortFilmRating} from "../utils/film";
import FilmPresenter from "../presenter/movie";
import {updateItem} from "../utils/common";

// const comments = new Array(NUMBER_MOCK).fill().map(generateComments);
export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = NUMBER_OF_FILMS;

    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._board = new FilmBoardView();
    this._sort = new SortView();
    this._mainFilmList = new MainFilmListView(``, HIDDEN_TITLE, MAIN_TITLE);
    this._topRatedFilmList = new MainFilmListView(EXTRA, ``, TOP_RATED_TITLE);
    this._mostCommentedFilmList = new MainFilmListView(EXTRA, ``, MOST_COMMENTED_TITLE);
    this._noFilm = new NoFilmView();
    this.mainFilmListContainer = this._mainFilmList.getElement().querySelector(`.films-list__container`);
    this.topRatedFilmListContainer = this._topRatedFilmList.getElement().querySelector(`.films-list__container`);
    this.mostCommentedFilmListContainer = this._mostCommentedFilmList.getElement().querySelector(`.films-list__container`);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();
    renderElement(this._boardContainer, this._board, RenderPosition.BEFOREEND);
    if (this._boardFilms.length > NUMBER_OF_FILMS) {
      this._renderShowMoreButton();
    }
    if (boardFilms.length > 0) {
      renderElement(this._board, this._mainFilmList, RenderPosition.BEFOREEND);
      renderElement(this._board, this._topRatedFilmList, RenderPosition.BEFOREEND);
      renderElement(this._board, this._mostCommentedFilmList, RenderPosition.BEFOREEND);
      this._renderBoard();
    } else {
      renderElement(this._board, this._noFilm, RenderPosition.BEFOREEND);
    }
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortFilmRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilms(this.mainFilmListContainer, 0, Math.min(this._boardFilms.length, NUMBER_OF_FILMS));
    this._renderFilms(this.mostCommentedFilmListContainer, this._renderedFilmCount, this._renderedFilmCount + NUMBER_OF_EXTRA_FILMS);
  }

  _renderSort() {
    renderElement(this._board, this._sort, RenderPosition.AFTERBEGIN);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(filmListElement, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(filmListElement, from, to) {
    // for (let i = 0; i < Math.min(this._boardFilms.length, count); i++) {
    //   this._renderFilm(filmListElement, this._boardFilms[i]);
    // }
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(filmListElement, boardFilm));
  }

  _renderShowMoreButton() {
    let renderedFilmCount = NUMBER_OF_FILMS;

    const showMoreButton = new ShowMoreButtonView();

    renderElement(this._mainFilmList, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + NUMBER_OF_FILMS)
        .forEach((film) => this._renderFilm(this.mainFilmListContainer, film));

      renderedFilmCount += NUMBER_OF_FILMS;

      if (renderedFilmCount >= this._boardFilms.length) {
        showMoreButton.getElement().remove();
        showMoreButton.removeElement();
      }
    });
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = NUMBER_OF_FILMS;
  }

  _renderBoard() {
    this._renderFilms(this.mainFilmListContainer, 0, Math.min(this._boardFilms.length, NUMBER_OF_FILMS));
    this._renderFilms(this.topRatedFilmListContainer, this._renderedFilmCount, this._renderedFilmCount + NUMBER_OF_EXTRA_FILMS);
    this._renderFilms(this.mostCommentedFilmListContainer, this._renderedFilmCount, this._renderedFilmCount + NUMBER_OF_EXTRA_FILMS);
    this._renderSort();
  }
}
