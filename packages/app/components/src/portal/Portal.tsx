import {
  cloneElement,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { PortalType } from './Portal.constants';

interface IPortalContext {
  portalMap: Map<PortalType, ReactNode>;
  addPortalItem: (portalType: PortalType, component: ReactNode) => void;
  removePortalItem: (portalType: PortalType) => void;
}

const PortalContext = createContext<IPortalContext>(null);

export const PortalProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [portalMap, setPortalMap] = useState<Map<PortalType, ReactNode>>(
    new Map()
  );

  const addPortalItem = useCallback(
    (portalType: PortalType, component: ReactNode) => {
      portalMap.set(portalType, component);

      const clonedMapWithNewItem = new Map(portalMap);

      setPortalMap(clonedMapWithNewItem);
    },
    []
  );

  const removePortalItem = useCallback((portalType: PortalType) => {
    portalMap.delete(portalType);

    const clonedMapWithoutItem = new Map(portalMap);

    setPortalMap(clonedMapWithoutItem);
  }, []);

  return (
    <PortalContext.Provider
      value={{ portalMap, addPortalItem, removePortalItem }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export interface IProps {
  portalType: PortalType;
  [key: string]: any;
}

export const PortalIn: FC<IProps> = ({ portalType, children }) => {
  const { addPortalItem, removePortalItem } = useContext(PortalContext);

  useEffect(() => {
    addPortalItem(portalType, children);

    return () => removePortalItem(portalType);
  }, [portalType, children]);

  return null;
};

export const PortalOut: FC<IProps> = ({ portalType, ...rest }) => {
  const { portalMap } = useContext(PortalContext);

  if (portalMap != null) {
    const children = portalMap.get(portalType) as ReactElement;
    return children
      ? cloneElement(children, {
          ...rest
        })
      : null;
  }
  return null;
};
