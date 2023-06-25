import React, { useEffect, useState } from 'react';
import './Header.css';
import {AppName} from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import navItems from '../../utils/navItems';
import {AiOutlineSearch} from 'react-icons/ai';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const {pathname} = useLocation();
  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname]);
  return (
    <header className={`header ${pathname==="/"?"home":"other"}`}>
      <nav>
        <Link to='/'><h1 className='logo'>{AppName}</h1></Link>
        <div className="nav-links">
          <ul>
          {navItems.map(({ name, path }) => (
              <NavItem
                key={path}
                name={name}
                path={path}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </ul>
        </div>
      </nav>
      {
        pathname==="/" && (
          <div className="search-section">
            <h1>{AppName}</h1>
            <div className="search-container">
              <div className="search-text">
              Search for best food & drinks
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="search">
                    <AiOutlineSearch/>
                  </label>
                  <input id='search' type="text" placeholder="Search for dish or restaurant ..."/>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </header>
  )
}

export default Header;