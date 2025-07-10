function verifyAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Accès refusé : rôle admin requis' });
  }
}

function verifyEmploye(req, res, next) {
  if (req.user && req.user.role === 'employe') {
    return next();
  } else {
    return res.status(403).json({ message: 'Accès refusé : rôle employé requis' });
  }
}

module.exports = { verifyAdmin, verifyEmploye };
