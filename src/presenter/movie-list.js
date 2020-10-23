import {FilmBoardView, ShowMoreButtonView, MainFilmListView, SortView, NoFilmView} from "../view";
import {renderElement} from "../utils/render";
import {NUMBER_OF_FILMS, RenderPosition, HIDDEN_TITLE, MAIN_TITLE} from "../const";
import {SortType, UpdateType, UserAction} from "../const";
import {sortFilmDate, sortFilmRating} from "../utils/film";
import {remove} from "../utils/render";
import FilmPresenter from "../presenter/movie";
import {filter} from "../utils/filter";


export default class MovieList {
  constructor(boardContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._boardContainer = boardContainer;
    this._renderedFilmCount = NUMBER_OF_FILMS;
    this._filterModel = filterModel;

    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._sortComponent = null;
    this._showMoreButtonComponent = null

    this._board = new FilmBoardView();
    this._mainFilmList = new MainFilmListView(``, HIDDEN_TITLE, MAIN_TITLE);
    this._noFilm = new NoFilmView();
    this._mainFilmListContainer = this._mainFilmList.getElement().querySelector(`.films-list__container`);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    renderElement(this._boardContainer, this._board, RenderPosition.BEFOREEND);
    renderElement(this._board, this._mainFilmList, RenderPosition.BEFOREEND);
    this._renderBoard();
    this._renderSort();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return filtredFilms.sort(sortFilmRating);
    }
    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(filmListElement, this._handleViewAction);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(filmListElement, films) {
    films.forEach((film) => this._renderFilm(filmListElement, film));
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + NUMBER_OF_FILMS);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);
    this._renderFilms(this._mainFilmListContainer, films);
    this._renderedFilmCount = newRenderedFilmCount;
    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    renderElement(this._mainFilmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    // remove(this._sortComponent);
    remove(this._noFilm);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = NUMBER_OF_FILMS;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      renderElement(this._board, this._noFilm, RenderPosition.BEFOREEND);
      return;
    }

    this._renderFilms(this._mainFilmListContainer, films.slice(0, Math.min(filmCount, this._renderedFilmCount)));
    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}
