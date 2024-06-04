/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { PlayArrowOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ListItems = ({ item, listTitle }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleTouchEnter = () => {
    setHovered(true);
  };

  const handleTouchLeave = () => {
    setHovered(false);
  };

  // Determine the API endpoint dynamically based on the list title
  const endpoint = listTitle === 'Movies' ? 'movies' : 'tv';

  return (
    <div className='relative'>
      <div
        className="bg-black w-[200px] hover:absolute hover:z-50 hover:top-[-150px] h-[100px] overflow-hidden cursor-pointer hover:w-[212px] hover:h-[260px] sm:max-2xl:hover:w-[300px] sm:max-2xl:hover:h-[350px] 2xl:hover:w-[300px] 2xl:hover:h-[300px] sm:max-2xl:hover:top-[-210px] 2xl:hover:top-[-210px] listi"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/watch/${item._id}`)}
        onTouchStart={handleTouchEnter}
        onTouchEnd={handleTouchLeave}
      >
        {hovered ? (
          <video className='h-[150px] w-full' src={`http://localhost:3000${item.trailerUrl}`} autoPlay muted></video>
        ) : (
          <img src={`http://localhost:3000${item.imageUrl}`} alt={item.title} />
        )}
        <div className="item-info text-white">
          <div className="icons flex mb-2 justify-center">
            <PlayArrowOutlined
              className="border-2 border-white p-[5px] rounded-full text-[26px] cursor-pointer"
            />
          </div>
          <div className="item-info-top flex items-center mb-2 text-sm font-semibold text-gray-600">
            <span>{item.duration}</span>
            <span className="border-1 border-gray-600 px-1 rounded-md ml-2">{item.age}</span>
            <span>{item.release}</span>
          </div>
          <div className="desc text-xs text-gray-400">
            {item.title}
          </div>
          <div className="desc text-xs text-gray-400">
            {item.description}
          </div>
          <div className="genre text-gray-500">{item.genre}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
