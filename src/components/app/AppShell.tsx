import { CSSProperties, ReactNode } from 'react';
import { NeutrinoTheme } from '../../styles/types';

export interface AppShellProps {
  children?: ReactNode;
  heading?: ReactNode;
  navbar?: ReactNode;
  styles?: CSSProperties | ((theme: NeutrinoTheme) => CSSProperties);
}

export const AppShell = ({ children, heading, navbar, styles }: AppShellProps) => {

  return (
    <main></main>
  );
};
