module.exports = function authentication(req, res, next) {
  if (req.token) {
    if (req.token === 'validAccessToken') {
      next();
    } else {
      return res.status(403).json(
        {
          error: 'This user is not authorized for this functionality',
        },
      );
    }
  } else {
    return res.status(401).json(
      {
        error: 'Authentication Token Required',
      },
    );
  }
};
