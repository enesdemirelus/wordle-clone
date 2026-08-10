from fastapi import FastAPI
import os
import random

app = FastAPI()
script_dir = os.path.dirname(os.path.abspath(__file__))
file = open(os.path.join(script_dir, "words.txt"))
words = file.read().split()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/get-word")
def get_word():
    word = random.choice(words)
    return {"word": word}


@app.get("/check-word/{word}")
def check_word(word:str):
    return {"valid": word in words}
    