import React, { useState } from 'react';
import axios from 'axios';
import './MeetingCard.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import edit and delete icons

const statusOptions = ['scheduled', 'ongoing', 'completed', 'cancelled'];

const MeetingCard = ({ meeting, onEdit, onDelete }) => {
  const [status, setStatus] = useState(meeting.status);

  const handleStatusClick = async () => {
    const currentIndex = statusOptions.indexOf(status);
    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/meetings/${meeting._id}`,
        { status: nextStatus },
        { withCredentials: true } // Send cookies with the request for authentication
      );

      if (response.status === 200) {
        setStatus(nextStatus);
      }
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };

  //with cresedentials: true, send cookies
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${meeting.title}"?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/meetings/${meeting._id}`,
        { withCredentials: true } // Send cookies with the request for authentication
        );

      if (response.status === 200) {
        onDelete(meeting._id); // Remove from UI after successful deletion
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
      alert('Failed to delete the meeting.');
    }
  };

  return (
    <div className="meeting-card">
      <div className="meeting-header">
        <h2>{meeting.title}</h2>
        <div className="meeting-actions">
          <span 
            className={`status ${status.toLowerCase()}`} 
            onClick={handleStatusClick}
            style={{ cursor: 'pointer' }}
          >
            {status}
          </span>
          <FaEdit
            onClick={() => onEdit(meeting)} // Edit button
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </div>
      </div>
        
      <div className="meeting-card-content">
        <div className="meeting-details">
          <p className='strong'><strong>Date:</strong> {new Date(meeting.date).toLocaleString()}</p>
          <p className='strong'><strong>Location:</strong> {meeting.location || 'Not specified'}</p>
          <p className='strong'><strong>Agenda:</strong></p>
          <p className='info'>{meeting.agenda || 'No agenda provided'}</p>
          <p className='strong'><strong>Notes:</strong></p>
          <p className='info'>{meeting.notes || 'No notes provided'}</p>
        </div>
        <div className="meeting-extra">
          <div className="participants">
            <strong className='strong'>Participants:</strong>
            <ul>
              {meeting.participants.map((participant, index) => (
                <li key={index}>{participant}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='card-footer'>
        <FaTrash
            onClick={handleDelete} // Delete button
          />
      </div>
      </div>
    </div>
  );
};

export default MeetingCard;
