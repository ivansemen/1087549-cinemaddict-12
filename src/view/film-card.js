import AbstractView from "./abstract";

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, isAddedToPlaylist, isWatched, isFavorite, year, time, genre} = film;
  const playlistClassName = isAddedToPlaylist ?
    `film-card__controls-item--active` :
    ``;

  const watchedClassName = isWatched ?
    `film-card__controls-item--active` :
    ``;

  const favoriteClassName = isFavorite ?
    `film-card__controls-item--active` :
    ``;

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${time}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${playlistClassName}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._handleAddingToPlaylistClick = this._handleAddingToPlaylistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _handleAddingToPlaylistClick(evt) {
    evt.preventDefault();
    this._callback.addingToPlaylistClick();
  }

  _handleWatchedClick(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _handleFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, callback);
  }

  setAddingToPlaylistHandler(callback) {
    this._callback.addingToPlaylistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._handleAddingToPlaylistClick);
  }

  setWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._handleWatchedClick);
  }

  setFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._handleFavoriteClick);
  }
}
