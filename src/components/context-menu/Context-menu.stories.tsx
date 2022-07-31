import { ShareRounded, VisibilityRounded } from '@mui/icons-material';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

import ContextMenuComponent, { ContextMenuProps } from './Menu';

export default {
  title: 'Components/Context Menu/Menu',
  component: ContextMenuComponent
} as Meta;

const Template: Story<ContextMenuProps> = (args) => (
  <ContextMenuComponent {...args} />
);

export const Menu = Template.bind({});
Menu.args = {
  items: [
    { text: 'Join' },
    { text: 'Share', icon: <ShareRounded /> },
    { text: 'Delete Channel' },
    { text: 'View Channel Properties', icon: <VisibilityRounded /> }
  ]
};

const TemplateShowHide: Story<ContextMenuProps> = (args) => {
  const [ isShown, show ] = useState(false);

  return (
    <>
      <button onClick={() =>show((prev) => !prev)}>{isShown ? 'Hide' : 'Show'}</button>
      {isShown ? <ContextMenuComponent {...args} /> : null }
    </>
  );
};

export const ShowHideMenu = TemplateShowHide.bind({});
ShowHideMenu.args = {
  items: [
    { text: 'Join' },
    { text: 'Share', icon: <ShareRounded /> },
    { text: 'Delete Channel' },
    { text: 'View Channel Properties', icon: <VisibilityRounded /> }
  ]
};
