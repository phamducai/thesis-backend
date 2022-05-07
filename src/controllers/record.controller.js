import Record from "../models/Record.js"

const RecordController = {
  getRecords: async (req,res) => {
    const {deviceId, attribute} = req.params;
    const records = await Record.find({deviceId,attribute})
    res.json(records.map((record) => record.sample));
  }
};

export default RecordController;
