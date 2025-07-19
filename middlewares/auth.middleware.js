const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

     console.log('🟢 Token décodé:', decoded); 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
}

function verifyEmploye(req, res, next) {
  console.log('🎯 Rôle dans verifyEmploye :', req.user?.role);
  if (req.user.role === 'employe' || req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Accès interdit (employé requis)' });
  }
}


module.exports = { verifyToken, verifyEmploye };
