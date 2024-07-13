import React, { createContext } from 'react';

type ConfirmContextType = {
  confirm: (message: string) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider ({ children }: { children: React.ReactNode }) {
  const confirm = (message: string) => {
    return new Promise<boolean>((resolve) => {
      const result = window.confirm(message);
      resolve(result);
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
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