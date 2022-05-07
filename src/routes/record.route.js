import express from "express";

import RecordController from "../controllers/record.controller.js";

const router = express.Router();

router.get("/:deviceId/:attribute", RecordController.getRecords);

export default router;
