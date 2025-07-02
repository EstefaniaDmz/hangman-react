import style from '../css/keyboard.module.css';

const keys = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z"
];

type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetters: (letter:string) => void;
    disabled: boolean;
}

export function Keyboard({activeLetters, inactiveLetters, addGuessedLetters, disabled = false}: KeyboardProps) {
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap:'0.5rem', alignSelf:'stretch'}}>
            {keys.map(key => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);

                return (
                    <button 
                        key={key}
                        className={`${style.btn} ${isActive ? style.active : ""} ${isInactive ? style.inactive : ""}`} 
                        onClick={() => addGuessedLetters(key)}
                        disabled={isInactive || isActive || disabled}
                    >
                        
                        {key}
                    </button>
                );
            })}
        </div>
    );
}