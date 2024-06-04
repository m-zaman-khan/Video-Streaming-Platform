/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Feature from '../../components/Featured/Feature';
import List from '../../components/Lists/List';
import backgroundMusic from '../../../sound/backgroundMusic.mp3'

const Home = () => {
  const [movieClicked, setMovieClicked] = useState(false);
  const [seriesClicked, setSeriesClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
  
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 1;
    audio.play();
    

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <>
    <div className='bg-black overflow-hidden relative'>
      <Navbar setMovieClicked={setMovieClicked} setSeriesClicked={setSeriesClicked} setSearchClicked={setSearchClicked} />
      {searchClicked && (
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Enter</button>
        </div>
      )}
      <Feature />
      <br />
      {!seriesClicked && <List title="Movies" query={query} />} {/* Pass query to List */}
      {!movieClicked && <List title="TV Series" query={query} />} {/* Pass query to List */}
    </div>
    </>
  );
}

export default Home;
