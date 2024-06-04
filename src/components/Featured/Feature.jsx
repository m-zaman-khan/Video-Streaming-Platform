/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Feature = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [imgSrc, setImgSrc] = useState("./images/Stranger Things lap.jpg");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setImgSrc("./images/Stranger Things mob.jpg");
      } else {
        setImgSrc("./images/Stranger Things lap.jpg");
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await fetch('http://localhost:3000/api/movies');
        const movieData = await movieResponse.json();
  
        const tvResponse = await fetch('http://localhost:3000/api/tv');
        const tvData = await tvResponse.json();
  
        // Combine movieData and tvData arrays
        const combinedData = [...movieData, ...tvData];
  
        setMovies(combinedData);
  
        if (combinedData.length > 0) {
          const randomIndex = Math.floor(Math.random() * combinedData.length);
          setRandomMovie(combinedData[randomIndex]);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    return () => {};
  }, []);
  return (
    <>
      <div className='relative'>
        

        {randomMovie && (
          <div key={randomMovie._id} className='w-[vw] overflow-hidden'>
            <video
              className="w-[100%] w-screen aspect-video"
              src={`http://localhost:3000${randomMovie.videoUrl}`}
              title="Feature video"
              frameBorder="0"
              allowFullScreen
              autoPlay
              loop
              muted
            ></video>

            <CSSTransition
              in={isLoaded}
              timeout={1000} // Animation duration
              classNames='fade'
              unmountOnExit
            >
              <div className='info absolute bottom-[80px] left-10 w-[190px] flex-col space-y-3 sm:w-[500px] sm:bottom-[30px] lg:w-[700px] lg:bottom-[200px]'>
                <span className='title text-white font-bold text-[40px]'>
                  {randomMovie.title}
                </span>
                <br />
                <span className='title text-white font-normal text-[20px]'>
                  {randomMovie.description}
                </span>
                <div className='buttons space-x-3'>
                  <button className='bg-white px-2 py-2 rounded-xl border-2 border-black hover:bg-slate-400' onClick={() => navigate(`/watch/${randomMovie._id}`)}><PlayArrow />Play</button>
                </div>
              </div>
            </CSSTransition>
          </div>
        )}
      </div>
    </>
  );
}

export default Feature;
