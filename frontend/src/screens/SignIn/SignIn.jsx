import './SignIn.css';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function SignIn() {
    return (
        <div id="login-container">
            <div id="login-component">
                <h1 className='title'>&#128075; Hey, welcome back!</h1>
    
                <div id="login-inputs">
                    <Input placeholder="Gabe Newell" label="What is your name?"/>
                    <Input type="password" placeholder="•••••••••••••••" label="What is your password?"/>
                </div>
    
                <Button text="Login" action={() => alert("Login")}/>
            </div>
        </div>
    )
}