import {FilmCardView, FilmDetailsView} from "../view";
import {renderElement, remove, replace} from "../utils/render";
import {RenderPosition} from "../const";

const body = document.querySelector(`body`);

export default class Movie {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmCard = null;
    this._filmDetails = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film, comment) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDeatails = this._filmDetails;

    this._filmCard = new FilmCardView(film);
    this._filmDetails = new FilmDetailsView(film, comment);

    this._filmCard.setEditClickHandler(this._handleOpenClick);
    this._filmDetails.setEditClickHandler(this._handleCloseClick);

    if (prevFilmCard === null || prevFilmDeatails === null) {
      renderElement(this._filmListContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._filmListContainer.conatins(prevFilmDeatails.getElement())) {
      replace(this._filmDetails, prevFilmDeatails);
    }

    remove(prevFilmCard);
    remove(prevFilmDeatails);
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

  _handleOpenClick() {
    this._openFilmDetails();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleCloseClick() {
    this._closeFilmDetails();
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
  }
}
