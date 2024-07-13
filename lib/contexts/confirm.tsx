import React, { useRef, useState, createContext, ReactNode } from 'react';

type ConfirmContextType = {
  confirm: (message: string) => Promise<boolean>;
};

type ConfirmState = {
  id: number;
  message: string;
  resolve: (result: boolean) => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [confirmStates, setConfirmStates] = useState<ConfirmState[]>([]);
  const idCounter = useRef(0);

  const confirm = (message: string) => {
    return new Promise<boolean>((resolve) => {
      const id = idCounter.current++;
      setConfirmStates((prev) => [...prev, { id, message, resolve }]);
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
      {confirmStates.map(({ id, message }) => (
        <ConfirmDialog
          key={id}
          message={message}
          onConfirm={() => handleConfirm(id, true)}
          onCancel={() => handleConfirm(id, false)}
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

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};
function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div>
      <span>{message}</span>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}