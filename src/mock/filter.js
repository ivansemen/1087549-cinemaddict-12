const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films
    .filter((film) => film.isAddedToPlaylist).length,
  history: (films) => films
    .filter((film) => film.isWatched).length,
  favorites: (films) => films
    .filter((film) => film.isFavorite).length
};

export const generateFilterData = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
