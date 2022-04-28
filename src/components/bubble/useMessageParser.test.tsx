import { renderHook } from '@testing-library/react-hooks';
import { parse, parseLinks, parseMentions, useMessageParser } from './useMessageParser';

describe('useMessageParser', () => {

  describe('parseLinks', () => {
    it('should parse empty string', () => {
      const text = '';

      const links = parseLinks(text);

      expect(links).toEqual([]);
    });

    it('should parse single link', () => {
      const text = 'https://neutrino.chat/';

      const links = parseLinks(text);

      expect(links).toEqual([ {
        parts: [ '', '' ],
        url: 'https://neutrino.chat/',
        start: 0,
        end: text.length
      } ]);
    });

    it('should parse single link among text', () => {
      const text = 'This is a message with a link https://neutrino.chat/u/maeek between words';

      const links = parseLinks(text);

      expect(links).toEqual([ {
        parts: [ 'This is a message with a link ', ' between words' ],
        url: 'https://neutrino.chat/u/maeek',
        start: 30,
        end: 59
      } ]);
    });

    it('should parse multiple links', () => {
      const text = 'https://neutrino.chat/u/maeek\nhttps://github.com/maeek/neutrino-chat';

      const links = parseLinks(text);

      expect(links).toEqual([
        {
          parts: [ '', '\nhttps://github.com/maeek/neutrino-chat' ],
          url: 'https://neutrino.chat/u/maeek',
          start: 0,
          end: 29
        },
        {
          parts: [ 'https://neutrino.chat/u/maeek\n', '' ],
          url: 'https://github.com/maeek/neutrino-chat',
          start: 30,
          end: 68
        }
      ]);
    });
  });

  describe('parseMentions', () => {
    it('parses empty string', () => {
      const text = '';

      const mentions = parseMentions(text);

      expect(mentions).toEqual([]);
    });

    it('parses mention from string', () => {
      const text = '@maeek';

      const mentions = parseMentions(text);

      expect(mentions).toEqual([ {
        parts: [ '', '' ],
        name: 'maeek',
        start: 0,
        end: 6
      } ]);
    });

    it('parses multiple mentions from string', () => {
      const text = 'Hi @maeek, @test how are you?';

      const mentions = parseMentions(text);

      expect(mentions).toEqual([
        {
          parts: [ 'Hi ', ', @test how are you?' ],
          name: 'maeek',
          start: 3,
          end: 9
        },
        {
          parts: [ 'Hi @maeek, ', ' how are you?' ],
          name: 'test',
          start: 11,
          end: 16
        }
      ]);
    });
  });

  describe('parse', () => {
    it('parses empty string', () => {
      const text = '';

      const lines = parse(text);

      expect(lines).toEqual([ {
        line: '',
        links: [],
        mentions: []
      } ]);
    });

    it('parses message', () => {
      const text = `
        This is a message with a link https://neutrino.chat/u/maeek between words
        and a mention @maeek and a link :)`;

      const lines = parse(text);

      expect(lines).toEqual([
        {
          line: '',
          links: [],
          mentions: []
        },
        {
          line: '        This is a message with a link https://neutrino.chat/u/maeek between words',
          links: [ {
            parts: [ '        This is a message with a link ', ' between words' ],
            url: 'https://neutrino.chat/u/maeek',
            start: 38,
            end: 67
          } ],
          mentions: []
        },
        {
          line: '        and a mention @maeek and a link :)',
          links: [],
          mentions: [ {
            parts: [ '        and a mention ', ' and a link :)' ],
            name: 'maeek',
            start: 22,
            end: 28
          } ]
        }
      ]);
    });
  });

  describe('useMessageParser hook', () => {
    it('renders - parses empty string', () => {
      const { result } = renderHook(() => useMessageParser(''));

      expect(result.current.message).toBeDefined();
    });

    it('renders - parses message', () => {
      const message = `
        This is a message with a link https://neutrino.chat/u/maeek between words
        and a mention @maeek and a link :)`;

      const { result } = renderHook(() => useMessageParser(message));

      expect(result.current.message).toBeDefined();
      expect(result.current.message).toEqual([
        {
          line: '',
          links: [],
          mentions: []
        },
        {
          line: '        This is a message with a link https://neutrino.chat/u/maeek between words',
          links: [ {
            parts: [ '        This is a message with a link ', ' between words' ],
            url: 'https://neutrino.chat/u/maeek',
            start: 38,
            end: 67
          } ],
          mentions: []
        },
        {
          line: '        and a mention @maeek and a link :)',
          links: [],
          mentions: [ {
            parts: [ '        and a mention ', ' and a link :)' ],
            name: 'maeek',
            start: 22,
            end: 28
          } ]
        }
      ]);
    });
  });
});
