import { useEffect, useState } from 'react';

export interface Link {
  parts: string[];
  url: string;
  start: number;
  end: number;
}

export interface Mention {
  parts: string[];
  name: string;
  start: number;
  end: number;
}

export interface Line {
  line: string;
  links: Link[];
  mentions: Mention[];
}

export const parseLinks = (line: string) => {
  const links: Link[] = [];
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  let linkMatch;
  while ((linkMatch = linkRegex.exec(line))) {
    links.push({
      parts: line.split(linkMatch[1]),
      url: linkMatch[1],
      start: linkMatch.index,
      end: linkMatch.index + linkMatch[1].length
    });
  }

  return links;
};

export const parseMentions = (line: string) => {
  const mentions: Mention[] = [];
  const mentionRegex = /\B@\w+/g;

  let mentionMatch;
  while ((mentionMatch = mentionRegex.exec(line))) {
    mentions.push({
      parts: line.split(mentionMatch[0]),
      name: mentionMatch[0].substring(1),
      start: mentionMatch.index,
      end: mentionMatch.index + mentionMatch[0].length
    });
  }

  return mentions;
};

export const parse = (message: string): Line[] => {
  const lines = message.split('\n');
  const parsedLines = lines.map(line => {
    const links = parseLinks(line);
    const mentions = parseMentions(line);

    return {
      line,
      links,
      mentions
    };
  });
  return parsedLines;
};

export const useMessageParser = (message: string) => {
  const [parsedMessage, setParsedMessage] = useState<Line[] | null>(null);

  useEffect(() => {
    if (!message) return;

    const text = parse(message);
    setParsedMessage(text);
  }, [message]);

  return { message: parsedMessage };
};
