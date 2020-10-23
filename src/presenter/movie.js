import {FilmCardView, FilmDetailsView} from "../view";
import {renderElement, remove, replace} from "../utils/render";
import {RenderPosition, UserAction, UpdateType} from "../const";
// import {generateComments} from "../mock/comments";
// import {NUMBER_MOCK} from "../const";

const body = document.querySelector(`body`);
// const comments = new Array(NUMBER_MOCK).fill().map(generateComments);

export default class Movie {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmCard = null;
    this._filmDetails = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleAddingToPlaylistClick = this._handleAddingToPlaylistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDeatails = this._filmDetails;

    this._filmCard = new FilmCardView(film);
    this._filmDetails = new FilmDetailsView(film);

    this._filmCard.setEditClickHandler(this._handleOpenClick);
    this._filmDetails.setEditClickHandler(this._handleCloseClick);
    this._filmCard.setAddingToPlaylistHandler(this._handleAddingToPlaylistClick);
    this._filmDetails.setEditClickHandler(this._handleAddingToPlaylistClick);
    this._filmCard.setWatchedHandler(this._handleWatchedClick);
    this._filmDetails.setEditClickHandler(this._handleWatchedClick);
    this._filmCard.setFavoriteHandler(this._handleFavoriteClick);
    this._filmDetails.setEditClickHandler(this._handleFavoriteClick);

    if (prevFilmCard === null || prevFilmDeatails === null) {
      renderElement(this._filmListContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    if (body.contains(prevFilmDeatails.getElement())) {
      replace(this._filmDetails, prevFilmDeatails);
    }

    remove(prevFilmCard);
    remove(prevFilmDeatails);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
  }

  _openFilmDetails() {
    body.appendChild(this._filmDetails.getElement());
  }

  _closeFilmDetails() {
    body.removeChild(this._filmDetails.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeFilmDetails();
    }
  }

  _handleOpenClick(film) {
    this._openFilmDetails();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeData(film);
  }

  _handleCloseClick(film) {
    this._closeFilmDetails();
    this._changeData(film);
  }

  _handleAddingToPlaylistClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({},
            this._film, {
              isAddedToPlaylist: !this._film.isAddedToPlaylist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({},
            this._film, {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({},
            this._film, {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
