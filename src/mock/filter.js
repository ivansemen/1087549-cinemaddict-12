const filmToFilterMap = {
  All: (films) => films.length,
  Watchlist: (films) => films
    .filter((film) => film.isAddedToPlaylist).length,
  History: (films) => films
    .filter((film) => film.isWatched).length,
  Favorites: (films) => films
    .filter((film) => film.isFavorite).length
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
