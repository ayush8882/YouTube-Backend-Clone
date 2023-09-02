const { cateogriyService } = require("../../services");

const getCateogry = async (req, res) => {
  const response = await cateogriyService.getCateogry(req, res)
  res.send(response);
};
module.exports = { getCateogry };
