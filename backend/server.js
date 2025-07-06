require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobController = require('./controllers/jobController');

const app = express();
app.use(cors());
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGO_URI);

// routes
app.get('/jobs', jobController.getJobs);
app.post('/jobs', jobController.addJob);
app.put('/jobs/:id', jobController.updateJob);
app.delete('/jobs/:id', jobController.deleteJob);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
