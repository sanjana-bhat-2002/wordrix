import React, { useState } from 'react';
import Row from './Row';

const GameBoard: React.FC = () => {
    const [activeRow, setActiveRow] = useState(0);
    const rows = Array(6).fill(null);

    const handleEnter = () => {
        setActiveRow((prev) => Math.min(prev + 1, rows.length - 1));
    };

    return (
        <div className="grid grid-cols-1 gap-2 place-items-center mt-24">
            {rows.map((_, index) => (
                <Row key={index} isActive={index === activeRow} onEnter={handleEnter} />
            ))}
        </div>
    );
}

export default GameBoard;
