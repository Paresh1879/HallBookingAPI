const express = require("express");
const router = express.Router();

const roomService = require("../services/room.services");

// READ
router.get("/rooms", async (req, res) => {
  const rooms = await roomService.displayRooms();
  res.send(rooms);
});

// READ
router.get("/customers", async (req, res) => {
  const customers = await roomService.displayCustomers();
  res.send(customers);
});

//Create room
router.post("/rooms", (req, res) => {
  const room = roomService.createRoom(req.body);
  res.send(room);
});

// UPDATE : Book room
router.put("/rooms/:id", async (req, res) => {
  const room = await roomService.bookRoom(req.params.id, req.body);
  res.send(room);
});

module.exports = router;
