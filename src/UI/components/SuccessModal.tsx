'use client'


import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import React from 'react'
import { useSession } from 'next-auth/react'


interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


const SuccessModal = ({ show, onClose, children }: ModalProps) => {

        const fetchDetails = () => {
        const session = useSession();
        console.log(session)
        }
        if(show) {
            fetchDetails();
        }
        
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                    {children}
                    <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        )
    }

export default SuccessModal;