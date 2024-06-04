  /* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable no-unused-vars */
  import React, { useState, useEffect } from 'react';
  import { useForm, useFieldArray } from 'react-hook-form';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  const AdminPage = () => {
    const { register, handleSubmit, reset, control } = useForm();
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'episodes',
    });

    const [media, setMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [mediaType, setMediaType] = useState('movies');
    const navigate = useNavigate();

    useEffect(() => {
      fetchMedia();
    }, [mediaType]);

    const fetchMedia = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${mediaType}`);
        setMedia(response.data);
      } catch (error) {
        console.error(`Error fetching ${mediaType}:`, error);
      }
    };

    const onSubmitAdd = async (data) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('age', data.age);
      formData.append('release', data.release);
      formData.append('genre', data.genre);
      formData.append('trailerFile', data.trailerFile[0]);
      formData.append('imageFile', data.imageFile[0]);
  
      if (mediaType === 'movies') {
          formData.append('duration', data.duration);
          formData.append('videoFile', data.videoFile[0]);
      } else {
          const episodes = data.episodes.map((episode, index) => ({
              title: episode.title,
              description: episode.description,
              videoFile: episode.videoFile[0]
          }));
  
          formData.append('episodes', JSON.stringify(episodes));
  
          data.episodes.forEach((episode, index) => {
              formData.append(`episodes[${index}][videoFile]`, episode.videoFile[0]);
          });
      }
  
      for (let pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
      }
  
      try {
          const response = await axios.post(`http://localhost:3000/api/${mediaType}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log(`${mediaType} added:`, response.data);
          reset();
          fetchMedia();
      } catch (error) {
          console.error(`Error adding ${mediaType}:`, error);
      }
  };
  
  

    const handleMediaTypeChange = (e) => {
      setMediaType(e.target.value);
    };

    const onSubmitDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/${mediaType}/${id}`);
        console.log(`${mediaType} deleted`);
        fetchMedia();
      } catch (error) {
        console.error(`Error deleting ${mediaType}:`, error);
      }
    };

    const onSubmitUpdate = async (data) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      try {
        const response = await axios.put(
          `http://localhost:3000/api/${mediaType}/${selectedMedia._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(`${mediaType} updated:`, response.data);
        reset();
        setSelectedMedia(response.data);
        fetchMedia();
      } catch (error) {
        console.error(`Error updating ${mediaType}:`, error);
      }
    };

    const selectMedia = (media) => {
      setSelectedMedia(media);
      reset({
        title: media.title,
        description: media.description,
        duration: media.duration,
        age: media.age,
        release: media.release,
        genre: media.genre,
      });
    };

    const logout = () => {
      localStorage.removeItem('jwtToken'); // Remove JWT token from localStorage
      navigate('/')
    }

    return (
      <div className="container mx-auto p-4 bg-black min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Panel</h1>

        {/* Select Media Type */}
        <div className="flex justify-center mb-6">
          <label className="mr-4 text-white">
            <input
              type="radio"
              value="movies"
              checked={mediaType === 'movies'}
              onChange={handleMediaTypeChange}
              className="mr-2"
            />
            Movie
          </label>
          <label className="mr-4 text-white">
            <input
              type="radio"
              value="tv"
              checked={mediaType === 'tv'}
              onChange={handleMediaTypeChange}
              className="mr-2"
            />
            TV Series
          </label>
        </div>

        {/* Add New Media */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Add New {mediaType === 'movies' ? 'Movie' : 'TV Show'}
          </h2>
          <form onSubmit={handleSubmit(onSubmitAdd)} className="space-y-4">
            {/* Form fields for adding new media */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description', { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="text"
                {...register('age', { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Release</label>
              <input
                type="text"
                {...register('release', { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <input
                type="text"
                {...register('genre', { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Trailer File</label>
              <input
                type="file"
                {...register('trailerFile', { required: true })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image File</label>
              <input
                type="file"
                {...register('imageFile', { required: true })}
                className="mt-1 block w-full"
              />
            </div>
            {mediaType === 'movies' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    {...register('duration', { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Video File</label>
                  <input
                    type="file"
                    {...register('videoFile', { required: true })}
                    className="mt-1 block w-full"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Episodes</h3>
                  <button
                    type="button"
                    onClick={() => append({ title: '', description: '', videoFile: [] })}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                  >
                    Add Episode
                  </button>
                </div>
                {fields.map((episode, index) => (
    <div key={episode.id} className="bg-gray-100 p-4 rounded-md mb-4">
        <h4 className="font-medium mb-2">Episode {index + 1}</h4>
        <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
                type="text"
                {...register(`episodes.${index}.title`, { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
                {...register(`episodes.${index}.description`, { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            ></textarea>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Video File</label>
            <input
                type="file"
                {...register(`episodes.${index}.videoFile`, { required: true })}
                className="mt-1 block w-full"
            />
        </div>
        <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 mt-2"
        >
            Remove Episode
        </button>
    </div>
))}

              </>
            )}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Upload
            </button>
          </form>
        </div>

        {/* Delete Media */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Delete {mediaType === 'movies' ? 'Movie' : 'TV Show'}
          </h2>
          <div className="space-y-4">
            {media.map((mediaItem) => (
              <div key={mediaItem._id} className="flex justify-between items-center border p-2 rounded-md">
                <p>{mediaItem.title}</p>
                <button
                  onClick={() => onSubmitDelete(mediaItem._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Media */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {mediaType === 'movies' ? 'Movies' : 'TV Shows'} List
          </h2>
          <div className="space-y-4">
            {media.map((mediaItem) => (
              <div
                key={mediaItem._id}
                className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => selectMedia(mediaItem)}
              >
                <p className="font-semibold">Title: {mediaItem.title}</p>
                <p>Description: {mediaItem.description}</p>
                <p>Duration: {mediaType === 'movies' ? mediaItem.duration : 'N/A'}</p>
                <p>Age: {mediaItem.age}</p>
                <p>Release: {mediaItem.release}</p>
                <p>Genre: {mediaItem.genre}</p>
                <p>Video: {mediaType === 'movies' ? mediaItem.videoUrl : 'N/A'}</p>
                <p>Trailer: {mediaItem.trailerUrl}</p>
                <p>Image: {mediaItem.imageUrl}</p>
                {/* Display video trailer and image */}
              </div>
            ))}
          </div>
        </div>
        <button className='bg-blue-800' onClick={logout}>Logout</button>
      </div>
    );
  };

  export default AdminPage;