import './Input.css';

export default function Input({type = "text", label, placeholder}) {
    return (
        <div className="input-group">
            <input type={type} required="" autoComplete="off" placeholder={placeholder} />
            <label htmlFor='name'>{label}</label>
        </div>
    )
}