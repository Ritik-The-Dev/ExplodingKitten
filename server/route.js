const express = require("express");
const router = express.Router();
const {createProfile,AddScore,ShowScore,ShowAllScore} = require('./controllers/auth');

router.post("/createProfile", createProfile);
router.put("/AddScore", AddScore);
router.get("/ShowAllScore",ShowAllScore);

module.exports = router;