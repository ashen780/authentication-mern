import React from 'react';
import { useDispatch } from 'react-redux';
import './Header.css';
import { getSecret, logoutUser } from '../redux/actions/authActions';
function Header() {

    const dispatch = useDispatch();
    // const logoutUser = async () => {
    //     try {
    //         const res = await API.get('api/v1/auth/logout');
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const getSecret = async () => {
    //     try {
    //         const res = await API.get('api/v1/auth/secretcontent');
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    return (
        <div className='header'>
            <div className="header__item" onClick={(e) => dispatch(logoutUser())}>Logout</div>
            <div className="header__item" onClick={(e) => dispatch(getSecret())}>secret</div>
        </div>
    )
}

export default Header
