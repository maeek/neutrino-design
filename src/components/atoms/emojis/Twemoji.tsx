import { Children, cloneElement, createElement, ReactNode, useLayoutEffect, useRef } from 'react';
import twemoji from 'twemoji';

export interface TwemojiProps {
  children: ReactNode;
  options?: {}
  tag?: string;
}

export const Twemoji = (props: TwemojiProps) => {
  const { children, options, tag = 'div', ...others } = props;
  const rootRef = useRef(null);
  const childrenNodes = useRef({});

  useLayoutEffect(() => {
    if (rootRef.current) {
      twemoji.parse(rootRef.current, options);

      return;
    }

    for (const child of Object.values<any>(childrenNodes.current)) {
      const node = child.current;
      twemoji.parse(node, options);
    }
  }, [ options, rootRef, children ]);

  if (tag) {
    return createElement(tag, { ref: rootRef, ...others }, children);
  }

  return (
    <>
      {
        Children.map(children, (child, i) => {
          if ([ 'string' ].includes(typeof child)) {
            return child;
          }

          childrenNodes.current[ i ] = child;
          return cloneElement(child as any, { ref: childrenNodes[ i ] });
        })
      }
    </>
  );
};
