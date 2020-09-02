import AbstractView from "./abstract";


const createMainFilmListTemplate = (isExtra, isMain, title) => {
  return `<section class="films-list${isExtra}">
        <h2 class="films-list__title ${isMain}">${title}</h2>
        <div class="films-list__container"></div>
      </section>`;
};

export default class MainFilmListView extends AbstractView {
  constructor(isExtra, isMain, title) {
    super();
    this._isExtra = isExtra;
    this._isMain = isMain;
    this._title = title;
  }

  getTemplate() {
    return createMainFilmListTemplate(this._isExtra, this._isMain, this._title);
  }
}
