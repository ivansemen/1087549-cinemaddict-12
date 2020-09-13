import {generateFilm} from "./mock/film";
import {generateFilterData} from "./mock/filter";
import {NUMBER_MOCK} from "./const";
import {UserRankView, MenuView, FilterView, FooterStatisticView, SortView} from "./view";
import {renderElement} from "./utils/render";
import {RenderPosition} from "./const";
import MovieList from "./presenter/movie-list";

const films = new Array(NUMBER_MOCK).fill().map(generateFilm);
const filterItems = generateFilterData(films);

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

renderElement(header, new UserRankView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortView().getElement(), RenderPosition.BEFOREEND);

const navigation = main.querySelector(`.main-navigation`);
renderElement(navigation, new FilterView(filterItems).getElement(), RenderPosition.AFTERBEGIN);

const footer = document.querySelector(`footer`);
const boardPresenter = new MovieList(main);

boardPresenter.init(films);

renderElement(footer, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);
