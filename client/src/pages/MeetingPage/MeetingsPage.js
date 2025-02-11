import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MeetingCard from '../../components/MeetingCard/MeetingCard';
import CreateMeetingModal from '../../components/createMeetingModal/CreateMeetingModal'; // Import the modal
import EditMeetingModal from '../../components/EditMeetingModal/EditMeetingModal'; // New edit modal
import './MeetingsPage.css';

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null); // Track selected meeting for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Track edit modal state

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/meetings`,{
        withCredentials: true, // Send cookies
      })
      .then((response) => setMeetings(response.data))
      .catch((error) => console.error('Error fetching meetings:', error));
  }, []);

  const sortedMeetings = [...meetings].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sortBy === 'lastEdited') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return 0;
  });

  const refreshMeetings = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/meetings`)
      .then((response) => setMeetings(response.data))
      .catch((error) => console.error('Error fetching meetings:', error));
  };

  const handleEditClick = (meeting) => {
    setSelectedMeeting(meeting); // Set the selected meeting for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleDeleteMeeting = (meetingId) => {
    setMeetings((prevMeetings) => prevMeetings.filter(meeting => meeting._id !== meetingId));
  };

  return (
    <div className="meetings-page">
      <h1>Meetings</h1>

      {/* Sorting Dropdown */}
      <div className="sort-dropdown">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Meeting Date</option>
          <option value="status">Status</option>
          <option value="lastEdited">Last Edited</option>
        </select>
      </div>

      {/* Button to open the modal */}
      <button className="create-meeting-button" onClick={() => setIsCreateModalOpen(true)}>
        Create New Meeting
      </button>

      {/* Meeting Cards */}
      <div className="meeting-list">
        {sortedMeetings.map((meeting) => (
          <MeetingCard 
            key={meeting._id} 
            meeting={meeting} 
            onEdit={handleEditClick} // Pass the handler to the MeetingCard
            onDelete={handleDeleteMeeting} // Pass delete handler
          />
        ))}
      </div>

      {/* Modal for creating a meeting */}
      <CreateMeetingModal
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
        refreshMeetings={refreshMeetings}
      />
      
      {/* Modal for editing a meeting */}
      <EditMeetingModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        refreshMeetings={refreshMeetings}
        meeting={selectedMeeting} // Pass the selected meeting data to the edit modal
      />
      
    </div>
  );
};

export default MeetingsPage;
