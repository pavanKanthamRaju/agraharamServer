// db.config.js

let dbConnection;

if (process.env.NODE_ENV === 'production') {
  // Use the Supabase adapter in a production environment
  dbConnection = require('./spabasedb');
  console.log("Database connection: Supabase (Production)");
} else {
  // Default to the local pg Pool for development
  dbConnection = require('./db'); 
  console.log("Database connection: Local PostgreSQL (Development)");
}

module.exports = dbConnection;