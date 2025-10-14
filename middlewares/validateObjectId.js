const { Types } = require('mongoose');
module.exports = (paramName) => (req, res, next) => {
  const id = req.params[paramName];
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID invalide' });
  next();
};
