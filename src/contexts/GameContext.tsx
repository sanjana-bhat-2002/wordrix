"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { CompletionStatus } from "@prisma/client";

interface GameContextType {
  gameStatus: CompletionStatus;
  setGameStatus: (value: CompletionStatus) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameStatus, setGameStatus] = useState<CompletionStatus>(CompletionStatus.PENDING);

  useEffect(() => {
    if (gameStatus !== CompletionStatus.PENDING) {
      const resetTimeout = setTimeout(() => {
        setGameStatus(CompletionStatus.PENDING);
      }, 10000); 

      // Clean up the timeout if the component is unmounted or gameStatus changes again
      return () => clearTimeout(resetTimeout);
    }
  }, [gameStatus]);

  return (
    <GameContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameContext.Provider>
  );
};
