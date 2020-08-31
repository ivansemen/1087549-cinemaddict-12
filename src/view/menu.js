import AbstractView from "./abstract";

const createMenuTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MenuView extends AbstractView {
  getTemplate() {
    return createMenuTemplate();
  }
}
