import {doFirstLetterBig} from "../utils/common";
import AbstractView from "./abstract";

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;
  const nameFirstLetterBig = doFirstLetterBig(name);
  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${isActive ? `All movies` : `${nameFirstLetterBig}`} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
 </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
