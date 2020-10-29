import Smart from "./smart";
import {EMOJIS} from "../const";

const createEmojiTemplate = (currentEmoji) => {
  return EMOJIS.map((emoji) => currentEmoji === emoji ? `<img src="images/emoji/${emoji}.png" alt="emoji-${emoji}" width="55" height="55">` : ``).join(``);
};

const createFilmDetailsTemplate = (data, comments) => {
  const {title, poster, description, rating, isAddedToPlaylist, isWatched, isFavorite, year, time, genre, originalTitle, director, writers, actors, country, ageLimit, emoji} = data;
  const {text, name, date, smile} = comments;

  const addingToPlaylist = isAddedToPlaylist ?
    `checked` :
    ``;

  const watched = isWatched ?
    `checked` :
    ``;

  const favorite = isFavorite ?
    `checked` :
    ``;

  const emojiTemplate = createEmojiTemplate(emoji);

  const createCommentsContainer = () => {
    const comment = `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${smile}.png" width="55" height="55" alt="emoji-${smile}">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${name}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;

    return `<ul class="film-details__comments-list">
          ${comment}
        </ul>`;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageLimit}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${year}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${time}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${addingToPlaylist}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        ${createCommentsContainer()}

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            ${emojiTemplate}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetailsView extends Smart {
  constructor(film, comments) {
    super();
    this._data = FilmDetailsView.parseFilmToData(film);
    this._comments = comments;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._handleAddingToPlaylistClick = this._handleAddingToPlaylistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    // this.setEditClickHandler(this._callback.editClick);
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

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(FilmDetailsView.parseDataToFilm(this._data));
  }

  _handleAddingToPlaylistClick(evt) {
    evt.preventDefault();
    this.updateData({
      isAddedToPlaylist: this._data.isAddedToPlaylist
    });
  }

  _handleWatchedClick(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: this._data.isWatched
    });
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value
    });
  }

  _handleFavoriteClick(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: this._data.isFavorite
    });
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._editClickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign({},
        film, {
          isAddedToPlaylist: film.isAddedToPlaylist,
          isWatched: film.isWatched,
          isFavorite: film.isFavorite
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.isAddedToPlaylist;
    delete data.isWatched;
    delete data.isFavorite;

    return data;
  }
}
