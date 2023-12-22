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

function SideNavBar() {
  const [selected, setSelected] = useState(0);
  const [isEnlarge, setIsEnlarge] = useState(window.innerWidth > 768);
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
    setIsEnlarge(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <div
      className={` relative min-h-screen transition-all duration-700 ease-in-out transform z-500 ${
        isEnlarge ? 'w-64 bg-lightPrimary' : 'w-0'
      } ${isEnlarge ? 'lg:block' : 'lg:hidden'}`}
    >
      <div className='flex flex-col'>
        <div className='app-logo mt-6 self-center hide-on-small'>
          <img src={logo} alt='Logo' />
        </div>
        <button
          className='md:hidden h-8 w-8 mt-6 ml-6 p-1 text-primary  hover:text-yellow-400'
          onClick={() => setIsEnlarge(!isEnlarge)}
        >
          {isEnlarge ? (
            <FaTimes className='h-full w-full' />
          ) : (
            <FaBars className='h-full w-full' />
          )}
        </button>
        <div className='nav-container pt-6'>
          <nav
            className={`inline-flex flex-col space-y-2 ${
              isEnlarge ? 'block' : 'hidden'
            }`}
          >
            {isEnlarge &&
              nav.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={`flex items-center ${
                    isEnlarge ? 'text-white ml-6' : 'text-gray-600'
                  } py-2 cursor-pointer hover:bg-indigo-100 hover:text-primary ${
                    selected === index ? 'text-yellow-300' : ''
                  } pl-2 pr-6 w-48`}
                  onClick={() => setSelected(index)}
                >
                  <span className='w-8 h-8 p-1 flex items-center justify-center mr-4'>
                    {selected === index
                      ? React.createElement(link.selectedIcon)
                      : React.createElement(link.icon)}
                  </span>
                  <span className='font-medium select-none sm:block lg:block'>
                    {link.name}
                  </span>
                </NavLink>
              ))}
          </nav>
          {isEnlarge && (
            <button
              className={`absolute bottom-0 w-full h-14 flex items-center justify-center bg-secondary text-white px-6 py-2 cursor-pointer hover:bg-indigo-100 hover:text-primary z-20`}
              onClick={handleLogout}
            >
              <span className='w-8 h-8 p-1 flex items-center justify-center '>
                <IoLogOutOutline className='w-8 h-8' />
              </span>
              <span className='font-medium select-none sm:block lg:block'>
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
