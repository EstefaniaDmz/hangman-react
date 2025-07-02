type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
}

export function HangmanWord({ guessedLetters, wordToGuess }: HangmanWordProps) {

    return (
        <div className="hangman-word-container">
            {wordToGuess.split("").map((letter, index) => (
                <span key={index} className="letter">
                    <span style={{ visibility: guessedLetters.includes(letter) ? "visible" : "hidden" }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    );
}