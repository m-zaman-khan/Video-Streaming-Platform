/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Search, ArrowDropDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

  const Navbar = ({setMovieClicked,setSeriesClicked,setSearchClicked}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin,setIsLogin] = useState(false)
  
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleMoviesClick = () => {
    setMovieClicked(true);
    setSeriesClicked(false); // Set movieClicked to true when Movies is clicked
  };
  const handleSeriesClick = () => {
    setSeriesClicked(true); 
    setMovieClicked(false);// Set movieClicked to true when Movies is clicked
  };

  const handleSearchClicked = () => {
    setSearchClicked(true);
  }

  const handleNetflixClick = () => {
    setSeriesClicked(false); 
    setMovieClicked(false);
  }
  const logout = () => {
    localStorage.removeItem('jwtToken'); // Remove JWT token from localStorage
                navigate('/');
  }

  return (
    <nav className={`flex p-3 justify-between fixed top-0 w-full z-50 ${isScrolled ? 'transition all duration-700 bg-black' : 'bg-gradient-to-t from-transparent to-rgba-black-30'}`}>
      <ul className='flex space-x-2 items-center text-sm font-medium'>
        <img className='cursor-pointer w-16 sm:w-20' src="./images/jw player.png" alt="" onClick={handleNetflixClick}/>
        <li className='text-white cursor-pointer p-2 hidden sm:block'onClick={handleSeriesClick}>Series</li>
        <li className='text-white cursor-pointer p-2 hidden sm:block'onClick={handleMoviesClick} >Movies</li>
      </ul>
      <div className='flex mt-3 space-x-3 sm:max-2xl:space-x-5 items-center'>
        <Search className='text-white cursor-pointer' onClick = {handleSearchClicked}/>
        <img className='cursor-pointer w-5 rounded-2xl' src="./images/dp.jpg" alt=""/>
        <div className='relative' onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <ArrowDropDown className='text-white cursor-pointer' />
          {isDropdownOpen && (
            <div className='absolute top-full right-0 bg-black text-white shadow-md rounded'>
              <ul className='py-1'>
                <li className='px-4 py-2 cursor-pointer hover:bg-white hover:text-black' onClick={logout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

