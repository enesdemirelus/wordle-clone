"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  const [word, setWord] = useState("");
  const [wordLoading, setWordLoading] = useState(true);

  const [isValid, setIsValid] = useState(false);
  const [isValidLoading, setIsValidLoading] = useState(true);
  const [writtenWord, setWrittenWord] = useState("");

  useEffect(() => {
    axios
      .get("/api/get-word")
      .then((response) => {
        setWord(response.data.word);
        setWordLoading(false);
      })
      .catch((error) => {
        console.error("API call failed:", error);
        setWordLoading(false);
      });
  }, []);

  const handleCheck = () => {
    axios
      .get(`/api/check-word/${writtenWord}`)
      .then((response) => {
        setIsValid(response.data.valid);
        setIsValidLoading(false);
      })
      .catch((error) => {
        console.error("API call failed:", error);
        setIsValidLoading(false);
      });
  };

  if (wordLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Hello World!</h1>
      <h1>{word}</h1>
      <h1></h1>

      <div className="flex gap-2 m-2">
        <Input
          placeholder="Enter word"
          className="w-40 text-center uppercase tracking-widest font-mono"
          value={writtenWord}
          onChange={(e) => setWrittenWord(e.target.value)}
        />
        <Button onClick={handleCheck}>Check</Button>
        <h1>{isValid ? "True" : "False"}</h1>
      </div>
    </div>
  );
};

export default page;
