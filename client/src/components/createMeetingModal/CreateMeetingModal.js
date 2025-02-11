import React, { useState } from 'react';
import axios from 'axios';
import './CreateMeetingModal.css'; // Optional CSS for styling the modal

const CreateMeetingModal = ({ isOpen, closeModal, refreshMeetings }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');
  const [agenda, setAgenda] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('scheduled');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/meetings`, {
        title,
        date,
        participants: participants.split(','),
        agenda,
        notes,
        status,
        location,
      });

      if (response.status === 201) {
        refreshMeetings(); // Refresh the list of meetings
        closeModal(); // Close the modal
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create New Meeting</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Date:
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label>
              Participants (comma separated):
              <input
                type="text"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                required
              />
            </label>
            <label>
              Agenda:
              <textarea
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
              />
            </label>
            <label>
              Notes:
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label>
              Status:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
            <button type="submit">Create Meeting</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateMeetingModal;
