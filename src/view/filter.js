const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${isActive ? `All movies` : `${name}`} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
 </div>`;
};
