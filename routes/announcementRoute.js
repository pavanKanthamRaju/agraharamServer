const express = require('express');
const router = express.Router();
const announcementController = require("../controllers/announcementsController");

// CRUD Routes
router.post('/', announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
