import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const tabs = ['Wordexplore', 'Brainquest', 'Storyadvenure'];

  useEffect(() => {
    fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, [id]);

  if (!story) return <div className="p-10 text-xl">Loading details...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
        ← Back to Stories List
      </Link>
      
      <div className="flex gap-6 mb-8">
        <img 
          src={`https://ik.imagekit.io/dev24/${story?.Image[0]}`} 
          alt={story?.Title} 
          className="w-48 h-auto object-cover rounded shadow" 
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{story?.Title}</h2>
          <p className="text-gray-600">Author: {story?.Author || 'Unknown'}</p>
        </div>
      </div>

      <div className="flex gap-4 border-b pb-2 mb-4">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-50 rounded">

        
       {activeTab === 'Wordexplore' && (
          <ul className="list-disc pl-5 space-y-2">
            {story?.Wordexplore?.map((word) => (
              <li key={word._id}>
                <strong>{word.Storytitle}:</strong> {word.Storyttext}
              </li>
            ))}
            {story?.Wordexplore?.length === 0 && <li>No words available.</li>}
          </ul>
        )}
        
        {activeTab === 'Brainquest' && (
          <div className="space-y-4">
            {story?.Brainquest?.map((quiz, index) => (
              <div key={quiz._id}>
                <p><strong>Q{index + 1}:</strong> {quiz.Question}</p>
                <p><strong>A:</strong> {quiz.Answer}</p>
              </div>
            ))}
            {story?.Brainquest?.length === 0 && <p>No quizzes available.</p>}
          </div>
        )}
        
        {activeTab === 'Storyadvenure' && (
          <div className="space-y-4">
            {story?.Storyadvenure?.content?.map((section) => (
              <div key={section._id}>
                {section.Paragraph.map((para, i) => (
                  <p key={i} className="mb-2 leading-relaxed">{para}</p>
                ))}
              </div>
            ))}
            {story?.Storyadvenure?.content?.length === 0 && <p>No story text available.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;