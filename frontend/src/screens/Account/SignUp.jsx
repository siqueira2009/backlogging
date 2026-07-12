import { Emoji } from "react-apple-emojis";
import { NavLink } from "react-router-dom";

import './Account.css';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function SignUp() {
    return (
        <div id="login-container">
            <div id="login-component">
                <h1 className='title'>
                    <Emoji name='waving-hand' width="47px" style={{marginBottom: -7}}/> Yo, nice to meet you!
                </h1>
    
                <div id="login-inputs">
                    <Input placeholder="Gabe Newell" label="How can we call you?"/>
                    <Input type="email" placeholder="your.email@cooldomain.com" label="What is your email?"/>
                    <Input type="password" placeholder="•••••••••••••••" label="Choose a password"/>
                </div>
    
                <div id="login-buttons">
                    <Button text="Proceed" action={() => alert("Create account")}/>
                    <NavLink style={{color: 'white', fontFamily: 'Manrope', fontWeight: 400}} to="/login">Already at home?</NavLink>
                </div>
            </div>
        </div>
    );
}