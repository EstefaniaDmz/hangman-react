type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal?: boolean;
}

export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {

    return (
        <div className="hangman-word-container">
            {wordToGuess.split("").map((letter, index) => (
                <span key={index} className="letter">
                    <span
                        style={{
                            visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                            color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
                        }}
                    >
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    );
}