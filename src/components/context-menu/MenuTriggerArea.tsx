import { createContext, ReactNode, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Modal } from '../modal';

interface MenuTriggerAreaContext {
  mountPointId: string;
  isVisible: boolean;
  setIsVisible: ((isVisible: boolean) => void) | ((isVisible: ((prevIsVisible: boolean) => boolean)) => void);
}

const MenuTriggerAreaContext = createContext<MenuTriggerAreaContext | undefined>(undefined);

interface MenuTriggerAreaProps {
  children: ReactNode;
  menuRenderer?: ReactNode | (() => ReactNode);
}

export const MenuTriggerArea = ({ children, menuRenderer }: MenuTriggerAreaProps) => {
  const [ mountPointId ] = useState(uuid().replace(/-/g, ''));
  const [ isVisible, setIsVisible ] = useState(false);

  const value: MenuTriggerAreaContext = {
    mountPointId,
    isVisible,
    setIsVisible
  };

  const renderer = typeof menuRenderer === 'function'
    ? menuRenderer()
    : menuRenderer;

  return (
    <MenuTriggerAreaContext.Provider value={value}>
      <div onContextMenu={() => setIsVisible(p => !p)}>
        {children}
      </div>

      {
        isVisible && menuRenderer && (
          <Modal mountPointId={mountPointId}>
            {renderer}
          </Modal>
        )
      }
    </MenuTriggerAreaContext.Provider>
  );
};
