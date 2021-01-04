import React, { Fragment ,useState} from 'react';
import logo from '../img/logo.png';
import './Auth.css';

function Auth() {

    const [register, setRegister] = useState(false);
    const [formData, setformData] = useState({ email: '', password: '' });
    
    console.log(formData);

    const { email, password } = formData;

    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('button clicked');
    }

    const buttonText = !register ? 'Login' : 'Signup';
    //clasess
    const registerClass = register ? 'form-switcher__option--selected form-switcher__option' :'form-switcher__option' 
    const loginClass = !register ? 'form-switcher__option--selected form-switcher__option' :'form-switcher__option' 
    return (
        <Fragment>
            <div className="form-switcher">
                <div className={loginClass} onClick={e=>setRegister(false)}>Login</div>
                <div className={registerClass} onClick={e=>setRegister(true)}>SignUp</div>
            </div>
            <div className="login-form">
                <form className="login-form__group" onSubmit={(e)=>{onSubmit(e)}}>
                    <img src={logo} alt="logo" className="login-form__logo" />
                    <input onChange={(e)=> onChange(e)} value={email} type="email" placeholder='email address' name='email' required className="input__text" />
                    <input onChange={(e)=> onChange(e)} minLength='6' value={password} type="password" name="password" className='input__text' placeholder='password' required />
                    <input type="submit" value={buttonText} className='input__submit' />
                </form>
            </div>
        </Fragment>
    )
}

export default Auth
