import { Emoji } from "react-apple-emojis";
import { NavLink } from "react-router-dom";

import './Account.css';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function SignIn() {
    return (
        <div id="login-container">
            <div id="login-component">
                <h1 className='title'>
                    <Emoji name='waving-hand' width="47px" style={{marginBottom: -7}}/> Hey, welcome back!
                </h1>
    
                <div id="login-inputs">
                    <Input type="email" placeholder="your.email@cooldomain.com" label="What is your email?"/>
                    <Input type="password" placeholder="•••••••••••••••" label="What is your password?"/>
                </div>
    
                <div id="login-buttons">
                    <Button text="Login" action={() => alert("Login")}/>
                    <NavLink style={{color: 'white', fontFamily: 'Manrope', fontWeight: 400}} to="/create">New here?</NavLink>
                </div>
            </div>
        </div>
    )
}