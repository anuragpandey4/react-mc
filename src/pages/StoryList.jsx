import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';

const StoryList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('https://mxpertztestapi.onrender.com/api/sciencefiction')
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  if (stories.length === 0) return <div className="p-10 text-xl">Loading stories...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6  p-3 text-center">Sci-Fi Stories List</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="border p-4 rounded-lg shadow-sm flex flex-col">
            <img 
              src={`https://ik.imagekit.io/dev24/${story?.Image[0]}`} 
              alt={story?.Title} 
              className="w-full h-48 object-cover mb-4 rounded" 
            />
            <h3 className="font-bold text-lg mb-2">{story?.Title}</h3>
            
            <Link to={`/story/${story._id}`} className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;