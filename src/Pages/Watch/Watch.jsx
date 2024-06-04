import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const Watch = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:3000/api/movies/${id}`);
        if (movieResponse.ok) {
          const movieData = await movieResponse.json();
          setMedia(movieData);
          setMediaType('movie');
          return; // Return early if the movie was found
        }

        const tvResponse = await fetch(`http://localhost:3000/api/tv/${id}`);
        if (tvResponse.ok) {
          const tvData = await tvResponse.json();
          setMedia(tvData);
          setMediaType('tv');
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, [id]);

  const handleGoBack = () => {
    navigate('/home');
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className='watch w-[100vw] h-[100vh] relative'>
      <div className='back flex items-center absolute top-[10px] left-[10px] cursor-pointer z-[2]' onClick={handleGoBack}>
        <ArrowBackOutlinedIcon />
        Home
      </div>
      {media && mediaType === 'movie' ? (
        <video
          className='w-full h-full object-cover'
          src={media.videoUrl}
          controls
          autoPlay
        />
      ) : media && mediaType === 'tv' ? (
        <div className='tv-show'>
          <h1>{media.title}</h1>
          <p>{media.description}</p>
          {selectedEpisode ? (
            <div className='selected-episode'>
              <h2>{`Episode: ${selectedEpisode.title}`}</h2>
              <video
                className='w-full h-full object-cover'
                src={selectedEpisode.videoUrl}
                controls
                autoPlay
              />
              <button onClick={() => setSelectedEpisode(null)}>Back to episodes list</button>
            </div>
          ) : (
            media.episodes.map((episode, index) => (
              <div key={index} className='episode'>
                <h2 onClick={() => handleEpisodeClick(episode)}>{`Episode ${index + 1}: ${episode.title}`}</h2>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Watch;
