document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  
    // Sending form data to the server
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.text())
    .then(data => {
      alert('Feedback received!');
      event.target.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  // Fetching and displaying product images from Google Photos
  const fetchProductImages = async () => {
    try {
      const response = await fetch('API_ENDPOINT'); // Replace 'API_ENDPOINT' with actual Google Photos API endpoint
      const data = await response.json();
      const productGallery = document.getElementById('product-gallery');
      data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.url;
        productGallery.appendChild(imgElement);
      });
    } catch (error) {
      console.error('Error fetching product images:', error);
    }
  };
  
  fetchProductImages();
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const mongoose = require('mongoose');
  
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  mongoose.connect('mongodb://localhost:27017/techySoftware', { useNewUrlParser: true, useUnifiedTopology: true });
  
  const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);
  
  app.use(bodyParser.json());
  app.use(cors());
  
  app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    feedback.save((err) => {
      if (err) {
        res.status(500).send('Error saving feedback');
      } else {
        res.send('Feedback received!');
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
    