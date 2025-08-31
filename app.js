// node --watch app.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const mockHotelData = require('./mockHotelData.json');

app.use(cors())

app.get('/search', (req, res) => {
  const { location } = req.query;
  console.log(`Received request for hotel location: ${location}`);
  const filteredHotels = mockHotelData.filter(hotel => hotel.hotel_location.toLowerCase().includes(location.toLowerCase()));
  console.log(filteredHotels);
  res.json(filteredHotels);
});

app.get('/getHotelById', (req, res) => {
  const { id } = req.query;
  console.log(`Received request for hotel ID: ${id}`);
  if (id === undefined) {
    res.status(400).json({ message: 'Hotel ID is required' });
    return;
  }
  const filteredHotel = mockHotelData.find(hotel => hotel.hotel_id === id);
  if (filteredHotel === undefined) {
    res.status(404).json({ message: `Hotel with ID ${id} not found` });
  } else {
    console.log([filteredHotel]);
    res.json([filteredHotel]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});