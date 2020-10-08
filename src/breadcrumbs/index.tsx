import React from 'react';
import classNames from 'classnames';
import Item from './breadcrumbItem';
import Style from './breadcrumbs.scss';

interface Crumb {
  text: string;
  href?: string;
  node?: React.ReactNode;
}

export interface BreadcrumbsProps {
  className: string;
  crumbs: Array<Crumb>;
  separatorNode?: React.ReactNode;
  rel?: string;
  anchorTarget?: string;
  theme: 'light' | 'dark';
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const {
    className,
    crumbs,
    separatorNode,
    rel,
    anchorTarget,
    theme = 'dark'
  } = props;
  const classnames = classNames(
    Style.breadcrumbs,
    theme === 'light' ? Style.breadcrumbs__light : Style.breadcrumbs__dark,
    className
  );

  const renderItem = (cr: Crumb, isLast: boolean = false) => (
    <Item
      key={JSON.stringify(cr)}
      separator={!isLast}
      separatorNode={separatorNode}
      href={cr.href}
      rel={rel}
      anchorTarget={anchorTarget}
      theme={theme}
    >
      {cr.node ? cr.node : cr.text}
    </Item>
  );

  const renderList = () =>
    crumbs && crumbs.map((cr, i) => renderItem(cr, i === crumbs.length - 1));

  return <ul className={classnames}>{renderList()}</ul>;
};
