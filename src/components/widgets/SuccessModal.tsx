"use client";

import { useGame } from "@/contexts/GameContext";
import { CompletionStatus } from "@prisma/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  status: CompletionStatus
  session: Session | null;
}

const SuccessModal = ({ show, onClose, session, status }: ModalProps) => {
  const router = useRouter();
  console.log(`Passed props = `, status)
  const { gameStatus, setGameStatus } = useGame();
  const handleClose = () => {
    onClose();
    setGameStatus(status)
    console.log(gameStatus)
    router.push("/user");
  };
  
  const getCurrentDate = (): string => {
    const date = new Date();
    return date.toISOString();
  };

  const sendData = async () => {
    const response = await fetch("/api/dailypuzzle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: getCurrentDate(),
        weight: 2,
        completionStatus: status
      }),
    });
  }
  useEffect(() => {
    if (show) {
      sendData();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p className="text-blue-600">
          Yay! You did it {session?.user.username}
        </p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
