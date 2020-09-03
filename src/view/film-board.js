import AbstractView from "./abstract";

const createFilmBoardTemplate = () => {
  return `<section class="films">
    </section>`;
};

export default class FilmBoardView extends AbstractView {
  getTemplate() {
    return createFilmBoardTemplate();
  }
}
