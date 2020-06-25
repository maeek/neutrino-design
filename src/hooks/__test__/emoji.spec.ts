import { emojiMapper } from '../emoji';

describe('emoijMapper', () => {
  const exampleString = 'I 🧡 Twemoji! 🥳';
  const exampleArray = [
    'I 🧡 Twemoji! 🥳',
    'I 🧡 Twemoji! 🥳',
    'I 🧡 Twemoji! 🥳'
  ];

  /**
   * TODO: Add proper expected results
   */
  const expectedObj = {
    url: 'https://twemoji.maxcdn.com/v/latest/svg/',
    indices: [0, 1],
    text: '',
    type: 'emoji'
  };

  it('Parse string', () => {
    expect(emojiMapper(exampleString)).toEqual([expectedObj]);
  });

  it('Parse array of strings', () => {
    expect(emojiMapper(exampleArray)).toEqual([
      expectedObj,
      expectedObj,
      expectedObj
    ]);
  });
});
