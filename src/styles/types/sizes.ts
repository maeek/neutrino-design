export type NeutrinoSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type NeutrinoSizer = {
  [key in NeutrinoSizes]: number;
} & {
  unit?: 'px' | 'rem';
};
