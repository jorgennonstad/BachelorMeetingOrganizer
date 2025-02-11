const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware'); // Import middleware

// 🟢 Public route - Anyone can view meetings
router.get('/', authMiddleware, meetingController.getMeetings);

// 🔒 Only logged-in users can create a meeting
router.post('/', authMiddleware, roleMiddleware(['admin']), meetingController.createMeeting);

// 🔒 Only logged-in users can view specific meetings
router.get('/:id', authMiddleware, meetingController.getMeeting);

// 🔒 Only Admins can update a meeting
router.put('/:id', authMiddleware, roleMiddleware(['admin']), meetingController.updateMeeting);

// 🔒 Only Admins can delete a meeting
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), meetingController.deleteMeeting);

// 🔒 Only logged-in users can upload documents to a meeting
router.post('/:id/upload', authMiddleware, meetingController.uploadDocument);

module.exports = router;
