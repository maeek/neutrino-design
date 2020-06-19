import { useEffect, useState } from 'react';

interface Props {
  text: string;
}

const getInitials = (text: string): Array<string> => {
  return text.split(' ');
};

export const computeAvatar = (text: string): Blob => {
  // Prepare text
  // Create canvas
  // Set bg
  // Place text
  // Return blob
  return new Blob(getInitials(text));
};

export const avatar = (props: Props): { avatarBlob: Blob } => {
  const { text } = props;
  const [avatarBlob, setAvatarBlob] = useState(new Blob([]));

  useEffect(() => {
    setAvatarBlob(computeAvatar(text));
  }, [text]);

  return {
    avatarBlob
  };
};
