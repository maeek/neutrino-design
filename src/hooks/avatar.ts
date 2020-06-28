import { useEffect, useState } from 'react';

interface Props {
  text: string;
}

export const getInitials = (text: string): Array<string> => {
  return text
    .split(/(\s)|([_-/])/)
    .map((word) => word.substr(0, 1).toUpperCase());
};

export const computeAvatar = (text: string): Blob => {
  // Prepare text
  // Create canvas
  // Set bg
  // Place text
  // Return blob
  return new Blob(getInitials(text));
};

export default (props: Props): { avatarBlob: Blob } => {
  const { text } = props;
  const [avatarBlob, setAvatarBlob] = useState(new Blob([]));

  useEffect(() => {
    setAvatarBlob(computeAvatar(text));
  }, [text]);

  return {
    avatarBlob
  };
};
