
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import { AuthContext } from '../Context/AuthContext';



const Navi = () => {
  const { isLoggedIn, setIsLoggedIn , manageLogout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);


  const handleMenuToggle = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen((prevIsProfileMenuOpen) => !prevIsProfileMenuOpen);
    setIsMenuOpen(false); // Close main menu
  };

  // Close the menus when clicking outside of them
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.classList.contains('hamburger-button') &&
      !event.target.closest('#mobile-menu')
    ) {
      setIsMenuOpen(false);
    }
  
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target) &&
      !event.target.closest('#user-menu')
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  const handleLogoutClick = () => {
    // Call the handleLogout function from the parent component
    manageLogout();
  };

  // Attach the event listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   // Check if user is already logged in
  //   const curLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   isLoggedIn=curLoggedIn;
  // }, []);


  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button type="button" className="hamburger-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={handleMenuToggle} >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img className="block lg:hidden h-8 w-auto" src={logo} alt="Logo" />
                  <img className="hidden lg:block h-8 w-auto" src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" activeClassName="bg-gray-900 text-white" >
                    Home
                  </Link>
                  <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" activeClassName="bg-gray-900 text-white" >
                    About Us
                  </Link>
                  <Link to="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" activeClassName="bg-gray-900 text-white" >
                    Contact Us
                  </Link>
                  {isLoggedIn ? (
            <>
              <Link to="/settings" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" >
                Settings
              </Link>
              <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" onClick={handleLogoutClick} >
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" >
              Login
            </Link>
          )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile menu */}
              {isLoggedIn && (
              <div className="ml-3 relative">
                <div>
                  <button type="button" className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true" onClick={handleProfileMenuToggle} >
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="/profile-pic.jpg" alt="Profile" />
                  </button>
                </div>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" ref={profileMenuRef} >
                    {/* Profile dropdown items */}
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" >
                      Your Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" >
                      Settings
                    </Link>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleLogoutClick}>
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu" ref={menuRef}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" onClick={handleMenuToggle} >
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" onClick={handleMenuToggle} >
                About Us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" onClick={handleMenuToggle} >
                Contact Us
              </Link>
              <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" activeClassName="bg-gray-900 text-white" onClick={handleMenuToggle} >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navi;

