import { useCallback, useEffect, useState } from 'react';
import words from './word-list.json';
import { HangmanDrawing } from './components/hangman-drawing';
import { HangmanWord } from './components/hangman-word';
import { Keyboard } from './components/keyboard';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter =>
    guessedLetters.includes(letter)
  );

  const addGuessedLetter = useCallback((letter:string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if(key !== 'Enter') return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if(!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters]);

  return (
    <div className='container'>
      <div className='sub-container'>
        {isWinner && "Winner! - Refresh to try again"}
        { isLoser && "Nice try - Refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      
      <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter =>
        wordToGuess.includes(letter)
      )}
      inactiveLetters={incorrectLetters}
      addGuessedLetters={addGuessedLetter}
      />
    </div>
  )
}

export default App
