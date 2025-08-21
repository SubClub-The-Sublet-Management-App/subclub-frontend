import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo-ligth.svg';
import {
  FaHome,
  FaUser,
  FaBed,
  FaUsers,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaTimes,
  FaBars,
} from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';

function SideNavBar({ onResize }) {
  const [selected, setSelected] = useState(0);
  const [isEnlarge, setIsEnlarge] = useState(true);
  const { setIsAuthenticated } = useContext(AuthContext);

  const nav = [
    {
      name: 'Dashboard',
      to: '/',
      current: true,
      icon: FaHome,
      selectedIcon: FaHome,
    },
    {
      name: 'Profile',
      to: '/profile',
      current: false,
      icon: FaUser,
      selectedIcon: FaUser,
    },
    {
      name: 'Rooms',
      to: '/rooms',
      current: false,
      icon: FaBed,
      selectedIcon: FaBed,
    },
    {
      name: 'Occupants',
      to: '/occupants',
      current: false,
      icon: FaUsers,
      selectedIcon: FaUsers,
    },
    {
      name: 'Assignments',
      to: '/room-assignments',
      current: false,
      icon: FaRegCalendarAlt,
      selectedIcon: FaRegCalendarAlt,
    },
    {
      name: 'Payments',
      to: '/payment-records',
      current: false,
      icon: FaMoneyBillWave,
      selectedIcon: FaMoneyBillWave,
    },
  ];

  const checkScreenSize = () => {
    const newIsEnlarge = window.innerWidth > 768;
    setIsEnlarge(newIsEnlarge);
    if (onResize) {
      onResize(newIsEnlarge);
    }
  };

  const toggleSidebar = () => {
    const newIsEnlarge = !isEnlarge;
    setIsEnlarge(newIsEnlarge);
    if (onResize) {
      onResize(newIsEnlarge);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-50 bg-lightPrimary ${
        isEnlarge ? 'w-64' : 'w-16'
      }`}
    >
      <div className='flex flex-col'>
        <div className={`app-logo mt-6 self-center transition-opacity duration-300 ${isEnlarge ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <img src={logo} alt='Logo' className="h-12" />
        </div>
        <button
          className='h-8 w-8 mt-6 ml-4 p-1 text-white hover:text-yellow-400 transition-colors duration-200'
          onClick={toggleSidebar}
        >
          {isEnlarge ? (
            <FaTimes className='h-full w-full' />
          ) : (
            <FaBars className='h-full w-full' />
          )}
        </button>
        <div className='nav-container pt-6 flex-1'>
          <nav className='flex flex-col space-y-2'>
            {nav.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={`flex items-center text-white py-3 cursor-pointer hover:bg-indigo-100 hover:text-primary transition-colors duration-200 ${
                  selected === index ? 'text-yellow-300 bg-indigo-100 bg-opacity-10' : ''
                } ${isEnlarge ? 'px-6' : 'px-4 justify-center'}`}
                onClick={() => setSelected(index)}
                title={!isEnlarge ? link.name : ''}
              >
                <span className='w-6 h-6 flex items-center justify-center'>
                  {selected === index
                    ? React.createElement(link.selectedIcon, { className: 'w-5 h-5' })
                    : React.createElement(link.icon, { className: 'w-5 h-5' })}
                </span>
                {isEnlarge && (
                  <span className='font-medium select-none ml-4 transition-opacity duration-300'>
                    {link.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <button
            className={`absolute bottom-0 left-0 right-0 h-14 flex items-center bg-secondary text-white cursor-pointer hover:bg-indigo-100 hover:text-primary transition-colors duration-200 ${
              isEnlarge ? 'justify-start px-6' : 'justify-center'
            }`}
            onClick={handleLogout}
            title={!isEnlarge ? 'Logout' : ''}
          >
            <span className='w-6 h-6 flex items-center justify-center'>
              <IoLogOutOutline className='w-5 h-5' />
            </span>
            {isEnlarge && (
              <span className='font-medium select-none ml-4 transition-opacity duration-300'>
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
