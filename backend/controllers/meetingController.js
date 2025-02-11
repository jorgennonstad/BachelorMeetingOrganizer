// backend/controllers/meetingController.js
const Meeting = require('../models/meetingModel');

// Create a new meeting
const createMeeting = async (req, res) => {
  const { title, date, participants, agenda, notes, status, location, documents } = req.body;

  try {
    // Check if a meeting with the same title already exists
    const existingMeeting = await Meeting.findOne({ title });

    console.log('Existing Meeting:', existingMeeting); // Debugging step

    if (existingMeeting) {
      return res.status(400).json({ message: 'A meeting with this title already exists' });
    }

    const newMeeting = new Meeting({ title, date, participants, agenda, notes, status, location, documents });
    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error });
  }
};



// Get all meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error });
  }
};

// Get a single meeting by ID
const getMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error });
  }
};

// Update a meeting by ID
const updateMeeting = async (req, res) => {
  try {
    const { title, date, participants, agenda, notes, status, location, documents } = req.body;

    // Log incoming data for debugging
    console.log("Incoming Update Payload:", req.body);

    // Make sure to include all fields in the update
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        participants,
        agenda,
        notes,
        status,
        location,
      },
      { new: true }  // Ensures the returned document is the updated one
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    console.log("Updated Meeting:", updatedMeeting); // Log the updated meeting to ensure it's updated
    res.status(200).json(updatedMeeting);

  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ message: 'Error updating meeting', error });
  }
};



// Delete a meeting by ID
const deleteMeeting = async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) return res.status(404).json({ message: 'Meeting not found' });
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meeting', error });
  }
};

// Upload a document to a meeting
const uploadDocument = async (req, res) => {
  const { documentUrl } = req.body; // Example: 'https://example.com/document.pdf'

  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    meeting.documents.push(documentUrl);
    await meeting.save();

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading document', error });
  }
};

module.exports = { createMeeting, getMeetings, getMeeting, updateMeeting, deleteMeeting, uploadDocument };
