import os

script_dir = os.path.dirname(os.path.abspath(__file__))

all_words_file = open(os.path.join(script_dir, "popular.txt"))
content = all_words_file.read().split()

five_letter_words_file = open(os.path.join(script_dir, "words.txt"), 'a')

for word in content:
    if len(word) == 5:
        five_letter_words_file.write(f"{word} \n")
        
print("Finished writing all the five letter words to a new file.")
        