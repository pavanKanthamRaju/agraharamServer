const Announcement = require("../models/announcementsModel");

// ➕ Create
const createAnnouncement = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    if (!name || !type || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newAnnouncement = await Announcement.createAnnouncement(name, type, description);
    res.status(201).json({ success: true, data: newAnnouncement });
  } catch (error) {
    console.error('Error creating announcement:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// 📋 Get All
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.getAllAnnouncements();
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ✏️ Update
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, description } = req.body;

    const updatedAnnouncement = await Announcement.updateAnnouncement(id, name, type, description);
    if (!updatedAnnouncement)
      return res.status(404).json({ success: false, message: 'Announcement not found' });

    res.status(200).json({ success: true, data: updatedAnnouncement });
  } catch (error) {
    console.error('Error updating announcement:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ❌ Delete
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Announcement.deleteAnnouncement(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: 'Announcement not found' });

    res.status(200).json({ success: true, message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports={createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement}
