import AbstractView from "./abstract";


const createMainFilmListTemplate = () => {
  return `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>`;
};

export default class MainFilmListView extends AbstractView {
  getTemplate() {
    return createMainFilmListTemplate();
  }
}
