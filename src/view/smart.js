import AbstractView from "./abstract";

export default class Smart extends AbstractView {
  constructor() {
    super();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._handleAddingToPlaylistClick);
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._handleWatchedClick);
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._handleFavoriteClick);
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._emojiChangeHandler);
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement

    this.restoreHandlers();
  }
}
