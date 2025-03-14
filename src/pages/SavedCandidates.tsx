import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { FaMinus } from 'react-icons/fa';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortField, setSortField] = useState<keyof Candidate | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState<string>('');

  // Load saved candidates from local storage
  useEffect(() => {
    const loadSavedCandidates = () => {
      const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(candidates);
    };

    loadSavedCandidates();

    // Add event listener to update the list if localStorage changes in another tab
    window.addEventListener('storage', loadSavedCandidates);

    return () => {
      window.removeEventListener('storage', loadSavedCandidates);
    };
  }, []);

  // Function to remove a candidate from the saved list
  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  // Function to handle sorting
  const handleSort = (field: keyof Candidate) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a new field, set it and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to handle filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // Apply sorting and filtering
  const displayedCandidates = [...savedCandidates]
    .filter(candidate => {
      if (!filterText) return true;
      
      const searchText = filterText.toLowerCase();
      return (
        (candidate.name?.toLowerCase().includes(searchText) || false) ||
        candidate.login.toLowerCase().includes(searchText) ||
        (candidate.location?.toLowerCase().includes(searchText) || false) ||
        (candidate.company?.toLowerCase().includes(searchText) || false)
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      // Handle null values
      if (fieldA === null && fieldB === null) return 0;
      if (fieldA === null) return sortDirection === 'asc' ? 1 : -1;
      if (fieldB === null) return sortDirection === 'asc' ? -1 : 1;
      
      // Compare string values
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      // Compare number values
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB
          : fieldB - fieldA;
      }
      
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center mb-6">Potential Candidates</h1>
      
      {/* Filter input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter candidates..."
          value={filterText}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {displayedCandidates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th onClick={() => handleSort('name')} className="cursor-pointer">
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('login')} className="cursor-pointer">
                  Username {sortField === 'login' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('location')} className="cursor-pointer">
                  Location {sortField === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('company')} className="cursor-pointer">
                  Company {sortField === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Email</th>
                <th>GitHub</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>
                    <img 
                      src={candidate.avatar_url} 
                      alt={`${candidate.login}'s avatar`} 
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{candidate.name || 'N/A'}</td>
                  <td>{candidate.login}</td>
                  <td>{candidate.location || 'N/A'}</td>
                  <td>{candidate.company || 'N/A'}</td>
                  <td>{candidate.email || 'N/A'}</td>
                  <td>
                    <a 
                      href={candidate.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Profile
                    </a>
                  </td>
                  <td>
                    <button 
                      onClick={() => removeCandidate(candidate.id)}
                      className="flex items-center bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      <FaMinus className="mr-1" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">No Potential Candidates</h2>
          <p>You haven't accepted any candidates yet.</p>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
