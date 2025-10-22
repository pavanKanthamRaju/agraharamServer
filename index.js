const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();
const userRoutes = require("./routes/userRoutes")
const authRouts = require("./routes/authRouts")
const poojasRouts = require("./routes/poojaRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const orderRoutes = require("./routes/orderRoutes")
const itemRoutes = require("./routes/itemRoutes")
const poojaItems = require("./routes/poojaItemsRoute")

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: '*', // Or your frontend URL like 'http://localhost:5173'
  methods: ['GET', 'POST', 'OPTIONS','PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}; 

app.use(cors(corsOptions));
app.use(express.json());
 

//Routes 
app.use('/api/users', userRoutes)
app.use('/api/auth',authRouts)
app.use('/api/poojas', poojasRouts)
app.use('/api/payment', paymentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/poojaItems', poojaItems)

app.get('/', (req, res) => res.send('API is working 🚀'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
