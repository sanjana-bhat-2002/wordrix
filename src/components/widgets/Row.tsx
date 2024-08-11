import React, { useState, useRef, useCallback, useEffect } from "react";
import Box from "../../components/widgets/Box";
import { numberOfLetters, answerArray } from "@/lib/cron";
const { generate } = require("random-words");
import { useWordChecker } from "react-word-checker";

// let answer = generate({ minLength: 5, maxLength: 5 }).toString().toUpperCase();
// let numberOfLetters = answer.length;
// let answerArray = answer.split("")

interface RowProps {
  isActive: boolean;
  onEnter: (success: boolean) => void;
  keyPress?: string;
  updateColors: (letter: string, color: string) => void
}



const Row = ({ isActive, onEnter, keyPress, updateColors }: RowProps) => {
  const { words, isLoading, wordExists } = useWordChecker("en");
  const [values, setValues] = useState<string[]>(Array(numberOfLetters).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [colors, setColors] = useState<string[]>(Array(numberOfLetters).fill(""));
  const inputData = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (!submitted) {
        let value = e.target.value.toUpperCase();
        // Only allow alphabetic characters
        if (/^[A-Z]$/.test(value)) {
          const newValues = [...values];
          newValues[index] = value;
          setValues(newValues);

          if (index < inputData.current.length - 1) {
            inputData.current[index + 1]?.focus();
          }
        }
      }
    },
    [values, submitted],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        if (values[index]) {
          const newValues = [...values];
          newValues[index] = "";
          setValues(newValues);
        } else if (index > 0) {
          inputData.current[index - 1]?.focus();
          const newValues = [...values];
          newValues[index - 1] = "";
          setValues(newValues);
        }
      } else if (e.key === "Enter" && !submitted) {
        let userWord = values.join("");
        console.log("Current user word:", values);
        console.log("answerArray: ", answerArray);

        if (!wordExists(userWord)) {
          alert("Word doesn't exist");
          console.log(inputData.current[numberOfLetters - 1])
          inputData.current[numberOfLetters - 1]?.focus(); // Keep focus on the last element
          return;
        }
        setSubmitted(true);
        const newColors = [...colors];
        let rowSuccess = true;

        for (let i = 0; i < numberOfLetters; i++) {
          if (answerArray[i] === values[i]) {
            newColors[i] = "bg-green-400";
            updateColors(values[i], newColors[i])
          } else if (answerArray.includes(values[i])) {
            newColors[i] = "bg-yellow-400";
            updateColors(values[i], newColors[i])
            rowSuccess = false;
          } else {
            newColors[i] = "bg-gray-400";
            updateColors(values[i], newColors[i])
            rowSuccess = false;
          }
        }


        setColors(newColors);
        onEnter(rowSuccess);
      }
    },
    [values, onEnter, submitted, colors],
  );

  useEffect(() => {
    if (isActive && !submitted) {
      inputData.current[0]?.focus();
    }
  }, [isActive, submitted]);

  useEffect(() => {
    if (isActive && keyPress && !submitted) {
      if (keyPress === "BACK") {
        const index = values.findLastIndex((val) => val !== "") + 1;
        console.log("Index: ", index)
        if (index > 0) {
          const newValues = [...values];
          newValues[index - 1] = "";
          setValues(newValues);
          inputData.current[index - 1]?.focus();
        } else {
          const newValues = [...values];
          newValues[0] = "";
          setValues(newValues);
          inputData.current[0]?.focus();
        }
      } else if (keyPress === "ENTER") {
        let userWord = values.join("");
        if (!wordExists(userWord)) {
          alert("Word doesn't exist");
          inputData.current[numberOfLetters - 1]?.focus(); // Keep focus on the last element
          return;
        }
        setSubmitted(true);
        const newColors = [...colors];
        let rowSuccess = true;

        for (let i = 0; i < numberOfLetters; i++) {
          if (answerArray[i] === values[i]) {
            newColors[i] = "bg-green-500";

          } else if (answerArray.includes(values[i])) {
            newColors[i] = "bg-yellow-500";

            rowSuccess = false;
          } else {
            newColors[i] = "bg-gray-400";

            rowSuccess = false;
          }

          updateColors(values[i], newColors[i])
        }

        setColors(newColors);

        onEnter(rowSuccess);

      } else {
        const index = values.findIndex((val) => val === "");
        if (index >= 0) {
          const newValues = [...values];
          newValues[index] = keyPress;
          setValues(newValues);
          if (index < inputData.current.length - 1) {
            inputData.current[index + 1]?.focus();
          }
        }
      }
    }
  }, [isActive, keyPress, submitted, values, onEnter, colors]);

  return (
    <div className="flex space-x-2">
      {values.map((value, index) => (
        <Box
          key={index}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyUp={(e) => handleKeyUp(e, index)}
          inputRef={(el) => (inputData.current[index] = el)}
          className={submitted ? colors[index] : ""}
          disabled={submitted}
        />
      ))}
    </div>
  );
};

export default Row;
