import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  // Function to fetch a new candidate
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching candidates...');
      // Get a list of users
      const users = await searchGithub();
      console.log('Users:', users);
      
      if (!users || users.length === 0) {
        console.log('No users found');
        setNoMoreCandidates(true);
        setLoading(false);
        return;
      }
      
      // Get the first user from the list
      const user = users[0];
      console.log('Selected user:', user);
      
      // Get detailed information about the user
      const detailedUser = await searchGithubUser(user.login);
      console.log('Detailed user:', detailedUser);
      
      if (!detailedUser || !detailedUser.login) {
        console.log('No detailed user information found');
        // If we couldn't get detailed information, try the next user
        fetchCandidate();
        return;
      }
      
      setCandidate(detailedUser);
    } catch (err) {
      console.error('Error fetching candidate:', err);
      setError('Error fetching candidate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to save a candidate to local storage
  const saveCandidate = () => {
    if (!candidate) {
      console.log('No candidate to save');
      return;
    }
    
    console.log('Saving candidate:', candidate);
    
    try {
      // Get existing saved candidates from local storage
      const savedCandidatesString = localStorage.getItem('savedCandidates');
      console.log('Saved candidates string:', savedCandidatesString);
      
      const savedCandidates = savedCandidatesString ? JSON.parse(savedCandidatesString) : [];
      console.log('Parsed saved candidates:', savedCandidates);
      
      // Check if candidate is already saved
      const isAlreadySaved = savedCandidates.some((saved: Candidate) => saved.id === candidate.id);
      console.log('Is already saved:', isAlreadySaved);
      
      if (!isAlreadySaved) {
        // Add the new candidate to the list
        const updatedCandidates = [...savedCandidates, candidate];
        console.log('Updated candidates:', updatedCandidates);
        
        // Save the updated list to local storage
        localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
        console.log('Candidate saved to localStorage');
      }
      
      // Fetch the next candidate
      fetchCandidate();
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  // Function to save a test candidate
  const saveTestCandidate = () => {
    const testCandidate: Candidate = {
      id: 12345,
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://avatars.githubusercontent.com/u/12345',
      html_url: 'https://github.com/testuser',
      location: 'Test Location',
      email: 'test@example.com',
      company: 'Test Company',
      bio: 'This is a test user'
    };
    
    console.log('Saving test candidate:', testCandidate);
    
    try {
      // Get existing saved candidates from local storage
      const savedCandidatesString = localStorage.getItem('savedCandidates');
      console.log('Saved candidates string:', savedCandidatesString);
      
      const savedCandidates = savedCandidatesString ? JSON.parse(savedCandidatesString) : [];
      console.log('Parsed saved candidates:', savedCandidates);
      
      // Add the test candidate to the list
      const updatedCandidates = [...savedCandidates, testCandidate];
      console.log('Updated candidates:', updatedCandidates);
      
      // Save the updated list to local storage
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      console.log('Test candidate saved to localStorage');
      
      alert('Test candidate saved! Check the Potential Candidates page.');
    } catch (error) {
      console.error('Error saving test candidate:', error);
    }
  };

  // Function to reject a candidate
  const rejectCandidate = () => {
    console.log('Candidate rejected');
    fetchCandidate();
  };

  // Fetch a candidate when the component mounts
  useEffect(() => {
    console.log('Component mounted, fetching candidate...');
    fetchCandidate();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div>Loading candidate...</div>
        <button 
          onClick={saveTestCandidate}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Test Candidate
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        <button onClick={fetchCandidate} className="mt-4">
          Try Again
        </button>
        <button 
          onClick={saveTestCandidate}
          className="mt-4 ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Test Candidate
        </button>
      </div>
    );
  }

  if (noMoreCandidates) {
    return (
      <div className="text-center mt-10">
        <h2>No More Candidates Available</h2>
        <p>There are no more candidates to review at this time.</p>
        <button 
          onClick={saveTestCandidate}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Test Candidate
        </button>
      </div>
    );
  }

  // Debug output for candidate
  console.log('Rendering candidate:', candidate);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center mb-6">Candidate Search</h1>
      
      <div className="text-center mb-4">
        <button 
          onClick={saveTestCandidate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Test Candidate
        </button>
      </div>
      
      {candidate ? (
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center mb-4">
            <img 
              src={candidate.avatar_url} 
              alt={`${candidate.login}'s avatar`} 
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{candidate.name || 'No Name Provided'}</h2>
              <p className="text-gray-400">@{candidate.login}</p>
              {candidate.location && <p className="text-gray-400">{candidate.location}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            {candidate.bio && <p className="mb-2">{candidate.bio}</p>}
            {candidate.company && <p className="mb-2"><strong>Company:</strong> {candidate.company}</p>}
            {candidate.email && <p className="mb-2"><strong>Email:</strong> {candidate.email}</p>}
            <p className="mb-2">
              <strong>GitHub:</strong> <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{candidate.html_url}</a>
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={saveCandidate}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              style={{ cursor: 'pointer' }}
            >
              <FaPlus className="mr-2" /> Accept
            </button>
            <button 
              onClick={rejectCandidate}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              style={{ cursor: 'pointer' }}
            >
              <FaMinus className="mr-2" /> Reject
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>No candidate data available. Please try again.</p>
          <button onClick={fetchCandidate} className="mt-4">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
