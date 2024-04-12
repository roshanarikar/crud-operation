const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./Routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb+srv://todocrud:Todocrud1@cluster0.foc8sqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Your MongoDB connection URI

app.use(express.json());
app.use('/api', todoRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: false, useUnifiedTopology: false })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
