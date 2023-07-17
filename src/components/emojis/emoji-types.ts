export interface EmojiType {
  name: string;
  unicode_version: number;
  category: Category;
  order: number;
  display: number;
  shortname: string;
  shortname_alternates: string[];
  ascii: string[];
  humanform: number;
  diversity_base: number;
  diversity: Diversity[] | null;
  diversity_children: string[];
  gender: string[];
  gender_children: string[];
  code_points: CodePoints;
  keywords: string[];
}

export enum Category {
  Activity = 'activity',
  Flags = 'flags',
  Food = 'food',
  Modifier = 'modifier',
  Nature = 'nature',
  Objects = 'objects',
  People = 'people',
  Regional = 'regional',
  Symbols = 'symbols',
  Travel = 'travel'
}

export interface CodePoints {
  base: string;
  fully_qualified: string;
  decimal: string;
  diversity_parent: null | string;
  gender_parent: null | string;
}

export enum Diversity {
  The1F3Fb = '1f3fb',
  The1F3Fc = '1f3fc',
  The1F3Fd = '1f3fd',
  The1F3Fe = '1f3fe',
  The1F3Ff = '1f3ff'
}

export type EmojisType = { [key: string]: EmojiType };
