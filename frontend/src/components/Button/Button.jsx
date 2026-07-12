import './Button.css';

export default function Button({type = "button", text, action}) {
    return (
        <button type={type} id='customButton' onClick={action}>
            {text}
        </button>
    )
}