import AbstractView from "./abstract";

const createFooterStatisticTemplate = () => {
  return `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;
};

export default class FooterStatisticView extends AbstractView {
  getTemplate() {
    return createFooterStatisticTemplate();
  }
}
