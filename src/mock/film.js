import {getRandomInteger} from "../utils/common";

const generateFilmTitle = () => {
  const titles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateFilmPosterRef = () => {
  const posters = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateFilmDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.
     Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
     Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
     Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback.`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateComments = () => {
  const comments = [
    `5 comments`,
    `89 comments`,
    `18 comments`,
    `465 comments`,
    `0 comments`,
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

const generateRating = () => {
  const ratings = [
    `8.3`,
    `3.2`,
    `9.0`,
    `2.3`,
    `6.3`,
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);

  return ratings[randomIndex];
};

const generateYear = () => {
  const years = [
    `1929`,
    `1933`,
    `1955`,
    `1964`,
    `1936`,
  ];

  const randomIndex = getRandomInteger(0, years.length - 1);

  return years[randomIndex];
};

const generateTime = () => {
  const times = [
    `1h 55m`,
    `54m`,
    `1h 59m`,
    `1h 21m`,
    `16m`,
  ];

  const randomIndex = getRandomInteger(0, times.length - 1);

  return times[randomIndex];
};

const generateGenre = () => {
  const genres = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateOriginalTitle = () => {
  const originalTitles = [
    `The Great Flamarion`,
    `Source Code`,
    `Samurai chanpurû`,
    `Inception`,
    `Shutter Island`,
  ];

  const randomIndex = getRandomInteger(0, originalTitles.length - 1);

  return originalTitles[randomIndex];
};

const generateDirector = () => {
  const direcors = [
    `Anthony Mann`,
    `Fuminori Kizaki`,
    `Duncan Jones`,
    `Eric Bress`,
    `J. Mackye Gruber`,
  ];

  const randomIndex = getRandomInteger(0, direcors.length - 1);

  return direcors[randomIndex];
};

const generateWriters = () => {
  const writers = [
    `Anne Wigton, Heinz Herald, Richard Weil`,
    `J. Mackye Gruber, Eric Bress`,
    `Duncan Jones`,
    `Ben Ripley`,
    `Derek Draper`,
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

const generateActors = () => {
  const actors = [
    `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    `Mary Beth Hughes, Dan Duryea`,
    `Duncan Jones, Dan Duryea`,
    `Ben Ripley, Dan Duryea`,
    `Derek Draper, Dan Duryea`,
  ];

  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};

const generateCountries = () => {
  const countries = [
    `USA`,
    `Russia`,
    `Canada`,
    `Germany`,
    `Spain`,
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateAgeLimit = () => {
  const ageLimits = [
    `18+`,
    `12+`,
    `16+`,
    `6+`,
    `0+`,
  ];

  const randomIndex = getRandomInteger(0, ageLimits.length - 1);

  return ageLimits[randomIndex];
};

const generateNumberOfComments = () => {
  const numberOfComments = [
    `4`,
    `67`,
    `89`,
    `100`,
    `2`
  ];

  const randomIndex = getRandomInteger(0, numberOfComments.length - 1);

  return numberOfComments[randomIndex];
};

export const generateFilm = () => {
  return {
    title: generateFilmTitle(),
    poster: generateFilmPosterRef(),
    description: generateFilmDescription(),
    comments: generateComments(),
    rating: generateRating(),
    isAddedToPlaylist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    year: generateYear(),
    time: generateTime(),
    genre: generateGenre(),
    originalTitle: generateOriginalTitle(),
    director: generateDirector(),
    writer: generateWriters(),
    actors: generateActors(),
    country: generateCountries(),
    ageLimit: generateAgeLimit(),
    numberOfComments: generateNumberOfComments()
  };
};
