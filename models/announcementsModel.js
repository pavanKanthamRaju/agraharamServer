const pool = require('../config/db'); // your PostgreSQL pool connection

// ➕ Create Announcement
const createAnnouncement = async (name, type, description) => {
  const result = await pool.query(
    `INSERT INTO announcements (name, type, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, type, description]
  );
  return result.rows[0];
};

// 📋 Get All Announcements
const getAllAnnouncements = async () => {
  const result = await pool.query(
    `SELECT * FROM announcements ORDER BY created_at DESC`
  );
  return result.rows;
};

// ✏️ Update Announcement
const updateAnnouncement = async (id, name, type, description) => {
  const result = await pool.query(
    `UPDATE announcements
     SET name = $1, type = $2, description = $3
     WHERE id = $4
     RETURNING *`,
    [name, type, description, id]
  );
  return result.rows[0];
};

// ❌ Delete Announcement
const deleteAnnouncement = async (id) => {
  const result = await pool.query(
    `DELETE FROM announcements WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
