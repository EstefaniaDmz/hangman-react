import { useCallback, useEffect, useState } from 'react';
import words from './word-list.json';
import { HangmanDrawing } from './components/hangman-drawing';
import { HangmanWord } from './components/hangman-word';
import { Keyboard } from './components/keyboard';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const addGuessedLetter = useCallback((letter:string) => {
    if(guessedLetters.includes(letter)) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters]);

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
        Lose Win
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      
      <Keyboard activeLetters={guessedLetters.filter(letter =>
        wordToGuess.includes(letter)
      )}
      inactiveLetters={incorrectLetters}
      addGuessedLetters={addGuessedLetter}
      />
    </div>
  )
}

export default App
