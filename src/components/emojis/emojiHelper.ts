export const convertEmojiFromCodePoint = (codePoint: string) => {
  let codePoints = codePoint.split('-');

  if (codePoints.length > 1) {
    codePoints = codePoints.reduce(
      (prev: string[], curr: string, i) => [...prev, curr, ...(i === codePoints.length - 1 ? [] : [''])],
      []
    );
  }

  codePoints = codePoints.map(cp => cp && String.fromCodePoint(parseInt(cp, 16)));

  return [...codePoints].reduce((prev, curr) => prev + curr);
};
