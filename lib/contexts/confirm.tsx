import React, { useRef, useState, createContext, ReactNode, ReactElement } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';

type ConfirmContextType = {
  confirm: ({
    title, message
  }: {
    title?: ReactNode;
    message: ReactNode;
  }, customOptions?: CustomConfirmOptions) => Promise<boolean>;
};

type ConfirmState = {
  id: number;
  title?: ReactNode;
  message: ReactNode;
  resolve: (result: boolean) => void;
  customOptions?: CustomConfirmOptions;
}

type ConfirmDialogComponents = {
  Root: ReactElement;
  Overlay: ReactElement;
  Content: ReactElement;
  Title: ReactElement;
  Description: ReactElement;
  Close: ReactElement;
  Confirm: ReactElement;
}

export type ConfirmOptions = {
  okText: string;
  cancelText: string;
  components: ConfirmDialogComponents;
}

type CustomConfirmOptions = {
  okText?: string;
  cancelText?: string;
  components?: CustomConfirmDialogComponents;
}

type CustomConfirmDialogComponents = Partial<ConfirmDialogComponents>

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const baseComponents: ConfirmDialogComponents = {
  Root: <div />,
  Overlay: <div className="DialogOverlay" />,
  Content: <div className="DialogContent" />,
  Title: <h2 />,
  Description: <p />,
  Close: <button />,
  Confirm: <button />,
};

const baseOptions: ConfirmOptions = {
  okText: 'OK',
  cancelText: 'Cancel',
  components: baseComponents,
}

export function ConfirmProvider({ children, defaultOptions }: { children: ReactNode, defaultOptions?: CustomConfirmOptions }) {
  const [confirmStates, setConfirmStates] = useState<ConfirmState[]>([]);
  const idCounter = useRef(0);

  const confirm = ({title, message}: { title?: ReactNode, message: ReactNode } , customOptions?: CustomConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      const id = idCounter.current++;
      setConfirmStates((prev) => [...prev, { id, title, message, resolve, customOptions }]);
    });
  };

  const handleConfirm = (id: number, result: boolean) => {
    setConfirmStates((prev) => {
      const state = prev.find((s) => s.id === id);
      if (state) {
        state.resolve(result);
      }
      return prev.filter((s) => s.id !== id);
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {confirmStates.map(({ id, title, message, customOptions }) => (
        <ConfirmDialog
          key={id}
          title={title}
          message={message}
          onConfirm={() => handleConfirm(id, true)}
          onCancel={() => handleConfirm(id, false)}
          options={{ ...baseOptions, ...defaultOptions, ...customOptions, components: {
            ...baseOptions.components,
            ...defaultOptions?.components,
            ...customOptions?.components,
          }}}
        />
      ))}
    </ConfirmContext.Provider>
  );
}

export function useConfirm () {
  const context = React.useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
}
