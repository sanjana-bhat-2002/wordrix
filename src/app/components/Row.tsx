import React, { useState, useRef, useCallback, useEffect } from 'react';
import Box from './Box';

interface RowProps {
    isActive: boolean;
    onEnter: () => void;
}

let answer = "SANJUF";
let numberOfLetters = 6;
let answerArray = answer.split('');

const Row = ({ isActive, onEnter }: RowProps) => {
    const [values, setValues] = useState<string[]>(Array(numberOfLetters).fill(''));
    const [submitted, setSubmitted] = useState(false);
    const [colors, setColors] = useState<string[]>(Array(numberOfLetters).fill(''));
    const inputData = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (!submitted) {
            let value = e.target.value.toUpperCase(); // Convert to uppercase
            // Validation: Allow only alphabetic characters
            if (/^[A-Z]$/.test(value)) {
                const newValues = [...values];
                newValues[index] = value;
                setValues(newValues);

                if (index < inputData.current.length - 1) {
                    inputData.current[index + 1]?.focus();
                }
            }
        }
    }, [values, submitted]);

    const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && !values[index]) {
            inputData.current[index - 1]?.focus();
        } else if (e.key === 'Enter' && !submitted) {
            setSubmitted(true);
            let userWord = values.join('');
            console.log('Current user word:', values);
            console.log('answerArray: ', answerArray);

            const newColors = [...colors];

            for (let i = 0; i < 5; i++) {
                if (answerArray[i] === values[i]) {
                    newColors[i] = 'bg-green-400';
                } else if (answerArray.includes(values[i])) {
                    newColors[i] = 'bg-yellow-400';
                } else {
                    newColors[i] = 'bg-gray-400';
                }
            }

            setColors(newColors);
            onEnter();
        }
    }, [values, onEnter, submitted, colors]);

    useEffect(() => {
        if (isActive && !submitted) {
            inputData.current[0]?.focus();
        }
    }, [isActive, submitted]);

    return (
        <div className="flex space-x-2">
            {values.map((value, index) => (
                <Box
                    key={index}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                    inputRef={(el) => (inputData.current[index] = el)}
                    className={submitted ? colors[index] : ''}
                    disabled={submitted}
                />
            ))}
        </div>
    );
}

export default Row;
