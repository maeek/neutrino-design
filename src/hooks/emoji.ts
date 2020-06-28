/* eslint-disable no-param-reassign */
import { parse } from 'twemoji-parser';

export const EMOJI_BASE_URL = 'https://twemoji.maxcdn.com/v/latest/svg/';
export const EMOJI_URL = '';

interface Emoji {
  url: string;
  indices: Array<number>;
  text: string;
  type: string;
}

export const emojiMapper = (emojis: string | Array<string>): Array<Emoji> => {
  const internalParser = (emoji: string): Array<Emoji> =>
    parse(emoji).map((el: Emoji) => {
      el.url = EMOJI_URL ? el.url.replace(EMOJI_BASE_URL, EMOJI_URL) : el.url;
      return el;
    });

  if (typeof emojis === 'string') {
    return internalParser(emojis);
  } else if (Array.isArray(emojis)) {
    return emojis.map((emoji: string) => internalParser(emoji)).flat();
  }

  throw new Error('Unsupported type');
};

export default {};
