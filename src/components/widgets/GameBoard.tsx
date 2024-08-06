"use client";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import { useSession } from "next-auth/react";
import SuccessModal from "./SuccessModal";
import Keypad from "./Keypad";
import { CompletionStatus } from "@prisma/client";

const GameBoard: React.FC = () => {
  const { data: session } = useSession();
  const [activeRow, setActiveRow] = useState(0);
  const [keyColors, setKeyColors] = useState({});
  const [allAttempts, setAllAttempts] = useState<boolean[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>(CompletionStatus.PENDING);
  const rows = Array(6).fill(null);
  const [keyPress, setKeyPress] = useState("");

  useEffect(() => {
    if (completionStatus !== CompletionStatus.PENDING) {
      console.log(`Modal will show up, completion status is`, completionStatus)
      setShowModal(true);
    }
  }, [completionStatus]);

  useEffect(() => {
    if (keyPress) {
      // Handle key press logic here
      // You may want to pass the keyPress value to the active Row
      console.log("Key pressed:", keyPress);
      setKeyPress(""); // Reset key press
    }
  }, [keyPress]);
  const updateKeyColors = (letter: string, color: string) => {
    setKeyColors((prevColors) => ({ ...prevColors, [letter]: color }));
  };
  const handleEnter = async (rowSuccess: boolean) => {
    setAllAttempts((prev) => [...prev, rowSuccess]);
    if (rowSuccess) {
      setActiveRow(0);
      setAllAttempts([]);
      setCompletionStatus(CompletionStatus.COMPLETED);
    } else {
      // If not successful, move to the next row
      setActiveRow((prev) => Math.min(prev + 1, rows.length));
    }

    if (activeRow === rows.length - 1) {
      if (!rowSuccess) {
        setCompletionStatus(CompletionStatus.FAILED);
      }
      setTimeout(() => {
        alert("You failed");
      }, 100);
    }
  };

  const handleKeyPress = (key: string) => {
    setKeyPress(key);
  };

  return (
    <div className="grid grid-cols-1 gap-2 place-items-center mt-24">
      {rows.map((_, index) => (
        <Row key={index} updateColors= {updateKeyColors} isActive={index === activeRow} onEnter={handleEnter} keyPress={keyPress} />
      ))}
      <Keypad onKeyPress={handleKeyPress} keyColors={keyColors}/>
      <SuccessModal
        session={session}
        show={showModal}
        status={completionStatus}
        onClose={() => setShowModal(false)}
      ></SuccessModal>
    </div>
  );
}

export default GameBoard;
  