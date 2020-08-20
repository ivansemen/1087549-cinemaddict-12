import {generateFilm} from "./mock/film";
import {generateComments} from "./mock/comments";
import {generateFilter} from "./mock/filter";
import {NUMBER_MOCK} from "./const.js";

export const films = new Array(NUMBER_MOCK).fill().map(generateFilm);
export const comments = new Array(NUMBER_MOCK).fill().map(generateComments);
export const filterItems = generateFilter(films);


