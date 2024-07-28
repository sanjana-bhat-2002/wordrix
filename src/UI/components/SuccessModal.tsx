'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    session: Session | null;
    success: boolean;
}

const modalText = ["Yay you've made it!", "Bummer, you've failed!"];

const SuccessModal = ({ show, onClose, success, session }: ModalProps) => {
    const router = useRouter();

    const handleClose = () => {
        onClose();
        //router.push('/admin'); // Navigate to the /admin route
    };
    const getCurrentDate = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };
    const sendData = async () => {
        const response = await fetch('/api/dailypuzzle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: getCurrentDate(),
                count: 2,
                level: 1
            })
        });

        console.log(JSON.stringify(response));
        if (!response.ok) {
            console.error("Failed to send data");
        }
    };

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
                <p className='text-blue-600'>Yay! You did it {session?.user.username}</p>
                <button onClick={handleClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
