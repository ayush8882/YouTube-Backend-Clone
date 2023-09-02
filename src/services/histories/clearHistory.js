const History = require("../../models/History");

const clearHistory = async (req, res) => {
  await History.deleteMany({
    userId: req.user._id,
    type: req.params.type,
  });
};

module.exports = clearHistory;
