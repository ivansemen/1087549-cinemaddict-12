// import {doFirstLetterBig} from "../utils/common";
import AbstractView from "./abstract";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  // const nameFirstLetterBig = doFirstLetterBig(name);
  return (
    `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-type="${type}">${name}${name !== `All movies` ? `<span class="main-navigation__item-count">${count}</span></a>` : ``}`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
 </div>`;
};

export default class FilterView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
