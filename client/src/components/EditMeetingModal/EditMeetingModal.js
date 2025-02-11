import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditMeetingModal.css';

const EditMeetingModal = ({ isOpen, closeModal, refreshMeetings, meeting }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');
  const [agenda, setAgenda] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('scheduled');

  useEffect(() => {
    if (meeting) {
      console.log('Meeting received:', meeting); // Log the incoming meeting
      setTitle(meeting.title);
      setParticipants(meeting.participants.join(', '));
      setAgenda(meeting.agenda);
      setNotes(meeting.notes);
      setLocation(meeting.location);
      setStatus(meeting.status);

      // Format the date for datetime-local input
      const formattedDate = new Date(meeting.date).toISOString().slice(0, 16); // "2025-02-07T10:30"
      console.log('Formatted date:', formattedDate); // Log the formatted date
      setDate(formattedDate);
    }
  }, [meeting]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the updated meeting data before making the API request
    console.log('Updated Meeting Data:', {
      title,
      date,
      participants: participants.split(','),
      agenda,
      notes,
      status,
      location,
    });

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/meetings/${meeting._id}`, {
        title,
        date,
        participants: participants.split(','),
        agenda,
        notes,
        status,
        location,
      });

      console.log('Response from API:', response); // Log the response from the API

      if (response.status === 200) {
        console.log('Meeting updated successfully:', response.data); // Log the success
        refreshMeetings(); // Refresh the list of meetings
        closeModal(); // Close the modal
      } else {
        console.error('Error: Meeting update failed');
      }
    } catch (error) {
      console.error('Error editing meeting:', error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Meeting</h2>
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
            <button type="submit">Save Changes</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditMeetingModal;
