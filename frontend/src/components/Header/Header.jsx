import React, { useEffect, useState } from 'react';
import './Header.css';
import {AppName} from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import navItems from '../../utils/navItems';

const Header = ({page="home"}) => {
  const [activeItem, setActiveItem] = useState('');
  const {pathname} = useLocation();
  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname]);
  return (
    <header className={pathname==="/"?"header home":"header other"}>
      <nav>
        <Link to='/'><h1 className='logo'>{AppName}</h1></Link>
        <div className="nav-links">
          <ul>
          {navItems.slice(0, 4).map(({ name, path }) => (
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
          </div>
        )
      }
    </header>
  )
}

export default Header;