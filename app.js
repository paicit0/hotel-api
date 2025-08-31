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

app.get('/costCalculator', (req, res) => {
  const { id, room_type, checkInDate, checkOutDate } = req.query;
  console.log(`Received cost calculation request for hotel: ${id},room: ${room_type}, check-in: ${checkInDate}, check-out: ${checkOutDate}`);
  if (!id || !room_type || !checkInDate || !checkOutDate) {
    res.status(400).json({ message: 'room_type, checkInDate, and checkOutDate are required' });
    return;
  }
  const hotel = mockHotelData.find(hotel => hotel.hotel_id === id);
  if (!hotel) {
    res.status(404).json({ message: `Hotel with ID ${id} not found` });
    return;
  }

  const duration = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
  const roomPrice = hotel.hotel_room_types.find(room => room.room_name === room_type)?.room_price;

  const baseCost = roomPrice * duration;
  console.log(`Calculated total cost: ${totalCost}`);
  res.json({ baseCost, discount: 0, priceAfterDiscount: baseCost, taxesAndServices: 0.07 * baseCost, totalCost: 1.07 * baseCost });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});