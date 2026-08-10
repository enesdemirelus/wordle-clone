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
  const [hideCorrectWord, setHideCorrectWord] = useState(true);

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

  const handleReset = () => {
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setAccuracyBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setIsRowSet([false, false, false, false, false, false]);
    setBoardRowIndex(0);
    setIsGameOver(false);
    setWrittenWord("");
    setError("");
  };

  const handleCheck = () => {
    if (writtenWord.length != 5) {
      setError("Please enter a word with length 5");
      return;
    }

    const word = writtenWord.toUpperCase().split("");

    const freqMap: Record<string, number> = {};

    for (const letter of correctWord) {
      if (letter in freqMap) {
        freqMap[letter]++;
      } else {
        freqMap[letter] = 1;
      }
    }

    const result = ["", "", "", "", ""];

    for (let i = 0; i < word.length; i++) {
      if (word[i] === correctWord[i]) {
        result[i] = "C";
        freqMap[word[i]]--;
      }
    }

    for (let i = 0; i < word.length; i++) {
      if (result[i] === "C") continue;
      if (correctWord.includes(word[i]) && freqMap[word[i]] > 0) {
        result[i] = "I";
        freqMap[word[i]]--;
      } else {
        result[i] = "W";
      }
    }

    setAccuracyBoard((prevAccBoard) => {
      const newAccBoard = [...prevAccBoard];
      newAccBoard[boardRowIndex] = result;
      return newAccBoard;
    });

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
  };

  const [writtenWord, setWrittenWord] = useState("");
  return (
    <div>
      <div className="flex flex-col items-center gap-1 w-fit p-4">
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCheck();
              }
            }}
            maxLength={5}
            disabled={isGameOver}
          />
          <Button
            onClick={handleCheck}
            className="h-10 bg-white text-black hover:bg-gray-200 cursor-pointer"
            disabled={isGameOver}
          >
            Check
          </Button>
          <Button
            onClick={handleReset}
            className="h-10 bg-[rgb(180,60,60)] text-white hover:bg-[rgb(200,75,75)] cursor-pointer"
            disabled={isGameOver}
          >
            Reset
          </Button>
        </div>
        <h1 className="text-red-500 mt-1">{error}</h1>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => setHideCorrectWord(!hideCorrectWord)}
            className="text-sm text-[rgb(120,120,120)] hover:text-white underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            {hideCorrectWord
              ? "Show the correct word"
              : "Hide the correct word"}
          </button>

          {!hideCorrectWord && (
            <p className="text-white text-lg font-bold tracking-widest uppercase">
              {Array.isArray(correctWord) ? correctWord.join("") : correctWord}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WordleArea;
