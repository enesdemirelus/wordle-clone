"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

function WordleArea() {
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [accuracyBoard, setAccuracyBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [isRowSet, setIsRowSet] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [error, setError] = useState("");
  const [boardRowIndex, setBoardRowIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctWord, setCorrectWord] = useState(["", "", "", "", ""]);

  useEffect(() => {
    axios
      .get("/api/get-word")
      .then((response) => {
        const res = response.data.word;
        const crrWord = res.toUpperCase().split("");
        setCorrectWord(crrWord);
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  const handleCheck = () => {
    if (writtenWord.length != 5) {
      setError("Please enter a word with length 5");
    } else {
      const word = writtenWord.toUpperCase().split("");

      const freqMap: Record<string, number> = {};

      for (const letter of correctWord) {
        if (letter in freqMap) {
          freqMap[letter]++;
        } else {
          freqMap[letter] = 1;
        }
      }

      for (let i = 0; i < word.length; i++) {
        const index = i;
        const letter = word[i];

        if (letter == correctWord[index]) {
          setAccuracyBoard((prevAccBoard) => {
            const newAccBoard = [...prevAccBoard];
            newAccBoard[boardRowIndex][index] = "C";
            return newAccBoard;
          });
          freqMap[letter]--;
        } else if (correctWord.includes(letter) && freqMap[letter] > 0) {
          setAccuracyBoard((prevAccBoard) => {
            const newAccBoard = [...prevAccBoard];
            newAccBoard[boardRowIndex][index] = "I";
            return newAccBoard;
          });
          freqMap[letter]--;
        } else {
          setAccuracyBoard((prevAccBoard) => {
            const newAccBoard = [...prevAccBoard];
            newAccBoard[boardRowIndex][index] = "W";
            return newAccBoard;
          });
          freqMap[letter]--;
        }
      }

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[boardRowIndex] = word;
        return newBoard;
      });

      setIsRowSet((prevArr) => {
        const newArr = [...prevArr];
        newArr[boardRowIndex] = true;
        return newArr;
      });

      setWrittenWord("");
      setError("");

      const isCorrect = word.every((letter, i) => letter === correctWord[i]);
      const next = boardRowIndex + 1;

      if (isCorrect) {
        setError("YOU GOT IT CORRECT!");
        setIsGameOver(true);
      } else if (next === 6) {
        setError("Better Luck Next Time");
        setIsGameOver(true);
      } else {
        setBoardRowIndex(next);
      }
    }
  };

  const [writtenWord, setWrittenWord] = useState("");
  return (
    <div>
      <div className="flex flex-col items-center gap-1 w-fit p-4">
        <h1 className="text-white">Correct Word: {correctWord}</h1>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((letter, letterIndex) => {
              const accuracy = accuracyBoard[rowIndex][letterIndex];
              return (
                <div
                  key={letterIndex}
                  className={`w-14 h-14 border-2 flex items-center justify-center text-white text-2xl font-bold ${
                    accuracy === "C"
                      ? "bg-[rgb(84,127,73)] border-[rgb(84,127,73)]"
                      : accuracy === "I"
                        ? "bg-[rgb(170,149,62)] border-[rgb(170,149,62)]"
                        : accuracy === "W"
                          ? "bg-[rgb(51,51,52)] border-[rgb(51,51,52)]"
                          : isRowSet[rowIndex]
                            ? "bg-[rgb(51,51,52)] border-[rgb(51,51,52)]"
                            : letter
                              ? "bg-[rgb(19,19,20)] border-[rgb(76,77,78)]"
                              : "bg-[rgb(19,19,20)] border-[rgb(51,51,52)]"
                  }`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}

        <div className="flex gap-2 mt-6">
          <Input
            className="w-40 h-10 text-center uppercase tracking-widest font-mono bg-[rgb(51,51,52)] text-white border-[rgb(76,77,78)] placeholder:text-gray-400"
            value={writtenWord}
            onChange={(e) => setWrittenWord(e.target.value)}
            maxLength={5}
            disabled={isGameOver}
          />
          <Button
            onClick={handleCheck}
            className="h-10 bg-white text-black hover:bg-gray-200"
            disabled={isGameOver}
          >
            Check
          </Button>
        </div>
        <h1 className="text-red-500 mt-2">{error}</h1>
      </div>
    </div>
  );
}

export default WordleArea;
