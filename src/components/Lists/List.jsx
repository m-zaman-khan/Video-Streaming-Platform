/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ListItems from '../ListItems/ListItems';
import { Slider } from '@mui/material';

const List = (props) => {
  const [items, setItems] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  

  const handleSlideChange = (event, newValue) => {
    setSlideIndex(newValue);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let endpoint = '';
        if (props.title === 'Movies') {
          endpoint = 'movies';
        } else if (props.title === 'TV Series') {
          endpoint = 'tv';
        }
        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(`Error fetching ${props.title}:`, error);
      }
    };

    fetchItems();
  }, [props.title]); // Fetch data when props.title changes

  return (
    <div className='list sm:mt-4 py-1'>
      <span className='listTitle text-white ml-12 sm:ml-20 font-bold'>{props.title}</span> 
      <div className="mt-2 ml-2 list-container">
        <div className="flex space-x-3" style={{ transform: `translateX(-${slideIndex * 220}px)`, transition: 'transform 0.5s ease-in-out' }}>
          {items.map((item) => (
            <ListItems key={item._id} item={item} />
          ))}
        </div>
      </div>
      <br />
      <Slider
        value={slideIndex}
        min={0}
        max={items.length - 1} // Adjust based on the number of items
        step={1}
        onChange={handleSlideChange}
        sx={{
          width: '100%',
          color: 'green', // Sets the primary color to green
          '& .MuiSlider-thumb': { backgroundColor: 'green' }, // Thumb color
          '& .MuiSlider-track': { backgroundColor: 'green' }, // Track color
          '& .MuiSlider-rail': { backgroundColor: '#cccccc' } // Rail color (optional, for contrast)
        }}
      />
    </div>
  );
}

export default List;
