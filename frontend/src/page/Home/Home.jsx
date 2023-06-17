import React from 'react';
import './Home.css';
import Card from '../../components/Card/card';

import { AppName } from '../../utils/constants';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <header className='header'>
      <div className="background"></div>
      <div className="header-content-home">
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
      <div className="header-details">
        <h1>{AppName}</h1>
        <p>Search the best food & drinks</p>
        <form>
          <div className="form-input-container">
            <label className="search-logo" htmlFor='search'>
              <AiOutlineSearch/>
            </label>
          <input type="text" id='search' placeholder='Search food and restaurants ...'/>
          </div>
        </form>
      </div>
    </header>
    <div>
      <Card/>
    </div>
    </>
  )
}

export default Home;