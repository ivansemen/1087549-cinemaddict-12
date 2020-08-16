import {getRandomInteger} from "../utils";

const generateText = () => {
  const texts = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
  ];

  const randomIndex = getRandomInteger(0, texts.length - 1);

  return texts[randomIndex];
};

const generateNames = () => {
  const names = [
    `Tim Macoveev`,
    `John Doe`,
    `Arnold Schwarzenegger`,
    `Sylvester Stallone`,
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

const generateDate = () => {
  const dates = [
    `2019/12/31 23:59`,
    `2 days ago`,
    `Today`,
  ];

  const randomIndex = getRandomInteger(0, dates.length - 1);

  return dates[randomIndex];
};

const generateEmoji = () => {
  const emoji = [
    `./images/emoji/angry.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`,
  ];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return emoji[randomIndex];
};

export const generateComments = () => {
  return {
    text: generateText(),
    name: generateNames(),
    date: generateDate(),
    emoji: generateEmoji()
  };
};

