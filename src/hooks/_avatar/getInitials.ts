export const getInitials = (text: string): Array<string> => {
  return (
    text
      // eslint-disable-next-line no-useless-escape
      .split(new RegExp('[\\s_-]'))
      .map((word) => word.substr(0, 1).toUpperCase())
  );
};

export default getInitials;
