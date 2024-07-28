"use client"
import React, { useState } from 'react';
import Row from '../widgets/Row';
import { useSession } from 'next-auth/react';
import SuccessModal from './SuccessModal';

const GameBoard: React.FC = () => {
    const {data: session} = useSession();
    console.log(`this is current session: ${JSON.stringify(session)}`)
    const [activeRow, setActiveRow] = useState(0);
    const [allAttempts, setAllAttempts] = useState<boolean[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const rows = Array(6).fill(null);

    const handleEnter = async (rowSuccess: boolean) => {
        setAllAttempts((prev) => [...prev, rowSuccess]);
        if (rowSuccess) {
            // If a row is successful, reset the attempts and show success alert
            // setTimeout(() => {
            //     alert("yay you got it!");
            // }, 100); // Delay the alert by 100ms
            setShowModal(true);
            setSuccess(true)
            setActiveRow(0);
            setAllAttempts([]);
        } else {
            // If not successful, move to the next row
            setActiveRow((prev) => Math.min(prev + 1, rows.length));
        }
        
        if (activeRow === rows.length - 1 && !rowSuccess) {
            setTimeout(() => {
                alert("You failed");
            }, 100); // Delay the alert by 100ms
        }
    };

    return (
        <div className="grid grid-cols-1 gap-2 place-items-center mt-24">
            {rows.map((_, index) => (
                <Row key={index} isActive={index === activeRow} onEnter={handleEnter} />
            ))}
            <SuccessModal session={session} success={success} show={showModal} onClose={() => setShowModal(false)}>
                
            </SuccessModal>
        </div>
    );
}

export default GameBoard;
