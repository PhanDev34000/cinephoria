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

// Nouveau middleware pour admin OU employé
function verifyEmployeOrAdmin(req, res, next) {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'employe')) {
    return next();
  } else {
    return res.status(403).json({ message: 'Accès réservé au personnel' });
  }
}

module.exports = {
  verifyAdmin,
  verifyEmploye,
  verifyEmployeOrAdmin
};
