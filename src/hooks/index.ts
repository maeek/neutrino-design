import emoji from './emoji';
import useAvatar from './avatar';
import connectivity from './connectivity';

export { emojiMapper } from './emoji';

export {
  computeAvatar,
  getInitials,
  DEFAULT_AVATAR_OPTIONS as defaultOptions
} from './avatar';

export default {
  emoji,
  useAvatar,
  connectivity
};
