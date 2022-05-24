const express = require("express");
const router = express.Router();

const RecordController = require("../controllers/record.controller");

router.get("/:deviceId/:attribute", RecordController.getRecords);
module.exports = router;
