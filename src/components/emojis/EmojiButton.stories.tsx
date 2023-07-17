import { Story, Meta } from '@storybook/react';
import { EmojiButton as EmojiButtonComponent, EmojiButtonProps } from './EmojiButton';

export default {
  title: 'Components/Emoji',
  component: EmojiButtonComponent
} as Meta;

const Template: Story<EmojiButtonProps> = args => <EmojiButtonComponent {...args} />;

export const Button = Template.bind({});
Button.args = {
  id: '⛷',
  children: '⛷'
};

export const ButtonNative = Template.bind({});
ButtonNative.args = {
  id: '⛷',
  children: '⛷',
  native: true
};

export const ButtonFromEmojiType = Template.bind({});
ButtonFromEmojiType.args = {
  id: '1f44d',
  emoji: {
    name: 'thumbs up',
    unicode_version: 6,
    category: 'people',
    order: 1284,
    display: 1,
    shortname: ':thumbsup:',
    shortname_alternates: [':+1:', ':thumbup:'],
    ascii: ['(y)'],
    humanform: 1,
    diversity_base: 1,
    diversity: null,
    diversity_children: ['1f44d-1f3fb', '1f44d-1f3fc', '1f44d-1f3fd', '1f44d-1f3fe', '1f44d-1f3ff'],
    gender: [],
    gender_children: [],
    code_points: {
      base: '1f44d',
      fully_qualified: '1f44d',
      decimal: '',
      diversity_parent: null,
      gender_parent: null
    },
    keywords: [
      '+1',
      'hand',
      'thumb',
      'up',
      'uc6',
      'diversity',
      'body',
      'hands',
      'award',
      'hi',
      'luck',
      'thank you',
      'perfect',
      'awesome',
      'good',
      'beautiful',
      'correct',
      'fun',
      'proud',
      'diverse',
      'modifier',
      'modifiers',
      'equality',
      'body part',
      'hand',
      'finger',
      'fingers',
      'awards',
      'prize',
      'prizes',
      'trophy',
      'trophies',
      'spot',
      'best',
      'champion',
      'hero',
      'hello',
      'greeting',
      'bonjour',
      'bye',
      'ciao',
      'adios',
      'goodbye',
      'hey',
      'holla',
      'my name is',
      'salut',
      'welcome',
      'ПРИВЕТ',
      'tu tapelle',
      'good luck',
      'lucky',
      'thanks',
      'thankful',
      'praise',
      'gracias',
      'merci',
      'thankyou',
      'acceptable',
      'perfecto',
      'perfection',
      'superb',
      'flawless',
      'excellent',
      'supreme',
      'super',
      'great',
      'okay',
      'got it',
      'cool',
      'ok',
      'will do',
      'like',
      'bien',
      'yep',
      'yup',
      'good job',
      'nice',
      'well done',
      'bravo',
      'congratulations',
      'congrats',
      'cute',
      'pretty',
      'adorable',
      'adore',
      'beauty',
      'cutie',
      'babe',
      'lovely',
      'passing grade'
    ]
  }
};
