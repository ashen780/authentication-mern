import React from 'react';
import API from '../utils/API';
import './Header.css';

function Header() {

    const logoutUser = async () => {
        try {
            const res = await API.get('api/v1/auth/logout');
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const getSecret = async () => {
        try {
            const res = await API.get('api/v1/auth/secretcontent');
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='header'>
            <div className="header__item" onClick={(e) => logoutUser()}>Logout</div>
            <div className="header__item" onClick={(e) => getSecret()}>secret</div>
        </div>
    )
}

export default Header
