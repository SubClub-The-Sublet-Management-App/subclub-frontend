import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAngleDoubleLeft, FaBars } from 'react-icons/fa';
import { FaHome, FaUser, FaBed, FaUsers, FaRegCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

function SideNavBar() {
  const [selected, setSelected] = useState(0);
  const [isEnlarge, setIsEnlarge] = useState(window.innerWidth > 768);

  const nav = [
    { name: 'Dashboard', to: '/', current: true, icon: FaHome, selectedIcon: FaHome },
    { name: 'Profile', to: '/profile', current: false, icon: FaUser, selectedIcon: FaUser },
    { name: 'Rooms', to: '/rooms', current: false, icon: FaBed, selectedIcon: FaBed },
    { name: 'Occupants', to: '/occupants', current: false, icon: FaUsers, selectedIcon: FaUsers },
    { name: 'Assignments', to: '/room-assignments', current: false, icon: FaRegCalendarAlt, selectedIcon: FaRegCalendarAlt },
    { name: 'Payments', to: '/payment-records', current: false, icon: FaMoneyBillWave, selectedIcon: FaMoneyBillWave },
  ];

  const checkScreenSize = () => {
    setIsEnlarge(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 w-1/4">
      <header className="pos-r h-screen inline-flex flex-col bg-white shadow p-6">
        <div className="app-logo">
          {/*  logo */}
          <img src="/path/to/logo.png" alt="Logo" className="w-24 h-24" />
        </div>
        {!isEnlarge && (
          <button
            className="h-8 w-8 p-1 bg-gray-100 text-gray-600 rounded-lg mx-auto border border-solid border-gray-200 hover:border-gray-300"
            onClick={() => setIsEnlarge(!isEnlarge)}
          >
            {isEnlarge ? <FaAngleDoubleLeft /> : <FaBars />}
          </button>
        )}
        <nav className={`inline-flex flex-col space-y-2 ${isEnlarge ? 'block' : 'hidden'}`}>
            {nav.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.to}
                    className={`flex items-center text-gray-600 py-2 cursor-pointer hover:bg-gray-100 ${selected === index ? 'bg-indigo-100 text-indigo-500' : ''} ${isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-full'}`}
                    onClick={() => setSelected(index)}
                >
                    <span className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-4' : ''}`}>
                        {selected === index ? <link.selectedIcon /> : <link.icon />}
                    </span>
                    {isEnlarge && <span className="font-medium select-none">{link.name}</span>}
                </NavLink>
            ))}
        </nav>
      </header>
    </div>
  );
}

export default SideNavBar;