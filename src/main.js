import {generateFilm} from "./mock/film";
import {NUMBER_MOCK} from "./const";
import {UserRankView, MenuView, FooterStatisticView} from "./view";
import {renderElement} from "./utils/render";
import {RenderPosition} from "./const";
import MovieList from "./presenter/movie-list";
import FilterModel from "./model/filter.js";
import FilmsModel from "./model/movies.js";
import FilterPresenter from "./presenter/filter.js";

const films = new Array(NUMBER_MOCK).fill().map(generateFilm);

const header = document.querySelector(`header`);
const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);

renderElement(header, new UserRankView().getElement(), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

filmsModel.setFilms(films);

const boardPresenter = new MovieList(main, filmsModel, filterModel);

boardPresenter.init();

renderElement(main, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
const navigation = document.querySelector(`.main-navigation`);
const filterPresenter = new FilterPresenter(navigation, filterModel, filmsModel);
filterPresenter.init();


renderElement(footer, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);
