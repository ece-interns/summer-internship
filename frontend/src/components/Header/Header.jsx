import React from 'react';
import './Header.css';
import {AppName} from '../../utils/constants';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className="header-content">
        <div className="logo">
          <Link to='/'>
            {AppName}
          </Link>
        </div>
        <nav>
          <Link to='/about'>
            <div className='nav-link'>About</div>
          </Link>
          <Link to='/contact'>
            <div className='nav-link'>Contact</div>
          </Link>
          <Link to='/profile'>
            <div className='nav-link'>Profile</div>
          </Link>
          <Link to='/login'>
            <div className='nav-link'>Login</div>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;