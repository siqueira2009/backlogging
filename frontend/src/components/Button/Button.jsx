import './Button.css';

export default function Button({text, action}) {
    return (
        <button id='customButton' onClick={action}>
            {text}
        </button>
    )
}