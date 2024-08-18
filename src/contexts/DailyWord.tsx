// "use client";

// import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
// import { CompletionStatus } from "@prisma/client";

// interface DailyWordContextType {
//   dailyWord: string;
//   setDailyWord: (value: string) => void;
// }

// const DailyWordContext = createContext<DailyWordContextType | undefined>(undefined);

// export const useDailyWord = () => {
//   const context = useContext(DailyWordContext);
//   if (!context) {
//     throw new Error("useDailyWord must be used within a GameProvider");
//   }
//   return context;
// };

// export const WordProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [dailyWord, setDailyWord] = useState<String>("");

//   useEffect(() => {
//     if (gameStatus !== CompletionStatus.PENDING) {
//       const resetTimeout = setTimeout(() => {
//         setGameStatus(CompletionStatus.PENDING);
//       }, 10000); 

//       // Clean up the timeout if the component is unmounted or gameStatus changes again
//       return () => clearTimeout(resetTimeout);
//     }
//   }, [gameStatus]);

//   return (
//     <GameContext.Provider value={{ gameStatus, setGameStatus }}>
//       {children}
//     </GameContext.Provider>
//   );
// };
