const head = (<div className="hangman head" />);
const body = (<div className="hangman body" />);
const armRight = (<div className="hangman arm right" />);
const armLeft = (<div className="hangman arm left" />);
const legRight = (<div className="hangman leg right" />);
const legLeft = (<div className="hangman leg left" />);

const hangmanParts = [head, body, armRight, armLeft, legRight, legLeft];

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div className="hangman-drawing-container">
            {hangmanParts.slice(0, numberOfGuesses)}
            <div className="line horizontal first" />
            <div className="line vertical second" />
            <div className="line horizontal third" />
            <div className="line vertical fourth" />
        </div>
    );
}