import AbstractView from "./abstract";

const createTopRatedFilmListTemplate = () => {
  return `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>`;
};

export default class TopRatedFilmList extends AbstractView {
  getTemplate() {
    return createTopRatedFilmListTemplate();
  }
}
